import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/account-settings',
		name: routerName.ACCOUNT_SETTINGS,
		meta : {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Account Settings' }
			]
		},
		component: () => import( /* webpackChunkName: "account-settings" */ './views/index.vue')
	}
]