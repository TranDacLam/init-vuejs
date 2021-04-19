export default [
	{
		path: '/maintenance',
		name: 'maintenance',
		meta: {
			layout: 'full'
		},
		component: () => import( /* webpackChunkName: "maintenance" */ './views/index.vue')
	}
]
