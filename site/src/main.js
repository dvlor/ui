import { createApp } from 'vue'
import 'ui/style'
import ui from 'ui'
import App from './App.vue'
const app = createApp(App)
import { routes } from './routes'
import components from './components'

app.use(ui).use(components).use(routes).mount('#app')
