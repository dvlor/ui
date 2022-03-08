import { Checkbox } from '../${component}'
import { render, fireEvent } from '@testing-library/vue'

describe('components/${component}', () => {
  it('render', () => {
    expect(render(<Checkbox></Checkbox>).html()).toMatchSnapshot()
  })
})
