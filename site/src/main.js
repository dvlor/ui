import { createApp } from 'vue'
import 'ui/style'
import ui from 'ui'
import App from './App.vue'
const app = createApp(App)
import { routes } from './routes'

app.use(ui).use(routes).mount('#app')
