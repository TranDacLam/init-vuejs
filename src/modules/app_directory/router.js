import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/app-directory',
		name: routerName.APP_DIRECTORY,
		meta: {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'App List' }
			]
		},
		component: () => import( /* webpackChunkName: "app-directory" */ './views/index.vue')
	}
]