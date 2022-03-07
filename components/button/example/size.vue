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
      <u-button :type="'small' == size ? 'primary' : undefined" @click="changeSize('small')">S</u-button>
      <u-button :type="'default' == size ? 'primary' : undefined" @click="changeSize('default')">M</u-button>
      <u-button :type="'large' == size ? 'primary' : undefined" @click="changeSize('large')">L</u-button>
    </u-button-group>
    <div>
      <u-button :size="size">Default Button</u-button>
      <u-button type="primary" :size="size">Primary Button</u-button>
      <u-button type="dashed" :size="size">Dashed Button</u-button>
    </div>
  </demo-box>
</template>

<script lang="ts" setup>
import { ref } from '@vue/reactivity'

const size = ref('default')

const changeSize = (value: string) => {
  size.value = value
}
</script>
