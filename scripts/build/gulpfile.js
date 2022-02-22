const gulp = require('gulp')
const path = require('path')
const ts = require('gulp-typescript')
const through2 = require('through2')
const tsDefaultReporter = ts.reporter.defaultReporter()
const rimraf = require('rimraf')
const { dirname } = require('path')
const fs = require('fs')
const merge2 = require('merge2')
const stripCode = require('gulp-strip-code')
const babel = require('gulp-babel')
const vue = require('@vitejs/plugin-vue')
const del = require('delete')
const resolve = require.resolve

const libDir = path.join(__dirname, '../../lib')
const esDir = path.join(__dirname, '../../lib')

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts']
const tsConfig = require('../../tsconfig.json').compilerOptions

// function buildLess() {
//   return src(path.join(__dirname, '../../components/**/*.less')).pipe(dest(path.join(__dirname, '../../lib')))
// }

function clean() {
  rimraf.sync(libDir)
}

function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath)
}

function getBabelCommonConfig(modules) {
  const plugins = [
    [
      resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true
      }
    ],
    [resolve('@vue/babel-plugin-jsx'), { mergeProps: false, enableObjectSlots: false }],
    resolve('@babel/plugin-proposal-optional-chaining'),
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-proposal-object-rest-spread'),
    resolve('@babel/plugin-proposal-export-default-from'),
    resolve('@babel/plugin-proposal-export-namespace-from'),
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-syntax-dynamic-import'),
    [
      resolve('@babel/plugin-transform-runtime'),
      {
        useESModules: modules === false,
        version: '^7.10.4'
      }
    ]
  ]
  return {
    presets: [
      [
        resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'not ie 11']
          }
        }
      ]
    ],
    plugins,
    env: {
      test: {
        plugins: [resolve('babel-plugin-istanbul')]
      }
    }
  }
}

function replacePath(path) {
  if (path.node.source && /\/lib\//.test(path.node.source.value)) {
    const esModule = path.node.source.value.replace('/lib/', '/es/')
    const esPath = dirname(getProjectPath('node_modules', esModule))
    if (fs.existsSync(esPath)) {
      path.node.source.value = esModule
    }
  }
}

function replaceLib() {
  return {
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath
    }
  }
}

function babelify(js, modules) {
  const babelConfig = getBabelCommonConfig(modules)
  babelConfig.babelrc = false
  delete babelConfig.cacheDirectory
  if (modules === false) {
    babelConfig.plugins.push(replaceLib)
  }
  let stream = js.pipe(babel(babelConfig)).pipe(
    through2.obj(function z(file, encoding, next) {
      this.push(file.clone())
      if (file.path.match(/\/style\/index\.(js|jsx|ts|tsx)$/)) {
        const content = file.contents.toString(encoding)
        file.contents = Buffer.from(
          content
            .replace(/\/style\/?'/g, "/style/css'")
            .replace(/\/style\/?"/g, '/style/css"')
            .replace(/\.less/g, '.css')
        )
        file.path = file.path.replace(/index\.(js|jsx|ts|tsx)$/, 'css.js')
        this.push(file)
      } else if (modules !== false) {
        const content = file.contents.toString(encoding)
        file.contents = Buffer.from(content.replace(/lodash-es/g, 'lodash').replace(/@ant-design\/icons-vue/g, '@ant-design/icons-vue/lib/icons'))
        this.push(file)
      }
      next()
    })
  )
  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end'
      })
    )
  }
  return stream.pipe(gulp.dest(modules === false ? esDir : libDir))
}

function compile_less() {
  const less = gulp
    .src(['components/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone())
        if (file.path.match(/\/style\/index\.less$/) || file.path.match(/\/style\/v2-compatible-reset\.less$/)) {
          transformLess(file.path)
            .then((css) => {
              file.contents = Buffer.from(css)
              file.path = file.path.replace(/\.less$/, '.css')
              this.push(file)
              next()
            })
            .catch((e) => {
              console.error(e)
            })
        } else {
          next()
        }
      })
    )
    .pipe(gulp.dest(libDir))
  return less
}

function compile_assets() {
  return gulp.src(['components/**/*.@(png|svg)']).pipe(gulp.dest(libDir))
}

function compile_ts() {
  let error = 0
  const source = ['components/**/*.js', 'components/**/*.jsx', 'components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts', '!components/*/__tests__/*']

  const tsResult = gulp.src(source).pipe(
    ts(tsConfig, {
      error(e) {
        tsDefaultReporter.error(e)
        error = 1
      },
      finish: tsDefaultReporter.finish
    })
  )

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1)
    }
  }

  tsResult.on('finish', check)
  tsResult.on('end', check)
  const tsFilesStream = babelify(tsResult.js, false)
  const tsd = tsResult.dts.pipe(gulp.dest(libDir))
  return { tsd, tsFilesStream }
}

function compile(modules) {
  clean()
  const less = compile_less()
  const assets = compile_assets()
  const { tsFilesStream, tsd } = compile_ts()
  const vue = compile_vue()
  return merge2([less, tsFilesStream, tsd, assets])
}

function compile_vue() {
  let error = 0
  const source = ['components/*/*.vue']

  return gulp
    .src(source)
    .pipe(
      through2.obj(function (file, _, next) {
        const d = vue()
        d.configResolved({ isProduction: true, root: './' })
        d.buildStart()
        d.transform(file.contents.toString(), file.path).then((s) => {
          file.contents = Buffer.from(
            s.code.replace(
              'import _export_sfc from "plugin-vue:export-helper";',
              `var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};`
            )
          )
          file.path = file.path.replace(/\.vue$/, '.js')
          this.push(file)
          next()
        })
      })
    )
    .pipe(gulp.dest(libDir))
}

compile()
