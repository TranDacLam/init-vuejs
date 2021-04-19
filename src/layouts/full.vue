<template>
	<div class="app-layout-full">
		<transition name="fade-in" mode="out-in">
			<router-view />
		</transition>
	</div>
</template>

<script>
export default {
	name: 'full',
    metaInfo: {
        titleTemplate: function(t) {
        	return `${t} - ${this.$app.name}`;
      	}
	},
	created(){
	}
}
</script>

<style lang="scss">
</style>
