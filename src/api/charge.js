import axios from '@/plugins/axios'

export default {
    getPlans(){
		return axios({
			url: '/pricing/plans',
			method: 'get'
		});
    },
    handleChargePlan(data){
		return axios({
			url: '/pricing/charge/add',
            method: 'post',
            data
		});
	},
	createDiscount(data){
		return axios({
			url: '/pricing/discount/create',
            method: 'post',
            data
		});
	},
	checkDiscount(data){
		return axios({
			url: '/pricing/discount/check',
            method: 'post',
            data
		});
	},
	getTrial(){
		return axios({
			url: '/pricing/trial-days',
			method : 'get'
		});
	}
}