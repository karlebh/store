import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './index.css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
// import '@ocrv/vue-tailwind-pagination/styles'

const app = createApp(App)

app.use(store).use(router)

router.isReady().then(() => {
  app.mount('#app')
})

