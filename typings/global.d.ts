/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module 'vue' {
  export interface GlobalComponents {
    UButton: typeof import('ui')['Button']
    UButtonGroup: typeof import('ui')['ButtonGroup']
    UIcon: typeof import('ui')['Icon']
  }
}

export {}
