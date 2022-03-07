import { ${name_pascal} } from '../${component}'
import { render, fireEvent } from '@testing-library/vue'

describe('components/${component}', () => {
  it('render', () => {
    expect(render(<${name_pascal}></${name_pascal}>).html()).toMatchSnapshot()
  })
})
