import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/collections',
		component: () => import( /* webpackChunkName: "collections" */ './views/layout.vue'),
		children : [
			{
				path: 'list',
				name: routerName.LIST_COLLECTIONS,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Collections' },
						{ name: 'List' }
					]
				},
				component: () => import( /* webpackChunkName: "collection-list" */ './views/list.vue')
			},
			{
				path: 'add',
				name: routerName.ADD_COLLECTION,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Collections' },
						{ name: 'Add' }
					]
				},
				component: () => import( /* webpackChunkName: "collection-add" */ './views/create.vue')
			},
			{
				path: 'update/:id',
				name: routerName.UPDATE_COLLECTION,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Collections' },
						{ name: 'Update' }
					]
				},
				component: () => import( /* webpackChunkName: "collection-update" */ './views/update.vue')
			}
		]
		
	}
]