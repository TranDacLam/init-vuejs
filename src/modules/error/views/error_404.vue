<template>
	<div class="error-404">
		<t-error-404 @onBtn="onBtn" />
	</div>
</template>

<script>

export default {
	name: "Error404",
	methods: {
		onBtn(){
			this.$router.push({path: '/'})
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
