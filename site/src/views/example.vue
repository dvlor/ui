<template>
  <div>
    <div class="markdown" v-html="MD.info"></div>
    <router-view />
    <div class="markdown" v-html="MD.api"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    let MD = ref({})
    ;(route.matched[route.matched.length - 1].meta.doc as Promise<any>).then((s) => {
      MD.value = s.default
    })
    watch(
      () => route.path,
      () => {
        ;(route.matched[route.matched.length - 1].meta.doc as Promise<any>).then((s) => {
          MD.value = s.default
        })
      }
    )
    return { MD }
  }
})
</script>
