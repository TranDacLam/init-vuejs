import axios from '@/plugins/axios'

export default {
	handleUrlShopifyLogin(data){
		return axios({
			url: '/login',
			method: 'post',
			data
		});
	},
	login({shop = ''}){
		return axios({
			url: '/install',
			method: 'post',
			data : { shopify_domain: shop }
		});
	},
	getStore(){
		return axios({
			url: '/store',
			method: 'get',
		});
	},
	getIntercom(){
		return axios({
			url: '/intercom',
			method: 'get',
		});
	}
}
