import { tuple } from 'components/_utils/types'
import { PropTypes } from 'components/_utils/vueExtend'
import { ExtractPropTypes } from 'vue'

const size = tuple('smll', 'default', 'large')

const props = () => ({
  // 大小
  size: PropTypes.oneOf(size).def('default')
})

export type InputProp = Partial<ExtractPropTypes<ReturnType<typeof props>>>
