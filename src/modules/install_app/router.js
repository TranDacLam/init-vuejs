import routerName from '@/constants/routers'
import InstallApp from './views/index'

export default [
	{
		path: '/install',
		name: routerName.INSTALL_APP,
		meta: { layout : 'full' },
		component: InstallApp
	}
]
