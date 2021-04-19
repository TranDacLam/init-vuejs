import cookie from 'js-cookie'

var lang = cookie.get('oa_language')
if( !lang ){
	lang = 'en'
	cookie.set( 'oa_language' , lang , { 
		expires: 30
	})
}
const state = {
	isLoading : false,
	isRouterLoading: false,
	isError : false,
	language : lang
}

const getters = {
    getLoading(state){
        return state.isLoading
	},
	getError(state){
		return state.isError
	},
	getRouterLoading(state){
		return state.isRouterLoading
	},
	getLanguage(state){
		return state.language
	},
};

const actions = {
    setLanguage({commit} , payload){
		commit('setLanguage' , payload)
	},
	initOneSignal({}){ //integration notification
		if(!process.env.VUE_APP_KEY_ONE_SIGNAL){
			return
		}
		let OneSignal = window.OneSignal || []
		OneSignal.push(function() {
			OneSignal.init({
				appId: process.env.VUE_APP_KEY_ONE_SIGNAL
			})
		})
	}
};

const mutations = {
    setLoading(state , payload ){
        state.isLoading = payload
	},
	setError(state, payload){
		state.isError = payload
	},
	setRouterLoading(state , payload ){
        state.isRouterLoading = payload
	},
	setLanguage(state , payload){
		state.language = payload
	}
};

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: false,
};