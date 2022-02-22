const noteReg = /---((?:.|\s)*?)---((.|\s)*?)(## API(.|\s)*)/
import markdown from 'markdown-it'

const tool = new markdown()

export function md(code: string) {
  const result = noteReg.exec(code)
  if (result.length !== 6) {
    return ``
  }
  return `const result = {note:\`${result[1]}\`,info:\`${tool.render(result[2])}\`,api:\`${tool.render(result[4])}\`};
  export default result
  `
}
