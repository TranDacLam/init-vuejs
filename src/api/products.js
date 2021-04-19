import axios from '@/plugins/axios'

export default {
	getProducts(query){
		let { limit = 10 , keyword = '', page = 1} = query 
		return axios({
			url: '/products',
			method: 'get',
			params: {
				page ,
				limit , 
				filters: {keyword}
			}
		})
	},
	createProduct(form){
		return axios({
			url:'/products/create',
			method: 'post',
			data: form,
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
	},
	getProductDetail(query){
		let { product_id=0 } = query
		return axios({
			url: '/products/'+product_id,
			method: 'get'
		})
	},
	updateProduct(data){
		let {formData = {}, product_id=0 } = data
		return axios({
			url: '/products/update/'+product_id,
			method: 'post',
			data: formData,
			headers:{
				'Content-Type':'multipart/form-data'
			}
		})
	}
}