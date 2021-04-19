<template>
	<div class="dashboard-wrapper">
		<div class="dashboard">
			<div class="m-b-30">
				<h4 class="m-b-8">{{ $t('dashboard.title.what_new') }}</h4>
				<div :class="$prefixClass.card + '-stroke'" style="height: 200px;">
				</div>
			</div>
			<div class="m-b-30">
				<h4 class="m-b-8">{{ $t('dashboard.title.overview') }}</h4>
				<div class="row chart-list">
					<div class="chart-item col-4">
						<chart-item
							chart-id="line-chart-1"
						></chart-item>
					</div>
					<div class="chart-item col-4">
						<chart-item
							chart-id="line-chart-2"
							:background-color="{r: 255, g: 179, b: 3, a: 0.7}"
							border-color="rgb(255, 179, 3)"
						></chart-item>
					</div>
					<div class="chart-item col-4">
						<chart-item
							chart-id="line-chart-3"
							:background-color="{r: 140, g: 60, b: 221, a: 0.7}"
							border-color="rgb(140, 60, 221)"
						></chart-item>
					</div>
				</div>
			</div>
			<div class="m-b-30">
				<h4 class="m-b-8">{{ $t('dashboard.title.usage_balance') }}</h4>
				<div class="row progress-list">
					<div class="progress-item col-4">
						<progress-item></progress-item>
					</div>
					<div class="progress-item col-4">
						<progress-item></progress-item>
					</div>
					<div class="progress-item col-4">
						<progress-item></progress-item>
					</div>
				</div>
			</div>
			<!-- <div class="dashboard__info-app row">
				<div class="dashboard__new-feature col-4">
					<h5 class="m-b-8">{{ $t('dashboard.title.what_new') }}</h5>
					<div class="box p-all-25">
						<strong class="m-b-8 d-block">{{ $t('dashboard.function_release') }}</strong>
						<img src="../assets/new-func.png" />
						<p class="m-t-10 m-b-8">
							{{ $t('dashboard.description') }}
						</p>
						<a :class="$prefixClass.link">{{ $t('dashboard.read_more') }}</a>
						<vue-pagination-dot value="1" containerClass="m-t-24"></vue-pagination-dot>
					</div>
				</div>
				<div class="dashboard__tutorial col-8">
					<h5 class="m-b-8">{{ $t('dashboard.title.tutorials') }}</h5>
					<div class="box">
						<div class="">
							<template v-for="item in listTutorial">
								<iframe v-if="item == activeYoutube" width="360" height="200" :src="'https://www.youtube.com/embed/' + item"></iframe>
							</template>
						</div>
						<ul class="tutorial-list">
							<li :class="activeYoutube == listTutorial[0] ? 'active': ''" @click="onActiveYutorial(0)">{{ $t('dashboard.questions.how_to_import') }}</li>
							<li :class="activeYoutube == listTutorial[1] ? 'active': ''" @click="onActiveYutorial(1)">{{ $t('dashboard.questions.how_to_set') }}</li>
							<li :class="activeYoutube == listTutorial[2] ? 'active': ''" @click="onActiveYutorial(2)">{{ $t('dashboard.questions.how_to_use') }}</li>
							<li :class="activeYoutube == listTutorial[3] ? 'active': ''" @click="onActiveYutorial(3)">{{ $t('dashboard.questions.how_to_add') }}</li>
							<li :class="activeYoutube == listTutorial[4] ? 'active': ''" @click="onActiveYutorial(4)">{{ $t('dashboard.questions.how_to_customize') }}</li>
						</ul>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
import ChartItem from './../components/Chart'
import ProgressItem from './../components/Progress'

export default {
	name : 'Dashboard',
	metaInfo: {
		title: 'Dashboard',
	},
	components: {
		ChartItem,
		ProgressItem
	},
	data(){
		return {
			datacollection: null,
			chartData: null,
			chartLabels: null,
			loaded: false,
			activeYoutube: 'Ghulzt61dXc',
			listTutorial: [
				'Ghulzt61dXc',
				'u37JEfXpugU',
				'ND3dvjeni9k',
				'0egIpLwTGXk',
				'YCurFRRiiXk'
			]
		}
	},
	mounted () {
    },
	methods:{
		onActiveYutorial: function(index){
			this.activeYoutube = this.listTutorial[index]
		}
	}
}
</script>

<style lang="scss">
	.dashboard {
		#line-chart{
			&-1, &-2, &-3{
				width: 100% !important;
			}
		}
		&__info-app{
			.#{$pagination}-dot{
				li{
					width: 8px;
					height: 8px;
				}
			}
		}
		&__new-feature{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.box{
				flex: 1;
			}
		}
		&__tutorial{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.box{
				padding: 32px 24px;
				flex: 1;
				display: flex;
			}
		}
		.tutorial{
			&-list{
				margin-left: 24px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				li{
					cursor: pointer;
					&:not(:last-child){
						margin-bottom: 12px;
					}
					&.active, &:hover{
						color: $info-color;
					}
				}
			}
		}
	}
</style>