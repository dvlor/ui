<template>
  <input :class="className" />
</template>
<script lang="ts">
import { Prefix } from '../_utils/prefix'
export default {
  name: 'uInput',
  data() {
    return {}
  },
  computed: {
    className() {
      return {
        [`${Prefix.classPrefix}input`]: true
      }
    }
  }
}
</script>
