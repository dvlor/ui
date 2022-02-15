<script>
import { defineComponent, useSlots } from 'vue'

export default defineComponent({
  setup(props, { slots }) {
    return {
      leftChild: slots.default().filter((c, i) => i % 2 == 0),
      rightChild: slots.default().filter((c, i) => i % 2)
    }
  }
})
</script>
<template>
  <div class="demo">
    <div class="left">
      <component class="demo-item" v-for="c in leftChild" :is="c" />
    </div>
    <div class="right">
      <component class="demo-item" v-for="c in rightChild" :is="c" />
    </div>
  </div>
</template>
<style lang="less">
.demo {
  display: flex;
  .left {
    flex: 1;
    margin-right: 15px;
    overflow: auto;
  }
  .right {
    flex: 1;
    overflow: auto;
  }
  .demo-item {
    margin-bottom: 15px;
  }
}
</style>
