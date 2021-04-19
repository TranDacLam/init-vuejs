import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/pricing',
		name: routerName.PRICING,
		meta: {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Pricing' }
			]
		},
		component: () => import( /* webpackChunkName: "pricing" */ './views/pricing.vue')
	},
	{
		path: '/choose-plan',
		name: routerName.CHOOSE_PLAN,
		meta: {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Choose Plan' }
			]
		},
		component: () => import( /* webpackChunkName: "choose-plan" */ './views/choose-plan.vue')
	}
]