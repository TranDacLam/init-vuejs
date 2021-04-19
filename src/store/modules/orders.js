
import api from '@/api'

const state = {
	listOrders: null
};

const getters = {
    getOrders(state){
		return state.listOrders
	}
};

const actions = {
    async getOrders({commit}, payload){
		try {
			let res =  await api.getOrders(payload);
			let { status , data } = res.data 
			if( status ){
				commit('setOrders', data.data )
			}
			return res
		} catch (error) {
			throw error;
		}
	}
};

const mutations = {
    setOrders(state, payload = []){
		state.listOrders = payload
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};