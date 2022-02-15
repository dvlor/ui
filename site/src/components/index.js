import DemoBox from './demoBox.vue'
import Demo from './demo.vue'

export default {
  install(app) {
    app.component('demo-box', DemoBox)
    app.component('demo', Demo)
  }
}
