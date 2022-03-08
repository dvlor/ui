export const exampleRoutes = [
  
  {
    path: 'button',
    meta: {doc: import('../../../components/button/index.md'), type: '通用', title: 'Button', subtitle: '按钮'},
    component: () => import('../../../components/button/example/index.vue')
  },
  {
    path: 'Checkbox',
    meta: {doc: import('../../../components/Checkbox/index.md'), type: '通用', title: 'Checkbox', subtitle: '例子'},
    component: () => import('../../../components/Checkbox/example/index.vue')
  },
  {
    path: 'icon',
    meta: {doc: import('../../../components/icon/index.md'), type: '通用', title: 'Icon', subtitle: '图标'},
    component: () => import('../../../components/icon/example/index.vue')
  },
  {
    path: 'input',
    meta: {doc: import('../../../components/input/index.md'), type: '表单', title: 'Input', subtitle: '文本'},
    component: () => import('../../../components/input/example/index.vue')
  },
  {
    path: 'Radio',
    meta: {doc: import('../../../components/Radio/index.md'), type: '通用', title: 'Radio', subtitle: '例子'},
    component: () => import('../../../components/Radio/example/index.vue')
  }
]
