import { emits } from '../_utils/vueExtend'
import { defineComponent } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { ripple } from '../_utils/ripple'
import { buttonProp } from './propType'

export type { ButtonProp } from './propType'

export const Button = withInstall(
  defineComponent({
    name: 'button',
    components: { ripple },
    emits: emits(['click']),
    props: buttonProp(),
    slots: ['icon'],
    setup(props, { emit }) {
      const handleClick = () => {
        if (props.disabled) {
          return
        }
        if (props.type == 'link' && props.href) {
          window.open(props.href, props.target || 'self')
        }
        emit('click')
      }

      let className = {
        [`${Prefix.classPrefix}button`]: true,
        [`${Prefix.classPrefix}button-danger`]: props.danger,
        [`${Prefix.classPrefix}button-${props.type}`]: !!props.type,
        [`${Prefix.classPrefix}button-ghost`]: !!props.ghost,
        [`${Prefix.classPrefix}button-disabled`]: !!props.disabled,
        [`${Prefix.classPrefix}button-block`]: !!props.block
      }

      return {
        handleClick,
        showRipple: props.type !== 'text' && props.type !== 'link' && !props.disabled,
        prop: {
          class: className
        }
      }
    },
    render() {
      return this.showRipple ? (
        <ripple>
          <button {...this.prop} onClick={this.handleClick}>
            {this.$slots.icon && this.$slots.icon()}
            {this.$slots.default()}
          </button>
        </ripple>
      ) : (
        <button {...this.prop} onClick={this.handleClick}>
          {this.$slots.icon && this.$slots.icon()}
          {this.$slots.default()}
        </button>
      )
    }
  })
)
