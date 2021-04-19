
import api from '@/api'

const state = {
	customer: null
};

const getters = {
    getCustomer(state){
		return state.accountSettings
	},
};

const actions = {
	async getCustomers({}, payload){
		try{
			return await api.getCustomers(payload)
		}catch (error) {
			throw error;
		}
	},
	async getCustomer({}, payload){
		try{
			return await api.getCustomer(payload)
		}catch (error) {
			throw error;
		}
	},
	async createCustomer({}, payload){
		try{
			return await api.createCustomer(payload)
		}catch (error) {
			throw error;
		}
	},
	async updateCustomer({}, payload){
		try{
			return await api.updateCustomer(payload)
		}catch (error) {
			throw error;
		}
	}
};

const mutations = {
	setCustomer(state, payload = null){
		state.customer = {...state.customer, ...payload}
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};