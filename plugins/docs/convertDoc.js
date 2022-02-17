const templateReg = /<template>(.|\s)*?<\/template>/;
const scriptReg = /<script(.|\s)*?<\/script>/;
const styleReg = /<style(.|\s)*?<\/style>/;
const docReg = /<docs>(.|\s)*?<\/docs>/;
export function splitVueTemplate(code) {
    function getStr(code, reg, index = 0) {
        const result = code.match(reg);
        return (result && result[index]) || '';
    }
    let template = getStr(code, templateReg);
    const style = getStr(code, scriptReg);
    const script = getStr(code, styleReg);
    const doc = getStr(code, docReg);
    if (doc && template) {
        const order = getStr(doc, /order:(.*)/, 1).trim();
        const title = getStr(doc, /zh-CN:(.*)/, 1).trim();
        const desc = getStr(doc, /zh-CN\s\s(.*)/, 1).trim();
        const example = `
${template}
${script}
${style}`;
        template = template.replace('<demo-box>', `<demo-box title='${title}' order='${order}' desc='${desc}' example='${example}' >`);
    }
    return `
${template}
${script}
${style}
  `;
}
