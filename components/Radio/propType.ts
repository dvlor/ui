import { PropTypes } from '../_utils/vueExtend'
import type { PropType, ExtractPropTypes } from 'vue'
import { tuple } from '../_utils/types'

const type = tuple('default', 'primary', 'dashed', 'link', 'text')

const radioProp = () => ({
  // 类型
  type: PropTypes.oneOf(type).def('default'),
  action: {
    type: Function as PropType<(e: MouseEvent) => Promise<any>>
  }
})

export type RadioProp = Partial<ExtractPropTypes<ReturnType<typeof radioProp>>>

export { radioProp }
