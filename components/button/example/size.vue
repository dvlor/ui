<docs>
---
order: 0
title:
  zh-CN: 尺寸
  en-US: Size
---

## zh-CN

支持不同类型大小的按钮smll, default, large

</docs>

<template>
  <demo-box>
    <u-button-group>
      <u-button :type="'small' == size ? 'primary' : ''" @click="changeSize('small')">S</u-button>
      <u-button :type="'default' == size ? 'primary' : ''" @click="changeSize('default')">M</u-button>
      <u-button :type="'large' == size ? 'primary' : ''" @click="changeSize('large')">L</u-button>
    </u-button-group>
    <u-button-group>
      <u-button disabled>S</u-button>
      <u-button type="primary">M</u-button>
      <u-button type="dashed">L</u-button>
    </u-button-group>
  </demo-box>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'

const size = ref('default')

const changeSize = (value: string) => {
  size.value = value
}
</script>
