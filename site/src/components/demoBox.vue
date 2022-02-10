<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>
a

<template>
  <div class="demo-box">
    <div class="example">
      <slot />
    </div>
    <div class="title">
      <h3>按钮类型</h3>
    </div>
    <div class="summary">按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。主按钮在同一个操作区域最多出现一次。</div>
    <div class="tool"></div>
    <div class="coding"></div>
  </div>
</template>

<style lang="less" scoped>
@import 'ui/style/theme/index.less';

@padding-h: 24px;
.demo-box {
  border: solid 1px @border-color-split;
  text-align: left;
  .example {
    padding: 30px @padding-h;
    border-radius: 4px;
  }
  .title {
    height: 1px;
    position: relative;
    background-color: @border-color-split;
    h3 {
      position: absolute;
      left: @padding-h;
      background-color: @white;
      padding: 0 1em;
      transform: translateY(-50%);
    }
  }
  .summary {
    padding: 30px @padding-h;
    border-bottom: solid 1px @border-color-split;
  }
  .tool {
    padding: 15px @padding-h;
  }

  .coding {
    padding: 30px @padding-h;
  }
}
</style>
