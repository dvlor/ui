import { Radio } from '../${component}'
import { render, fireEvent } from '@testing-library/vue'

describe('components/${component}', () => {
  it('render', () => {
    expect(render(<Radio></Radio>).html()).toMatchSnapshot()
  })
})
