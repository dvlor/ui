const { src, dest, task, series, emit } = require('gulp')
const path = require('path')
const ts = require('gulp-typescript')
const through2 = require('through2')

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts']
const tsConfig = Object.assign(
  {
    noUnusedParameters: true,
    noUnusedLocals: true,
    strictNullChecks: true,
    target: 'es6',
    jsx: 'preserve',
    moduleResolution: 'node',
    declaration: true,
    allowSyntheticDefaultImports: true
  },
  require('../../tsconfig.json').compilerOptions
)

function buildLess() {
  return src(path.join(__dirname, '../../components/**/*.less')).pipe(dest(path.join(__dirname, '../../lib')))
}

function clean() {}

function buildTS() {
  return src([path.join(__dirname, '../../components/*/*.ts'), path.join(__dirname, '../../components/*/*.tsx')])
    .pipe(ts(tsConfig))
    .js.pipe(
      through2.obj(function (file, encoding, next) {
        // console.log(file.path, file.base);
        file.path = file.path.replace(/\.[jt]sx$/, '.js')
        this.push(file)
        next()
      })
    )
    .pipe(dest(path.join(__dirname, '../../lib')))
}

buildTS()
