import { emits, PropTypes } from '../_utils/vueExtend'
import { defineComponent, ExtractPropTypes } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'

const demoProps = () => ({
  // 大小
  size: PropTypes.oneOf(['smll', 'default', 'large'])
})

const props = demoProps()

export type DemoProp = Partial<ExtractPropTypes<ReturnType<typeof demoProps>>>

const component = defineComponent({
  MD: 'demo md',
  name: 'demo',
  emits: emits(['click']),
  props: props,
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

export const Demo = withInstall(component)
