import { computed, defineComponent } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { checkboxProp } from './propType'

export type { CheckboxProp } from './propType'

const props = checkboxProp()

export const Checkbox = withInstall(
  defineComponent({
    name: 'Checkbox',
    props,
    setup(props) {
      let className = computed(() => {
        return {
          [`${Prefix.classPrefix}checkbox`]: true
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
