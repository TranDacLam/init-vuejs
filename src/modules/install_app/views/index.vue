<template>
	<t-install-app ref="form" @submit="onSubmit" />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
	name : 'InstallApp',
	metaInfo: {
		title: 'Install',
	},
	created(){
		this.logout();
		this.destroyIntercom();
	},
	methods:{
		...mapActions({
			login : 'auth/login',
			destroyIntercom : 'auth/destroyIntercom'
		}),
		...mapMutations({
			logout : 'auth/logout'
		}),
		onSubmit(){
			const formValidated = this.$refs.form.formValidated
			let form = this.$refs.form
			if (form.formValidated) {
				form.isLoading = true
				var shop = form.form.shop.replace(/.myshopify.com/gi, "");
				this.login({shop}).then((res)=>{
					let { status , data } = res.data
					if( status && data){
						window.location.href = data.redirect_url
					}
				})
				.catch(e => {
					form.addError(e)
				})
				.finally(()=>{
					form.isLoading = false
				})
			}
		}
	}
}
</script>

<style lang="scss">
.app-auth-layout {
	// background-image: url();
}
</style>
