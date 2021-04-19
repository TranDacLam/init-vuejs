import checkPageNotFound from './middlewares/checkPageNotFound'
import routerName from '@/constants/routers'

export default [
	{
		path: '/error',
		name: routerName.ERROR_500,
		meta: {
			layout: 'full'
		},
		component: () => import( /* webpackChunkName: "error-500" */ './views/error_500.vue')
	},
	{
		path: '/not-found',
		name: routerName.ERROR_404,
		meta: {
			layout: 'full'
		},
		component: () => import( /* webpackChunkName: "error-404" */ './views/error_404.vue')
	},
	{
		path: '*',
		name: routerName.PAGE_NOT_FOUND,
		meta: {
			// layout: 'full'
			middleware : [ checkPageNotFound ]
		},
		// component: () => import( /* webpackChunkName: "error-all" */ '@/modules/dashboard/views/index.vue')
	}
]
