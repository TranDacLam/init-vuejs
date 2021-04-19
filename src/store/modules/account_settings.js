import api from '@/api'

const state = {
	accountSettings : null
};

const getters = {
    getAccountSettings(state){
		return state.accountSettings
	},
};

const actions = {
	async getAccountSettings({commit}){
		try {
			let res =  await api.getAccountSettings();
			let { status , data } = res.data 
			if( status ){
				commit('setAccountSettings', data )
			}
			return res
		} catch (error) {
			throw error;
		}
	},
	async saveAccountSettings({commit} , payload){
		try {
			let res =  await api.saveAccountSettings(payload);
			let { status } = res.data 
			if( status ){
				commit('setAccountSettings', payload )
			}
			return res
		} catch (error) {
			throw error;
		}
	},
};

const mutations = {
    setAccountSettings(state, payload = null){
		state.accountSettings = {...state.accountSettings, ...payload}
    }
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};