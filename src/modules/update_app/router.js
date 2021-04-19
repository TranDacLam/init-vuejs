import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/update',
		name: routerName.UPDATE_APP,
		meta: {
			middleware : [ autoLogin , auth ],
		},
		component: () => import( /* webpackChunkName: "update-app" */ './views/index.vue'),
	},
]