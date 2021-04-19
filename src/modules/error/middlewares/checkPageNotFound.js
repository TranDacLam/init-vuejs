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
                next({ name: routerName.DASHBOARD })
                return true
			}
		} catch (err) {
			return false
		}
	}
	/* finally if return login page for all false conditions */
	next({ name: routerName.INSTALL_APP })
	return false
}
