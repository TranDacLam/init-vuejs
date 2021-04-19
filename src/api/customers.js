import axios from '@/plugins/axios'

export default {
	getCustomers(query){
		let { limit = 10 , keyword = '', page = 1 , order_type = ''} = query 
		return axios({
			url: '/customers',
			method: 'get',
			params: {
				page ,
				limit , 
				filters: {keyword},
				order_type
			}
		})
	},
	getCustomer(id){
		return axios({
			url: `/customers/${id}`,
			method: 'get',
		})
	},
	createCustomer(data){
		return axios({
			url: '/customers/create',
			method: 'post',
			data
		})
	},
	updateCustomer(payload){
		let { id , data  } = payload
		return axios({
			url: `/customers/update/${id}`,
			method: 'post',
			data
		})
	}
}