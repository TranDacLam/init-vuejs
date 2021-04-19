<template>
	<div class="error-500">
		<t-error-500 :sentry-id="sentryId" @onBtn="onBtn"/>
	</div>
</template>

<script>

export default {
	name: "Error500",
	data: () => ({
		sentryId: ''
	}),
	created(){
        this.sentryId = this.$route.query && this.$route.query.sentryId || ''
	},
	methods: {
		...mapActions({
            showIntercom: 'auth/showIntercom'
        }),
		onBtn(){
			this.showIntercom(true)
		}
	}
}
</script>
<style lang="scss">
	.error-404{
		.error{
			&__description{
				p{
					color: $text-color-secondary;
				}
			}
		}
	}
</style>
