import './filters'
import './directives'

import Vue from 'vue'

// Import third party libs
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
Vue.use(Vuelidate)
Vue.use(VueMeta, { refreshOnceOnNavigation: true })
// Import app Mixins
import './custom-mixins'

// Configuration prototypes
import helper from './helper'
import routerName from '@/constants/routers'
Vue.prototype.$helper = helper
Vue.prototype.$routerName = routerName
