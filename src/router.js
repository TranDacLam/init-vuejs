import Vue from 'vue'
import Router from 'vue-router'
import { store , app } from '@/main.js'
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort = emptyFn) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)
const router = new Router({
	mode: 'history',
	scrollBehavior(to) {
        if (to.hash) {
            return window.scrollTo({ top: document.querySelector(to.hash).offsetTop, behavior: 'smooth' });
        }
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    }
})



router.beforeEach( async (to, from, next) => {

	if(process.env.VUE_APP_IS_MAINTENANCE == 'true' && to.name != routerName.MAINTENANCE){
		store.commit('setRouterLoading' , false)
		return next({ name: routerName.MAINTENANCE })
    }

	store.commit('setRouterLoading' , true)

	if (to.meta.middleware) {
		const middleware = to.meta.middleware
        const context = { next , from , to , router, store , app };
		var preventNext = false
		for (let i = 0; i < middleware.length; i++) {
			const result = await middleware[i](context);
			if( !result ){
				preventNext = true
				break
			}
		}
		if( preventNext ){
			return;
		}
	}

	return next(store.commit('setRouterLoading' , false))
});

export default router