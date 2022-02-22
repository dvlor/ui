import { createApp } from 'vue'
import 'ui/style'
import ui from 'ui'
// import 'ui_compile/style'
// import ui from 'ui_compile'
import App from './App.vue'
const app = createApp(App)
import './assets/style/markdown.less'
import { routes } from './routes'
import components from './components'

app.use(ui).use(components).use(routes).mount('#app')
