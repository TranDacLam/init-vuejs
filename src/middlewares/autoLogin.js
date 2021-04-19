import routerName from '@/constants/routers'

export default async ({ next, router , store , to})=> {
	if(to.query){
		if(to.query.hasOwnProperty('hmac') && to.query.hasOwnProperty('timestamp') && to.query.hasOwnProperty('shop')){
			var shop = to.query.shop 
			let pattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+myshopify.com$/g
			if( !shop || (shop && !pattern.test(String(shop).toLowerCase()))){
				return true;
			}
			// var shopname = shop.replace(/.myshopify.com/gi, "")
			try {
				store.commit('setLoading', true)
				let res = await store.dispatch('auth/shopifyLogin' , {shop})
				if( res.status ){
					let { status , data } = res.data
					if( status ){
						window.location.href = data.redirect_url
						return false
					}
				}
				store.commit('setLoading', false)
			} catch (e) {
				console.log(e)
			} finally {
				// code
			}
		}else if(to.query.hasOwnProperty('api_token')){
			const token = to.query.api_token
			try {
				store.commit('auth/setToken', token)
				next({name: routerName.DASHBOARD})
				return false
			} catch (e) {
				console.log(e)
			}
		}
	}
	return true
}