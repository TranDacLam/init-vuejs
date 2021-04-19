import axios from '@/plugins/axios'

export default {
	getCollections(query){
		let { limit = 10 , keyword = '', page = 1 , order_type = ''} = query 
		return axios({
			url: '/collections',
			method: 'get',
			params: {
				page ,
				limit , 
				filters: {keyword},
				order_type
			}
		})
	},
	getCollection(id){
		return axios({
			url: `/collections/${id}`,
			method: 'get',
		})
	},
	createCollection(data){
		return axios({
			url: '/collections/create',
			method: 'post',
			data
		})
	},
	updateCollection(payload){
		let { id , data  } = payload
		return axios({
			url: `/collections/update/${id}`,
			method: 'post',
			data,
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
	}
}