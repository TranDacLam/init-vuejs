<template>
	<div class="update-app-page">
		<t-update-version
			@update-now="updateNow"
		/>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name : 'UpdateApp',
	metaInfo: {
		title: 'Update',
	},
	data :() => ({
		isDisabled: false
	}),
	methods:{
		...mapActions({
			saveUpdateApp : `updateApp/saveUpdateApp`,
		}),
		updateNow(){
			this.isDisabled = true
			this.saveUpdateApp().then(res => {
				let { status } = res.data
				if(status){
					this.toastSuccess({title: 'Update app successful'})
				}
				this.isDisabled = false
				this.$router.push({name: this.$routerName.DASHBOARD})
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
}
</script>

<style lang="scss">
</style>
