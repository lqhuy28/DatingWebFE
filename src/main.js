

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'; // Import Element Plus styles

// Add the necessary CSS
export default {
    devServer: {
      proxy: 'http://localhost:8080',
    },
  };
  
const app = createApp(App)
app.use(router)
app.use(ElementPlus);

app.mount('#app')

