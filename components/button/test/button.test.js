import { Button } from '../button'
import { render, fireEvent } from '@testing-library/vue'

describe('components/button', () => {
  it('render', () => {
    expect(render(<Button>click</Button>).html()).toMatchSnapshot()
  })

  it('click event', async () => {
    let i = 0
    const handleClick = () => {
      i++
    }

    const { getByText } = render(<Button onClick={handleClick}>click me</Button>)
    await fireEvent.click(getByText('click me'))
    expect(i).toBe(1)
  })
})
