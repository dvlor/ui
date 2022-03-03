import { emits } from '../_utils/vueExtend'
import { defineComponent } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { ripple } from '../_utils/ripple'
import { buttonGroupProp } from './propType'

export type { ButtonGroupProp } from './propType'
export const ButtonGroup = withInstall(
  defineComponent({
    name: 'button-group',
    components: { ripple },
    emits: emits(['click']),
    props: buttonGroupProp(),
    setup() {
      let className = {
        [`${Prefix.classPrefix}button-group`]: true
      }

      return {
        prop: {
          class: className
        }
      }
    },
    render() {
      const child = this.$slots.default()
      return <div {...this.prop}>{child}</div>
    }
  })
)
