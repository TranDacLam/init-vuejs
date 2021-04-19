<template>
  <div>
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.defaults.global.defaultFontColor = '#92929C';
Chart.defaults.global.defaultFontFamily = "'Poppins', sans-serif";
Chart.defaults.global.defaultFontSize = 11;

export default {
    name: 'ChartCustom',
    props: {
		type: {
			type: String,
			default: 'line'
		},
		chartData: {
			type: Array,
			default: null
		},
		chartLabels: {
			type: Array,
			default: null
		},
		chartId:{
			type: String,
			default: 'line-chart'
		},
		options: {
			type: Object,
			default: null
		},
		borderColor: {
			type: String,
			default: 'rgb(91, 212, 182)'
		},
		borderWidth: {
			type: Number,
			default: 1
		},
		backgroundColor: {
			type: [Object, String],
			default: () => {
				return {
					r: 91,
					g: 212,
					b: 182,
					a: 0.7
				}
			}
		},
		pointRadius: {
			type: Array,
			default: () => {
				return [2, 2, 2, 5, 2, 2, 2]
			}
		}
	},
	data(){
		return {
			configOptions: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					display: false
				},
				title: {
					display: false
				},
				layout: {
					padding: {
						left: 15,
						right: 15
					}
				},
				hover: {
					mode: 'index'
				},
				scales: {
					xAxes: [{
						gridLines: {
							display: true,
							zeroLineWidth: 0,
							color: ['rgba(0, 0, 0, 0)', '', '', this.borderColor, '', '', ''],
							drawTicks: false
						},
						ticks: {
							padding: 10
						}
					}],
					yAxes: [{
						gridLines: {
							display: true, 
							color: ['', '', '', '', '', '', ''],
							drawTicks: false
						},
						ticks: {
							display: false,
							stepSize: 10,
							min: 0
						}
					}]
				},
				tooltips: {
					enabled: true,
					backgroundColor: '#fff',
					xPadding: 10,
					yPadding: 10,
					caretPadding: 8,
					titleFontColor: '#000',
					bodyFontColor: '#000',
					bodyFontStyle: '500',
					footerFontStyle: '500',
					footerFontColor: 'rgba(0,0,0,.5)',
					callbacks: {
						label: ((tooltipItems, data) => {
							console.log(tooltipItems, data)
							return ''
						}),
						labelColor: function(tooltipItem, chart) {
							return {
								borderColor: 'transparent',
								backgroundColor: 'transparent'
							};
						},
						// labelTextColor: function(tooltipItem, chart) {
						// 	return '#543453';
						// },
						title: function(tooltipItem, chart) {
							return 'Sunday'
						},
						beforeBody: function(tooltipItem, chart) {
							return '14/02/2020'
						},
						beforeFooter: function(tooltipItem, chart) {
							return '500'
						},
					}
				}
			},
			datacollection: null,
			myChart: null
		}
	},
	watch: {
		chartData(){
			this.myChart.data.datasets[0].data = this.chartData
			this.myChart.update();
		}
	},
  	mounted() {
		this.renderChartCustom()
	},
	methods: {
		renderChartCustom(){
			let ctx = document.getElementById(this.chartId);
			if (!ctx) return
			ctx = ctx.getContext('2d')
			let bg = this.backgroundColor
			let color = {
				a: typeof(bg) == "string" ? bg : `rgba(${bg.r}, ${bg.g}, ${bg.b}, ${bg.a ? bg.a : 1})`,
				b: typeof(bg) == "string" ? 'rgba(255, 255, 255, 0.5)' : `rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.05)`,
				c: typeof(bg) == "string" ? 'rgba(255, 255, 255, 0.5)' : `rgba(${bg.r}, ${bg.g}, ${bg.b}, 0.02)`
			}
			let gradient = ctx.createLinearGradient(0, 0, 0, 200)
			gradient.addColorStop(0, color.a)
			gradient.addColorStop(0.3, color.b)
			gradient.addColorStop(1, color.c)
			this.datacollection = {
				labels: this.chartLabels,
				datasets: [
					{
						borderColor: this.borderColor,
						borderWidth: this.borderWidth,
						backgroundColor: gradient,
						pointRadius: this.pointRadius,
						data: this.chartData
					}
				]
			}
			this.myChart = new Chart(ctx, {
				type: this.type,
				data: this.datacollection,
				options: {...this.configOptions, ...this.options},
			});
		}
	}
}
</script>