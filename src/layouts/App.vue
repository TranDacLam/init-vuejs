<template>
	<a-config-provider :prefixCls="$prefixClass.atom">
		<div id="app">
			<div class="all-center mounting-layout" v-if="!appMounted">
				<img src="/fireappslogo.svg" width="150" />
			</div>
			<template v-if="appMounted">
				<transition name="fade" mode="out-in">
					<div v-if="isLoading" key="is-loading" class="app-loading">
						<a-spin size="large" />
					</div>
					<div v-else key="is-loading-success">
						<fullLayout v-if="$route.meta.layout === 'full'" />
						<defaultComp v-else />
					</div>
				</transition>
			</template>
		</div>
	</a-config-provider>
</template>

<script>
import { mapGetters } from 'vuex';
import defaultComp from './default'
import fullLayout from './full'
export default {
	name: 'App',
	components: {
		defaultComp,
		fullLayout
	},
	data () {
		return {
			appMounted: false
		}
	},
	computed: {
		...mapGetters({
			isLoading : 'getLoading'
		})
	},
	mounted () {
		setTimeout(() => {
      this.$nextTick(() => {
				this.appMounted = true
      })
    }, 500)
	}
}
</script>
<style lang="scss" >
.mounting-layout {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	img {
	  filter: grayscale(100%);
		opacity: 0.25;
	}
}
	.app-loading ,.app-error{
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #ffff;
	}
</style>
