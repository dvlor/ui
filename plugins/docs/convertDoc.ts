const templateReg = /<template>(.|\s)*<\/template>/
const scriptReg = /<script(.|\s)*<\/script>/
const styleReg = /<style(.|\s)*<\/style>/

export function splitVueTemplate(code: string) {
  console.log(code)
  const template = code.match(templateReg)
  const style = code.match(scriptReg)
  const script = code.match(styleReg)

  return `
${template && template[0]}
${script && script[0]}
${style && style[0]}
  `
}
