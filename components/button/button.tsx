import { emits, PropTypes } from '../_utils/vueExtend'
import { defineComponent, ExtractPropTypes, PropType } from 'vue'
import { installWrap } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { ripple } from '../_utils/ripple'

const props = () => ({
  // 大小
  size: PropTypes.oneOf(['smll', 'default', 'large']),
  // 是否禁用
  disabled: PropTypes.bool,
  // 加载中
  loading: PropTypes.bool,
  // 图标
  icon: PropTypes.string,
  // 防抖时间 小于等于0不做处理
  debounceTime: PropTypes.number,
  // 形状
  shape: PropTypes.oneOf(['default', 'circle']),
  // 类型
  type: PropTypes.oneOf(['default', 'primary', 'dashed', 'link', 'text']),
  danger: PropTypes.bool,
  block: PropTypes.bool,
  ghost: PropTypes.bool,
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>
  }
})

export type ButtonProp = Partial<ExtractPropTypes<ReturnType<typeof props>>>

export const Button = installWrap(
  'button',
  defineComponent({
    components: { ripple },
    emits: emits(['click']),
    props: props(),
    slots: ['icon'],
    setup(props, { emit }) {
      const handleClick = (e: MouseEvent) => {
        // e.stopPropagation()
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
          <div {...this.prop} onClick={this.handleClick}>
            {this.$slots.icon && this.$slots.icon()}
            {this.$slots.default()}
          </div>
        </ripple>
      ) : (
        <div {...this.prop} onClick={this.handleClick}>
          {this.$slots.icon && this.$slots.icon()}
          {this.$slots.default()}
        </div>
      )
    }
  })
)
