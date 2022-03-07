import type { App, Plugin } from 'vue'
import { Prefix } from './prefix'

export const withInstall = <T>(component: T) => {
  const instance: any = component
  instance.install = function (app: App) {
    instance.name = `${Prefix.componentPrefix}${instance.name.toLowerCase()}`
    app.component(instance.name, component)
  }
  return instance as T & Plugin
}

export const tuple = <T extends string[]>(...args: T) => args
