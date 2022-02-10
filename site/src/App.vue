<script setup>
import DemoBox from './components/demoBox.vue'
</script>

<template>
  <router-view />
  <!-- <DemoBox>
    <u-button type="primary">Primary Button</u-button>
    <u-button>Default Button</u-button>
    <u-button type="dashed">Dashed Button</u-button>
    <u-button type="text">Text Button</u-button>
    <u-button type="link">Link Button</u-button>
    <u-button ghost>ghost Button</u-button>
  </DemoBox> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
