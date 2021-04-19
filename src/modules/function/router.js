import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/function',
		component: () => import( /* webpackChunkName: "function" */ './views/layout.vue'),
		children : [
			{
				path: 'table',
				name: routerName.FUNCTION_TABLE,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Function' },
						{ name: 'Table' }
					]
				},
				component: () => import( /* webpackChunkName: "function-table" */ './views/table.vue')
			},
			{
				path: 'create',
				name: routerName.FUNCTION_CREATE,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Function' },
						{ name: 'Create' }
					]
				},
				component: () => import( /* webpackChunkName: "function-create" */ './views/create.vue')
			},
			{
				path: 'settings',
				name: routerName.FUNCTION_SETTINGS,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Function' },
						{ name: 'Settings' }
					]
				},
				component: () => import( /* webpackChunkName: "function-settings" */ './views/settings.vue')
			},
		]
		
	}
]