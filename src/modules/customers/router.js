import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/customers',
		component: () => import( /* webpackChunkName: "customers" */ './views/layout.vue'),
		children : [
			{
				path: 'list',
				name: routerName.LIST_CUSTOMERS,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Customers' },
						{ name: 'List' }
					]
				},
				component: () => import( /* webpackChunkName: "customer-list" */ './views/list.vue')
			},
			{
				path: 'add',
				name: routerName.ADD_CUSTOMER,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Customers' },
						{ name: 'Add' }
					]
				},
				component: () => import( /* webpackChunkName: "customer-add" */ './views/create.vue')
			},
			{
				path: 'update/:id',
				name: routerName.UPDATE_CUSTOMER,
				meta: {
					middleware: [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Customers' },
						{ name: 'Update' }
					]
				},
				component: () => import( /* webpackChunkName: "customer-update" */ './views/update.vue')
			}
		]
		
	}
]