---
category: Components
type: 通用
title: Button
subtitle: 按钮
cover: https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## API

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性         | 说明                                                    | 类型               | 默认值    | 版本 |
| ------------ | ------------------------------------------------------- | ------------------ | --------- | ---- |
| size         | 按钮大小，可以设置为`smll \| default \| large`          | string             | `default` |      |
| disabled     | 是否禁用                                                | boolean            | `false`   |      |
| loading      | 加载中                                                  | boolean            | `false`   |      |
| icon         | 图标                                                    | string             | -         |      |
| debounceTime | 防抖时间 小于等于 0 不做处理                            | number             | -         |      |
| shape        | 形状 `default \| circle`                                | string             | `default` |      |
| type         | 按钮类型 `default \| primary \| dashed \| link \| text` | string             | `default` |      |
| loading      | 设置按钮载入状态                                        | boolean            | `false`   |      |
| danger       | 危险按钮                                                | boolean            | `false`   |      |
| block        | 自适应父元素宽度                                        | boolean            | `false`   |      |
| ghost        | 是否设置背景透明                                        | boolean            | `false`   |      |
| href         | 链接, type 为 `link` 时生效                             | string             | -         |      |
| target       | 同 a 标签 target 属性，type 为 `link` 时生效            | string             | -         |      |
| action       | 点击之后触发的行为,会自动显示 loading 状态              | (event) => Promise | -         |      |

### 事件

| 事件名称 | 说明             | 回调参数        | 版本 |
| -------- | ---------------- | --------------- | ---- |
| click    | 点击按钮时的回调 | (event) => void |      |

支持原生 button 的其他所有属性。
