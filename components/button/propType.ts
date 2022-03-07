import { PropTypes } from '../_utils/vueExtend'
import type { PropType, ExtractPropTypes } from 'vue'
import { tuple } from 'components/_utils/types'

const type = tuple('default', 'primary', 'dashed', 'link', 'text')
const size = tuple('small', 'default', 'large')
const shape = tuple('default', 'circle')

const buttonProp = () => ({
  // 类型
  type: PropTypes.oneOf(type).def('default'),
  // 大小
  size: PropTypes.oneOf(size).def('default'),
  // 是否禁用
  disabled: PropTypes.bool,
  // 加载中
  loading: PropTypes.bool,
  // 图标
  icon: PropTypes.string,
  // 防抖时间 小于等于0不做处理
  debounceTime: PropTypes.number,
  // 形状
  shape: PropTypes.oneOf(shape).def('default'),
  // 危险按钮
  danger: PropTypes.bool,
  // 块状按钮
  block: PropTypes.bool,
  // 背景透明按钮
  ghost: PropTypes.bool,
  // 超链接地址
  href: PropTypes.string,
  // 超链接打开目标
  target: PropTypes.string,
  // 点击动作，封装了loading进去
  action: {
    type: Function as PropType<(e: MouseEvent) => Promise<any>>
  }
})

export type ButtonProp = Partial<ExtractPropTypes<ReturnType<typeof buttonProp>>>

export { buttonProp }

const buttonGroupProp = () => ({
  // 大小
  size: PropTypes.oneOf(size).def('default'),
  onClick: {
    type: Function as PropType<(e: MouseEvent) => void>
  }
})

export type ButtonGroupProp = Partial<ExtractPropTypes<ReturnType<typeof buttonGroupProp>>>

export { buttonGroupProp }
