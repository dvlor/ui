import { emits, PropTypes } from '../_utils/vueExtend'
import { defineComponent, ExtractPropTypes, PropType } from 'vue'
import { installWrap } from '../_utils/types'
import { Prefix } from '../_utils/prefix'

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
    emits: emits(['click']),
    props: props(),
    slots: ['icon'],
    setup(props, { emit }) {
      const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        emit('click')
      }

      let className = {
        [`${Prefix.classPrefix}button`]: true,
        [`${Prefix.classPrefix}button-danger`]: props.danger,
        [`${Prefix.classPrefix}button-${props.type}`]: !!props.type,
        [`${Prefix.classPrefix}button-ghost`]: !!props.ghost
      }

      return {
        handleClick,
        prop: {
          class: className
        }
      }
    },
    render() {
      return (
        <div {...this.prop} onClick={this.handleClick}>
          {this.$slots.icon && this.$slots.icon()}
          {this.$slots.default()}
        </div>
      )
    }
  })
)
