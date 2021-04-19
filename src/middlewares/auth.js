import routerName from '@/constants/routers'

export default async function({ next, router , store, to}){
	/* check token from store */
	let token = store.getters['auth/getToken']
	if( token ){
		/* get user from store */
		try {
			let res = await store.dispatch('auth/getStore')
			let { status , data = null } = res.data 
			if( status ){
				if(!data.app_plan || (data.app_plan && data.app_plan != 'free' && !data.billing_id)){
					if(to.name == routerName.CHOOSE_PLAN){
						return true
					}
					next({ name: routerName.CHOOSE_PLAN })
					return false
				}
				if(data.update_required && to.name != routerName.UPDATE_APP){
					next({ name: routerName.UPDATE_APP })
					return false
				}
				if(to.name == routerName.CHOOSE_PLAN && ((data.app_plan && data.app_plan == 'free') || (data.app_plan && data.app_plan != 'free' && data.billing_id))){
					next({ name: routerName.DASHBOARD })
					return false
				}
				return true
			}
			return false
		} catch (err) {
			return false
		}
	}
	/* finally if return login page for all false conditions */
	next({ name: routerName.INSTALL_APP })
	return false
}
