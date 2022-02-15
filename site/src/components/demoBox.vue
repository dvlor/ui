<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return { showCode: false, show: false }
  },
  props: { desc: String, order: String, title: String, example: String }
})
</script>

<template>
  <div class="demo-box">
    <div class="example">
      <slot />
    </div>
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="summary">{{ desc }}</div>
    <div class="tool">
      <u-button type="text" @click="show = !show">
        <u-icon style="font-size: 20px" v-show="show" type="xianshi" />
        <u-icon style="font-size: 20px" v-show="!show" type="yincang" />
      </u-button>
    </div>
    <pre v-show="show" class="coding">{{ example }}</pre>
  </div>
</template>

<style lang="less" scoped>
@import 'ui/style/theme/index.less';

@padding-h: 24px;
.demo-box {
  border: solid 1px @border-color-split;
  text-align: left;
  border-radius: 4px;
  .example {
    padding: 30px @padding-h;
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
    font-size: 18px;
  }

  .coding {
    overflow: auto;
    padding: 0 @padding-h 30px;
  }
}
</style>
