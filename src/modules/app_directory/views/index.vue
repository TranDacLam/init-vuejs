<template>
	<div id="app-directory" class="app-directory-page">
		<div class="app-directory-loading" v-if="is_loadding">
			<a-spin size="large" />
		</div>
	</div>
</template>

<script>

import { mapGetters } from 'vuex' 

export default {
	name : 'AppList',
	metaInfo: {
		title: 'App List',
		link: [
			{ rel: 'stylesheet', href: `${process.env.VUE_APP_LIST_URL}/css/styles.min.css` }
		],
		script: [
			{ type: "text/javascript", src: `${process.env.VUE_APP_LIST_URL}/js/front.min.js`, defer: true }
		],
		style: [
			{ cssText: '.app-directory-icon { display: none !important; }', type: 'text/css' }
		]
	},
	components: {
	},
	data(){
		return {
			is_loadding: true,
			timer: null
		}
	},
	computed:{
		...mapGetters({
			'store' : 'auth/getStore'
		})
	},
	created(){
		let { store } = this
		window.appKey = process.env.VUE_APP_KEY_APP_LIST || 'alireviews';
		window.shopId = store.id; //store.id
		window.shopDomain = store.shopify_domain; //store.shopify_domain
		window.shopName = store.name; //store.name
		window.shopOwner = store.owner; //store.owner
	},
	mounted () {
		let count = false;
		this.timer = setInterval(() => {
			if(this.$el.querySelector('.appl-wrapper')){
				clearInterval(this.timer)
				this.is_loadding = false
			}
		}, 1000)
    },
	methods:{
	},
	destroyed(){
		clearInterval(this.timer)
	}
}
</script>

<style lang="scss">
	.app-directory-loading{
		height: 70vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>