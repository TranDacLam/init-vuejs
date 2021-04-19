import auth from '@/middlewares/auth'
import autoLogin  from '@/middlewares/autoLogin'
import routerName from '@/constants/routers'

export default [
	{
		path: '/products',
		component: () => import( /* webpackChunkName: "products" */ './views/layout.vue'),
		children : [
			{
				path: '',
				name: routerName.LIST_PRODUCTS,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Products' },
						{ name: 'List' }
					]
				},
				component: () => import( /* webpackChunkName: "product-list" */ './views/list.vue'),
			},
			{
				path: 'create',
				name: routerName.ADD_PRODUCT,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Products' },
						{ name: 'Add' }
					]
				},
				component: () => import( /* webpackChunkName: "product-add" */ './views/create.vue'),
			},
			{
				path: 'update/:product_id',
				name: routerName.UPDATE_PRODUCT,
				meta: {
					middleware : [ autoLogin , auth ],
					breadcrumb: [
						{ name: 'Products' },
						{ name: 'Update' }
					]
				},
				component: () => import( /* webpackChunkName: "product-update" */ './views/update.vue'),
			}
		]
	}
]
