<template>
	<div class="choose-plan-wrapper">
        <div class="choose-plan">
            <charge 
				elementScroll=".choose-plan-wrapper"
				:stickyPosition="0"
				:is-choose-plan="true"
			/>
        </div>
    </div>
</template>

<script>
import Charge from './../components/charge'

export default {
	name : 'ChooosePlan',
	metaInfo: {
		title: 'Choose Plan',
		style: [
			{ cssText: '.app-layout__body { overflow: hidden; }', type: 'text/css' }
		]
	},
	components: {
		Charge
	},
	data(){
		return {
		}
	},
	methods: {
	}
}
</script>

<style lang="scss">
	.choose-plan{
		max-width: 1050px;
    	margin: auto;
		&-wrapper{
			position: fixed;
			background-color: $white-color;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: 1005;
			display: flex;
			overflow: auto;
			scrollbar-width: thin;          /* "auto" or "thin"  */
			scrollbar-color: #9fb3c8;   
			
			&::-webkit-scrollbar {
				height: 5px;
				width: 5px;
			}
			
			/* Track */
			&::-webkit-scrollbar-track {
				background-color: $white-color; 
			}
			
			/* Handle */
			&::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background-color: #c4c4c4
			}
			
			/* Handle on hover */
			&::-webkit-scrollbar-thumb:hover {
				background-color: #c4c4c4;
			}
		}
	}
</style>