import Vue from 'vue'
import Vuex from 'vuex'
import root from './modules/root'
import auth from './modules/auth'
import accountSettings from './modules/account_settings'
import charge from './modules/charge'
import collections from './modules/collections' 
import customers from './modules/customers'
import dashboard from './modules/dashboard'
import orders from './modules/orders'
import settings from './modules/settings'
import products from './modules/products'
import updateApp from './modules/update_app'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        root,
        auth,
        accountSettings,
        charge,
        collections,
        customers,
        dashboard,
        orders,
        settings,
        products,
        updateApp
    }
})