import { PropTypes } from 'components/_utils/vueExtend'
import { ExtractPropTypes } from 'vue'

const props = () => ({
  // 大小
  size: PropTypes.oneOf(['smll', 'default', 'large'])
})

export type InputProp = Partial<ExtractPropTypes<ReturnType<typeof props>>>
