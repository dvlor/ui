import { defineComponent, nextTick } from 'vue'

const ListenEventName = 'click'

export const ripple = defineComponent({
  data() {
    return {
      dom: undefined,
      style: undefined,
      animationStart: false
    }
  },
  methods: {
    clickHandler() {
      this.reset()
      this.addShadow()
    },
    addShadow() {
      let dom = this.dom as HTMLElement
      if (!this.style) {
        let computedStyle = getComputedStyle(dom)
        let color = computedStyle.getPropertyValue('border-color') || computedStyle.getPropertyValue('background-color')
        let width = dom.offsetWidth
        let height = dom.offsetHeight
        let borderRadius = computedStyle.getPropertyValue('border-radius')
        let borderLeftWidth = parseFloat(computedStyle.getPropertyValue('border-left-width').replace('px', '')) || 0
        let borderTopWidth = parseFloat(computedStyle.getPropertyValue('border-top-width').replace('px', '')) || 0
        this.style = document.createElement('style')
        this.style.innerHTML = `
        [ripple='true']::after{
          content: '';
          display: block;
          position: absolute;
          z-index: -1;
          left: 0;
          top: 0;
          width: ${width}px;
          height: ${height}px;
          margin: -${borderLeftWidth}px 0 0 -${borderTopWidth}px;
          border-radius: ${borderRadius || 0};
          box-shadow: 0 0 0 0 ${color};
          opacity: 0;
          animation: ripple .5s linear;
        }
        @keyframes ripple {
          0% {
            box-shadow: 0 0 0 0 ${color};
            opacity: 0;
          }
          30% {
            box-shadow: 0 0 2px 0 ${color};
            opacity: .65;
          }
          100%{
            box-shadow: 0 0 4px 4px ${color};
            opacity: 0;
          }
        }
      `

        document.head.appendChild(this.style)
      }

      dom.setAttribute('ripple', 'true')
    },
    reset() {
      let dom = this.dom as HTMLElement
      dom.setAttribute('ripple', 'false')
    },
    onTransitionend() {
      if (!this.transitionStart) {
        return
      }
      this.transitionStart = false
      this.style.remove()
      let dom = this.dom as HTMLElement
      dom.setAttribute('ripple', 'false')
      this.style = undefined
    },
    onTransitionstart(e: TransitionEvent) {
      if (e.pseudoElement === '::after') {
        this.transitionStart = true
      }
    },
    bind() {
      this.$el.addEventListener('animationstart', this.onTransitionstart, true)
      this.$el.addEventListener('animationend', this.onTransitionend, true)
      this.$el.addEventListener(ListenEventName, this.clickHandler, true)
    },
    unbind() {
      this.$el.removeEventListener(ListenEventName, this.clickHandler, true)
    }
  },
  mounted() {
    nextTick(() => {
      this.dom = this.$el
      this.dom.setAttribute('ripple', 'false')
      this.bind()
    })
  },
  updated() {
    this.dom = this.$el
    this.dom.setAttribute('ripple', 'false')
    this.bind()
  },
  beforeUpdate() {
    this.unbind()
  },
  beforeUnmount() {
    this.unbind()
  },
  render() {
    return this.$slots.default()[0]
  }
})
