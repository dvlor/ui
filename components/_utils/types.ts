import type { App, Plugin } from 'vue'
import { Prefix } from './prefix'

export const withInstall = <T>(component: T) => {
  const instance: any = component
  instance.install = function (app: App) {
    app.component(`${Prefix.componentPrefix}${instance.name.toLowerCase()}`, component)
  }
  return instance as T & Plugin
}
