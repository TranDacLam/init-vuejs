<template>
    <div :class="['m-chart', $prefixClass.card + '-stroke']">
        <div class="m-chart__header m-b-15">
            <div class="m-chart__title">
                <div class="m-chart__name">{{ $t('dashboard.components.interaction') }}</div>
                <span class="fz-18">32%</span>
            </div>
            <div class="m-chart__desc">
                <p class="fz-14 m-b-0"> {{ $t('dashboard.components.after_visitor') }} </p>
                <strong class="fz-14 f-w-600">13,8% Lift</strong>
            </div>
        </div>
        <div class="m-chart__content">
            <chart-custom
                v-if="loaded" 
                :chart-data="chartData"
                :chart-labels="chartLabels"
                :chart-id="chartId"
                :background-color="backgroundColor"
                :border-color="borderColor"
            ></chart-custom>
        </div>
    </div>
</template>

<script>

import ChartCustom from './ChartCustom';

export default {
    name: 'DashboardChart',
    props: {
        chartId: {
            type: String,
            default: 'line-chart'
        },
        borderColor: String,
        backgroundColor: [String, Object]
    },
	data(){
		return {
            datacollection: null,
			chartData: null,
			chartLabels: null,
			loaded: false
		}
    },
    components: {
		ChartCustom
    },
    mounted () {
      	this.fillData()
    },
	methods:{
		fillData () {
			this.chartLabels = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
			this.chartData = [
							this.getRandomInt(), 
							this.getRandomInt(), 
							this.getRandomInt(), 
							this.getRandomInt(),
							this.getRandomInt(), 
							this.getRandomInt(), 
							this.getRandomInt()
						]
			this.loaded = true
		},
		getRandomInt () {
			return Math.floor(Math.random() * (50 - 5 + 1)) + 5
		}
	}
}
</script>

<style lang="scss">
    .m-chart{
        padding-bottom: 15px;
        &__header{
            padding: 15px 15px 0;
            > div{
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
        &__desc{
            strong{
                color: $info-color;
                text-align: right;
            }
        }
        &__name {
            width: 102px;
              font-size: 18px;
              font-weight: bold;
        }
    }
</style>