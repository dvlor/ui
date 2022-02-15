import { Demo } from '../demo'
import { render, fireEvent } from '@testing-library/vue'

describe('components/demo', () => {
  it('render', () => {
    expect(render(<Demo>click</Demo>).html()).toMatchSnapshot()
  })

  it('click event', async () => {
    let i = 0
    const handleClick = () => {
      i++
    }

    const { getByText } = render(<Demo onClick={handleClick}>click me</Demo>)
    await fireEvent.click(getByText('click me'))
    expect(i).toBe(1)
  })
})
