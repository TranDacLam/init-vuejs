
import api from '@/api'

const state = {
	
};

const getters = {
    
};

const actions = {
	async getCollection({}, payload){
		try{
			return await api.getCollection(payload)
		}catch (error) {
			throw error;
		}
	},
	async getCollections({}, payload){
		try{
			return await api.getCollections(payload)
		}catch (error) {
			throw error;
		}
	},
	async createCollection({}, payload){
		try{
			return await api.createCollection(payload)
		}catch (error) {
			throw error;
		}
	},
	async updateCollection({}, payload){
		try{
			return await api.updateCollection(payload)
		}catch (error) {
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