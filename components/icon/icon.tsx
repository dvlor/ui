import { emits, PropTypes } from '../_utils/vueExtend'
import { defineComponent, ExtractPropTypes } from 'vue'
import { withInstall } from '../_utils/types'
import { Prefix } from '../_utils/prefix'

const props: any = () => ({
  // 类型
  type: PropTypes.oneOf([
    'copy',
    'gerenzhongxin',
    'bangong',
    'shanchu',
    'dayinji',
    'kaiqi',
    'jingyin',
    'paizhao',
    'you',
    'shezhi',
    'jine',
    'lacai',
    'guanbi',
    'sousuo',
    'zhengque',
    'qiye',
    'youxiang',
    'dayin1',
    'tishi',
    'xiangmu',
    'bofang',
    'rili',
    'zuo',
    'duihua',
    'dianzan',
    'lianjie',
    'shengyin',
    'xianshi',
    'shijian',
    'ziliao',
    'gengduo',
    'zanting',
    'shoucang',
    'yincang',
    'jilu',
    'jifen',
    'kefu',
    'cuowu',
    'jian',
    'xiazai',
    'biaoqian',
    'jia',
    'zuzhi',
    'shangchuan',
    'mendian',
    'tongzhi',
    'shouye',
    'tianjia',
    'bianji',
    'chenggong',
    'wenjian',
    'tianxie',
    'xiangce',
    'tuku',
    'shuju',
    'zhibiao',
    'huakuai',
    'daojishi',
    'bangzhuzhongxin',
    'saoyisao',
    'baocun'
  ])
})

export type IconProp = Partial<ExtractPropTypes<ReturnType<typeof props>>>

export const Icon = withInstall(
  defineComponent({
    name: 'icon',
    emits: emits(['click']),
    props: props(),
    setup(_props, { emit }) {
      const handleClick = () => {
        emit('click')
      }

      let className = {
        [`${Prefix.classPrefix}icon`]: true,
        [`icon-${_props.type}`]: true
      }

      return {
        handleClick,
        prop: {
          class: className
        }
      }
    },
    render() {
      return <i {...this.prop} onClick={this.handleClick} />
    }
  })
)
