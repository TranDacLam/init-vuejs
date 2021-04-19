import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/settings/themes-setting',
		name: routerName.THEME_SETTINGS,
		meta: {
			middleware : [ autoLogin , auth ],
			breadcrumb: [
				{ name: 'Settings' },
				{ name: 'Theme Settings' }
			]
		},
		component: () => import( /* webpackChunkName: "themes-setting" */ './views/index.vue')
	}
]