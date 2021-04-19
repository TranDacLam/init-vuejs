import axios from '@/plugins/axios'

export default {
    saveUpdateApp(){
		return axios({
			url: '/store/update-app',
			method: 'post',
		});
	},
}
