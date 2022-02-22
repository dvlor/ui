<template>
  <div v-for="i in icons" @click.native="copy(i)" class="item">
    <u-icon :type="i" />
  </div>
</template>

<script setup>
const icons = [
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
]

const copy = (id) => {
  navigator.clipboard.writeText(`<u-icon type="${id}" />`)
  window.alert('代码已复制')
}
</script>
<style lang="less" scoped>
.item {
  display: inline-block;
  width: 16.6%;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 40px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #1890ff;
  }
}
</style>
