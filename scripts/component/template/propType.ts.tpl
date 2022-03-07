import { PropTypes } from '../_utils/vueExtend'
import type { PropType, ExtractPropTypes } from 'vue'
import { tuple } from 'components/_utils/types'

const type = tuple('default', 'primary', 'dashed', 'link', 'text')

const ${name_camcel}Prop = () => ({
  // 类型
  type: PropTypes.oneOf(type).def('default'),
  action: {
    type: Function as PropType<(e: MouseEvent) => Promise<any>>
  }
})

export type ${name_pascal}Prop = Partial<ExtractPropTypes<ReturnType<typeof ${name_camcel}Prop>>>

export { ${name_camcel}Prop }

