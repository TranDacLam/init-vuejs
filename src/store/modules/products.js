
import api from '@/api'

const state = {

};

const getters = {
   
};

const actions = {
	async getProducts({}, payload){
		try {
			return await api.getProducts(payload)
		} catch (error) {
			throw error;
		}
	},
	async createProduct({}, payload){
		try {
			return await api.createProduct(payload)
		} catch (error) {
			throw error;
		}
	},
	async getProductDetail({}, payload){
		try {
			return await api.getProductDetail(payload)
		} catch (error) {
			throw error;
		}
	},
	async updateProduct({}, payload){
		try {
			return await api.updateProduct(payload)
		} catch (error) {
			throw error;
		}
	}
};

const mutations = {
    
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};