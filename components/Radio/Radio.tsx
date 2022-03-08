import { computed, defineComponent } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { radioProp } from './propType'

export type { RadioProp } from './propType'

const props = radioProp()

export const Radio = withInstall(
  defineComponent({
    name: 'Radio',
    props,
    setup(props) {
      let className = computed(() => {
        return {
          [`${Prefix.classPrefix}radio`]: true
        }
      })
      return {
        className,
        props
      }
    },
    render() {
      return (
        <div {...this.props} class={this.className}>
          {this.$slots.default()}
        </div>
      )
    }
  })
)
