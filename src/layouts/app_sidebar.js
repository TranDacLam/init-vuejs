import routerName from '@/constants/routers'
import i18n from '@/i18n'

var sidebarGroups = [{
    title: i18n.t('app.menu.dashboard'),
    route: routerName.DASHBOARD,
    key: routerName.DASHBOARD,
    type: 'router-link',
    icon: '<i class="far fa-chart-bar"></i>'
  },
  {
    title: 'Function',
    route: '',
    key: 'Function',
    type: 'sub-menu',
    icon: '<i class="far fa-bars"></i>',
    sub: [{
        title: 'Table',
        route: 'FunctionTable',
        key: 'FunctionTable',
        type: 'router-link',
        icon: ''
      },
      {
        title: 'Settings',
        route: 'FunctionSettings',
        key: 'FunctionSettings',
        type: 'router-link',
        icon: ''
      }
    ]
  },
  {
    title: i18n.t('app.menu.settings'),
    route: '',
    key: 'SETTINGS',
    type: 'sub-menu',
    icon: '<i class="far fa-cog"></i>',
    sub: [{
        title: i18n.t('app.menu.general_settings'),
        route: routerName.GENERAL_SETTINGS,
        key: routerName.GENERAL_SETTINGS,
        type: 'router-link',
        icon: ''
      },
      {
        title: i18n.t('app.menu.theme_settings'),
        route: routerName.THEME_SETTINGS,
        key: routerName.THEME_SETTINGS,
        type: 'router-link',
        icon: ''
      },
    ]
  },
  {
    title: i18n.t('app.menu.pricing'),
    route: routerName.PRICING,
    key: routerName.PRICING,
    type: 'router-link',
    icon: '<i class="far fa-tag"></i>'
  },
  {
    title: '',
    route: '',
    key: 'divider1',
    type: 'divider',
  },
  {
    title: i18n.t('app.menu.support'),
    route: '',
    key: 'Support',
    type: 'sub-menu',
    icon: '<i class="far fa-life-ring"></i>',
    sub: [{
        title: i18n.t('app.menu.get_help'),
        route: '',
        key: 'GetHelp',
        onClick: () => {
          // this.toggleShowIntercom()
        },
        type: 'button',
      },
      {
        title: i18n.t('app.menu.tutorials'),
        route: '',
        key: 'Tutorials',
        onClick: () => {
          // this.$router.push({
          //   name: routerName.DASHBOARD
          // })
        },
        type: 'button',
      },
    ]
  },
  {
    title: 'Template List',
    route: '',
    key: 'FunctionList',
    type: 'sub-menu',
    icon: '<i class="far fa-bars"></i>',
    sub: [{
        title: 'Products',
        route: routerName.LIST_PRODUCTS,
        key: routerName.LIST_PRODUCTS,
        type: 'router-link',
        icon: ''
      },
      {
        title: 'Customers',
        route: routerName.LIST_CUSTOMERS,
        key: routerName.LIST_CUSTOMERS,
        type: 'router-link',
        icon: ''
      },
      {
        title: 'Collections',
        route: routerName.LIST_COLLECTIONS,
        key: routerName.LIST_COLLECTIONS,
        type: 'router-link',
        icon: ''
      }
    ]
  }
]
export default sidebarGroups
