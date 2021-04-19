import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/settings/general-setting',
		name: routerName.GENERAL_SETTINGS,
		meta: {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Settings' },
				{ name: 'General Settings' }
			]
		},
		component: () => import( /* webpackChunkName: "general-setting" */ './views/index.vue')
	}
]