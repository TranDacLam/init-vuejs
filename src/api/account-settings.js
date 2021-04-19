import axios from '@/plugins/axios'

export default {
    saveAccountSettings(data){
		return axios({
			url: '/account-settings',
			method: 'post',
			data
		});
	},
	getAccountSettings(){
		return axios({
			url: '/account-settings',
			method: 'get'
		});
	},
}
