const templateReg = /<template>(.|\s)*?<\/template>/
const scriptReg = /<script(.|\s)*?<\/script>/
const styleReg = /<style(.|\s)*?<\/style>/
const docReg = /<docs>(.|\s)*?<\/docs>/

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
    const example = `
${template}
${script}
${style}
`

    template = template.replace('<demo-box>', `<demo-box title='${title}' order='${order}' desc='${desc}' :example='example' >`)
    if (script) {
      script = `
      ${script}
      <script lang="ts">
        const example = \`${example.replace(/</g, '&lt;').replace(/>/g, '&gt;')}\`
      </script>
    `
    } else {
      script = `
    <script setup lang="ts">
        const example = \`${example.replace(/</g, '&lt;').replace(/>/g, '&gt;')}\`
      </script>
    `
    }
  }

  console.log(`
${template}
${script}
${style}
  `)

  return `
${template}
${script}
${style}
  `
}
