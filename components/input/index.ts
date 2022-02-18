import { Prefix } from '../_utils/prefix'
import type { App } from 'vue'
import component from './input.vue'

export type { InputProp } from './prop'

export const Input = {
  install(app: App) {
    app.component(`${Prefix.componentPrefix}input`, component)
  }
}
