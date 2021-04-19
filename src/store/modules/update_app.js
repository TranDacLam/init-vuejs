import api  from '@/api'

const state = {
};

const getters = {
};

const actions = {
    async saveUpdateApp({commit}){
		try {
            let res =  await api.saveUpdateApp();
            console.log(res)
			let { status , data } = res.data 
			if( status ){
				
			}
			return res
		} catch (error) {
			throw error;
		}
	},
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