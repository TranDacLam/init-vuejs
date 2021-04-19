
import api from '@/api'

const state = {
	plans: null,
	trial: null
};

const getters = {
    getPlans(state){
		return state.plans
	},
	getTrial(state){
		return state.trial
	}
};

const actions = {
    async getPlans({commit}){
		try {
            let res =  await api.getPlans();
            let { status , data } = res.data
            if( status ){
                commit('setPlans', data )
            }
            return res
		} catch (error) {
			throw error;
		}
    },
    async handleChargePlan({}, payload){
		try {
			return await api.handleChargePlan(payload);
		} catch (error) {
			throw error;
		}
	},
	async createDiscount({}, payload){
		try {
			return await api.createDiscount(payload);
		} catch (error) {
			throw error;
		}
	},
	async checkDiscount({}, payload){
		try {
			return await api.checkDiscount(payload);
		} catch (error) {
			throw error;
		}
	},
	async getTrial({commit}){
		try{
			let res = await api.getTrial();
			let {status, data} = res.data;
			if (status){
				commit('setTrial', data)
			}
		}catch (error){
			throw error;
		}
	}
};

const mutations = {
    setPlans(state, payload = null){
		if (payload.essential) {
			payload.essential['is_hightlighted'] = true
		}
		delete payload['premium']
		state.plans = payload
	},
	setTrial(state, payload = null){
		state.trial = payload
	}
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};
