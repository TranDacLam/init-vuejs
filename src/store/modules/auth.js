import cookie from 'js-cookie'
import  { router } from '@/main.js'
import api  from '@/api'
import routerName from '@/constants/routers'

const token_name = process.env.VUE_APP_TOKEN_NAME ? process.env.VUE_APP_TOKEN_NAME : 'token'
const state = {
	token : cookie.get(token_name) ,
	store: null
};

const getters = {
    getStore(state){
		return state.store
	},
	getToken(state){
		return state.token
	},
};

const actions = {
	async getStore({commit}){
		try {
			let res =  await api.getStore();
			let { status , data } = res.data
			if( status ){
				commit('setStore', data )
			}
			return res
		} catch (error) {
			throw error;
		}
	},
	async login({} , payload){
		try {
			return await api.login(payload);
		} catch (error) {
			throw error;
		}
	},
	async shopifyLogin({} , payload){
		try {
			return await api.handleUrlShopifyLogin(payload)
		} catch (e) {
			throw e;
		}
	},
	async logout({commit}) {
		commit('removeToken')
		router.push({name : routerName.INSTALL_APP})
	},
	async initIntercom({ commit, state }) {
		// @Author: Lam
		let res = await api.getIntercom()
		let { status, data } = res.data

		window.$crisp=[];
		window.CRISP_WEBSITE_ID=process.env.VUE_APP_CRISP_WEBSITE_ID || "";
		let arr = []
		let _store = state.store
		window.CRISP_TOKEN_ID = _store.id || '';
		
		(function(){
			let d=document;
			let s=d.createElement("script");
			s.src="https://client.crisp.chat/l.js";
			s.async=1;
			d.getElementsByTagName("head")[0].appendChild(s);
		})();

		if (status) {
			for (const property in data) {
				arr.push([property, data[property]])
			}
		}

		$crisp.push(["set", "session:data", [arr]]);
		$crisp.push(["set", "user:email", _store.email])
		$crisp.push(["set", "user:nickname", _store.owner])
	},
	destroyIntercom({ commit }) {
		// window.Intercom('shutdown') Phuc
	},
	toggleShowIntercom({ }) {
		// @Author: Lam
		$crisp.push(["do", "chat:toggle"])
	},
	showIntercom({ }, payload) {
		if (payload == true) {
			// window.Intercom('show'); Phuc
			$crisp.push(["do", "chat:open"]);
		} else {
			// window.Intercom('hide'); Phuc
			$crisp.push(["do", "chat:close"]);
		}
	},
};

const mutations = {
	logout(state){
		state.token = ''
		cookie.remove(`${token_name}`)
		state.store = null
	},
    setToken(state, payload = ''){
		state.token = payload
		cookie.set(`${token_name}` , payload , {
			expires: 7
		})
	},
	removeToken(state){
		state.token = ''
		cookie.remove(`${token_name}`)
	},
	setStore(state , payload = null ){
		state.store = payload
	}
};
export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
};
