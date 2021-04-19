import Vue from 'vue'
import App from './layouts/App.vue'
import store from './store'
import router from './router'
// Multilingual
import i18n from './i18n'
// Prototypes, directives, filters, mixins, global methods (helpers)
import './plugins'
// App feature, same as Pages
import './modules'

import app_settings from './app_settings'
import * as fireapps  from 'fireapps-kit'
import 'fireapps-kit/dist/fireapps.css'
import './styles/style.scss'

if(process.env.NODE_ENV === 'production') {
    Vue.config.devtools = false
}

Vue.use(fireapps, app_settings)

Vue.config.productionTip = false
const app = new Vue({
    store,
    router,
	i18n,
    render: h => h(App)
}).$mount('#app')
export  { app , store , router , i18n  }
