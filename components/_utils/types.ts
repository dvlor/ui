import type { App, Plugin, DefineComponent } from 'vue'
import { Prefix } from './prefix'
export const installWrap = function <T>(name: string, component: DefineComponent<T>): DefineComponent<T> & Plugin {
  const instance: any = component
  instance.install = function (app: App) {
    app.component(`${Prefix.componentPrefix}${name.toLowerCase()}`, component)
  }
  return instance
}
