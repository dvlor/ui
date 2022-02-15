<docs>
---
order: 0
title:
  zh-CN: 幽灵按钮
---

## zh-CN

幽灵按钮将其他按钮的内容反色，背景变为透明，常用在有色背景上。

</docs>

<template>
  <demo-box>
    <div style="background: #f2f2f2; padding: 10px">
      <u-button ghost type="primary">Primary Button</u-button>
      <u-button ghost>Default Button</u-button>
      <u-button ghost type="dashed">Dashed Button</u-button>
      <u-button ghost type="text">Text Button</u-button>
      <u-button
        ghost
        type="link"
        href="https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E4%BD%BF%E7%94%A8%E6%B8%B2%E6%9F%93%E5%87%BD%E6%95%B0"
        tagrt="_blink"
        >Link Button</u-button
      >
    </div>
  </demo-box>
</template>
