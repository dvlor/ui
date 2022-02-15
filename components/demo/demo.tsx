import { emits, PropTypes } from '../_utils/vueExtend'
import { defineComponent, ExtractPropTypes } from 'vue'
import { installWrap } from '../_utils/types'
import { Prefix } from '../_utils/prefix'

const props = () => ({
  // 大小
  size: PropTypes.oneOf(['smll', 'default', 'large'])
})

export type DemoProp = Partial<ExtractPropTypes<ReturnType<typeof props>>>

export const Demo = installWrap(
  'demo',
  defineComponent({
    emits: emits(['click']),
    props: props(),
    setup(props, { emit }) {
      const handleClick = (e: MouseEvent) => {
        e.stopPropagation()
        emit('click')
      }
      return {
        handleClick,
        prop: {
          ...props,
          class: {
            [`${Prefix.classPrefix}-demo`]: true
          }
        }
      }
    },
    render() {
      return (
        <div {...this.prop} onClick={this.handleClick}>
          {this.$slots.default()}
        </div>
      )
    }
  })
)
