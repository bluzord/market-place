import { createApp } from 'vue'
import { router } from '@/app/router'
import App from './App.vue'

export const application = createApp(App).use(router)
