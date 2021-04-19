import axios from '@/plugins/axios'

export default {
    getOrders(query){
		let { limit = 10 , keyword = '' , page = 1 , order_type = '' , order_by  = '', payment_status, cancel_request_token = null } = query 
		return axios({
			url: '/orders',
			method: 'get',
			cancelToken : cancel_request_token,
			params : {
				page, 
				limit, 
				filters: {keyword, payment_status}, 
				order_type, 
				order_by
			} 
		});
	}
}