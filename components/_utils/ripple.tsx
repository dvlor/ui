import { defineComponent, nextTick } from 'vue'

export const ripple = defineComponent({
  data() {
    return {
      state: false,
      dom: undefined,
      style: undefined
    }
  },
  methods: {
    clickHandler() {
      this.reset()
      this.state = true
      let dom = this.dom as HTMLElement
      let computedStyle = getComputedStyle(dom)

      let color = computedStyle.getPropertyValue('border-color') || computedStyle.getPropertyValue('background-color')
      let width = dom.offsetWidth
      let height = dom.offsetHeight
      console.log(computedStyle.getPropertyValue('padding-left').replace('px', ''))
      let paddingLeft = parseFloat(computedStyle.getPropertyValue('padding-left').replace('px', '')) || 0
      let paddingTop = parseFloat(computedStyle.getPropertyValue('padding-top').replace('px', '')) || 0
      let borderRadius = computedStyle.getPropertyValue('border-radius')
      let borderWidth = parseFloat(computedStyle.getPropertyValue('border-width').replace('px', '')) || 0
      this.style = document.createElement('style')
      this.style.innerHTML = `
        [ripple]::after{
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
          width: ${width}px;
          height: ${height}px;
          margin: -${height - paddingTop - borderWidth}px 0 0 -${paddingLeft + borderWidth}px;
          border-radius: ${borderRadius || 0};
          box-shadow: 0 0 0px 0 ${color};
          transition: all .3s;
        }
        [ripple='true']::after{
          box-shadow: 0 0 3px 0 ${color};
        }
      `

      dom.addEventListener('transitionend', () => this.onTransitionend())

      document.head.appendChild(this.style)
      dom.setAttribute('ripple', 'true')
    },
    reset() {
      if (this.state) {
        let dom = this.dom as HTMLElement
        this.state = false

        dom.setAttribute('ripple', 'false')
        dom.removeEventListener('transitionend', () => this.onTransitionend())
      }
    },
    onTransitionend() {
      this.state = false
      let dom = this.dom as HTMLElement
      dom.setAttribute('ripple', 'false')
      this.style.remove()
    }
  },
  mounted() {
    nextTick(() => {
      this.dom = this.$el
      this.dom.setAttribute('ripple', 'false')
      this.$el.addEventListener('click', this.clickHandler, true)
    })
  },
  updated() {
    this.dom = this.$el
    this.dom.setAttribute('ripple', 'false')
    this.$el.addEventListener('click', this.clickHandler, true)
  },
  beforeUpdate() {
    this.reset()
    this.$el.removeEventListener('click', this.clickHandler, true)
  },
  beforeUnmount() {
    this.reset()
    this.$el.removeEventListener('click', this.clickHandler, true)
  },
  render() {
    return this.$slots.default()[0]
  }
})
