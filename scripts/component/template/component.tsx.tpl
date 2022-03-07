import { computed, defineComponent } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'
import { ${name_camcel}Prop } from './propType'

export type { ${name_pascal}Prop } from './propType'

const props = ${name_camcel}Prop()

export const ${name_pascal} = withInstall(
  defineComponent({
    name: '${name_pascal}',
    props,
    setup(props) {
      let className = computed(() => {
        return {
          [`${Prefix.classPrefix}${name_kebab}`]: true
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
