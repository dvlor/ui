const templateReg = /<template>(.|\s)*?<\/template>/
const scriptReg = /<script(.|\s)*?<\/script>/
const styleReg = /<style(.|\s)*?<\/style>/
const docReg = /<docs>(.|\s)*?<\/docs>/

function encodeHTML(html: string): string {
  return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function splitVueTemplate(code: string) {
  function getStr(code: string, reg: RegExp, index = 0): string {
    const result = code.match(reg)
    return (result && result[index]) || ''
  }
  let template = getStr(code, templateReg)
  const style = getStr(code, styleReg)
  let script = getStr(code, scriptReg)
  const doc = getStr(code, docReg)
  if (doc && template) {
    const order = getStr(doc, /order:(.*)/, 1).trim()
    const title = getStr(doc, /zh-CN:(.*)/, 1).trim()
    const desc = getStr(doc, /zh-CN\s\s(.*)/, 1).trim()
    let example = `
${template}
${script}
${style}
`

    template = template.replace('<demo-box>', `<demo-box title='${title}' order='${order}' desc='${desc}' :example='example' >`)

    example = `
    <script setup lang="ts">
        const example = \`${encodeHTML(example)}\`
      </script>
    `

    if (script) {
      script = script + example.replace('<script setup lang="ts">', '<script lang="ts">')
    } else {
      script = example
    }
  }

  return `
${template}
${script}
${style}
  `
}
