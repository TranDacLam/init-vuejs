import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/',
		name: routerName.DASHBOARD,
		meta : {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Dashboard' }
			]
		},
		component: () => import( /* webpackChunkName: "dashboard" */ './views/index.vue')
	}
]