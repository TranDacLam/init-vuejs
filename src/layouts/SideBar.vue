<template>
	<div :class="[$prefixClass.sidebar, { 'breakpointed': breakpointed }]" v-clickaway="clickAway">
		<template v-if="!breakpointed">
			<router-link to="/" :class="$prefixClass.logo">
				<template v-if="hasSlotLogo">
					<div :class="$prefixClass.sidebar + '-logo'">
						<slot name="logo" />
					</div>
				</template>
				<template v-else>
					<div :class="$prefixClass.logo + '-image'">
						<img src="" alt="">
					</div>
					<div :class="$prefixClass.logo + '-text'">
						{{ $app.name }}
					</div>
				</template>
			</router-link>
			<div :class="$prefixClass.navigation">
				<nav :class="$prefixClass.navigation + '-menu'">
					<a-menu
						:prefixCls="$prefixClass.menu"
						:defaultOpenKeys="defaultOpenKeys"
						:openKeys.sync="openKeys"
						:defaultSelectedKeys="['Dashboard']"
						:selectedKeys="selectedKeys"
						mode="inline"
					>
						<template v-for="group in menuGroups">
							<template v-if="group.type == 'divider'">
								<a-menu-item :key="group.key" class="menu-divider" />
							</template>
							<template v-else-if="group.type == 'router-link'">
								<a-menu-item v-if="!group.sub" :key="group.key">
									<router-link
										:class="$prefixClass.menu + '-link'"
										:id="group.id ? itegroupm.id : ''"
										:to="{ name : group.route }"
									>
										<div class="anticon" :class="$prefixClass.menu + '-icon'" v-html="group.route === $route.name ? group.icon.replace('far', 'fas') : group.icon"></div>
										<span :class="$prefixClass.menu + '-text'">{{group.title}}</span>
									</router-link>
								</a-menu-item>
							</template>
							<template v-else-if="group.type == 'sub-menu'">
								<a-sub-menu :key="group.key">
									<span slot="title" class="sub-menu-title">
										<div :ref="group.key + '_sub_title_anticon'" class="anticon" :class="$prefixClass.menu + '-icon'" v-html="openKeys.includes(group.key) ? group.icon.replace('far', 'fas') : group.icon"></div>
										<span :class="$prefixClass.menu + '-text'">{{group.title}}</span>
									</span>
									<template v-for="sub_item in group.sub">
										<a-menu-item :key="sub_item.key" v-if="sub_item.type == 'router-link'">
											<!-- <span :class="$prefixClass.menu + '-text'" v-if="!sub_item.route">{{sub_item.title}}</span> -->
											<router-link
												:class="$prefixClass.menu + '-link'"
												:id="sub_item.id ? sub_item.id : ''"
												:to="{ name : sub_item.route}"
											>
												<span :class="$prefixClass.menu + '-text'">{{sub_item.title}}</span>
											</router-link>
										</a-menu-item>
										<a-menu-item :key="sub_item.key" v-else-if="sub_item.type == 'link'">
											<a :class="$prefixClass.menu + '-link'" :href="sub_item.link" :id="sub_item.id ? sub_item.id : ''">
												<span :class="$prefixClass.menu + '-text'">{{sub_item.title}}</span>
											</a>
										</a-menu-item>
										<a-menu-item :key="sub_item.key" v-else-if="sub_item.type == 'button'"  @click="sub_item.onClick()">
											<span :class="$prefixClass.menu + '-text'">{{sub_item.title}}</span>
										</a-menu-item>
									</template>
								</a-sub-menu>
							</template>
							<template v-else-if="group.type == 'link'">
								<a-menu-item :key="group.key">
									<a :class="$prefixClass.menu + '-link'" :href="group.link" :id="group.id ? group.id : ''">
										<div class="anticon" :class="$prefixClass.menu + '-icon'" v-html="group.icon"></div>
										<span :class="$prefixClass.menu + '-text'">{{group.title}}</span>
									</a>
								</a-menu-item>
							</template>
							<template v-else-if="group.type == 'button'">
								<a-menu-item :key="group.key" @click="group.onClick()">
									<div class="anticon" :class="$prefixClass.menu + '-icon'" v-html="group.icon"></div>
									<span :class="$prefixClass.menu + '-text'">{{group.title}}</span>
								</a-menu-item>
							</template>
						</template>
					</a-menu>
				</nav>
			</div>
			<div :class="$prefixClass.sidebar + '-footer'">
				<slot name="footer" />
			</div>
		</template>

		<!-- For breakpoint_resolution_width < 1440px -->

		<template v-else>
			<div :class="$prefixClass.navigation + '-menu-breakpoint-wrapper'">
				<template v-if="hasSlotLogoSm">
					<div :class="$prefixClass.sidebar + '-logo-image'">
						<slot name="logosm" />
					</div>
				</template>
				<template v-else>
					<div :class="$prefixClass.logo + '-image'">
						<img src="" alt="">
					</div>
				</template>
				<div :class="$prefixClass.navigation">
					<nav :class="[$prefixClass.navigation + '-menu', $prefixClass.navigation + '-menu-breakpoint']">
						<ul :class="$prefixClass.navigation + '-menu-breakpoint-list'">
							<li :class="$prefixClass.navigation + '-menu-breakpoint-list-item'" v-for="(group, i) in menuGroups" :key="i">
								<span v-if="group.type === 'divider'" class="menu-divider m-menu-item"></span>
								<template v-if="group.type == 'router-link'">
									<a-tooltip overlayClassName="breakpoint-menu-tooltip" :prefixCls="$prefixClass.tooltip" placement="right" :title="group.title">
										<a-button :prefixCls="$prefixClass.button" class="route-button">
											<router-link :to="{ name : group.route }">
												<div class="anticon" :class="$prefixClass.menu + '-icon'" v-html="group.icon"></div>
											</router-link>
										</a-button>
									</a-tooltip>
								</template>
								<template v-if="group.type == 'sub-menu'">
									<a-tooltip overlayClassName="breakpoint-menu-tooltip" :prefixCls="$prefixClass.tooltip" placement="right" :title="group.title">
										<a-button :prefixCls="$prefixClass.button" class="route-button" :class="{ 'active': activeBreakpointSubMenuKey === group.key }">
											<a @click="showBreakpointSubMenu(group)">
												<div class="anticon" :class="$prefixClass.menu + '-icon'" v-html="activeBreakpointSubMenuKey === group.key ? group.icon.replace('far', 'fas') : group.icon"></div>
											</a>
										</a-button>
									</a-tooltip>
								</template>
							</li>
						</ul>
					</nav>
				</div>
				<div @click="activeBreakpointSubMenu = !activeBreakpointSubMenu" :class="$prefixClass.sidebar + '-footer-sm'">
					<slot name="footer-sm" />
				</div>
			</div>
			<div :class="[$prefixClass.navigation + '-menu-breakpoint-subs', { 'active': activeBreakpointSubMenu }]">
				<template v-if="activeBreakpointSubMenu">
					<ul class="sub-menu-list">
						<li class="sub-menu-item" v-for="(sub, i) in activeBreakpointSubMenu.sub" :key="i">
							<template v-if="sub.type === 'router-link'">
								<router-link class="route-link" :to="{ name: sub.route, params: {} }">{{ sub.title }}</router-link>
							</template>
							<a class="route-link" v-else-if="sub.type == 'button'"  @click="sub.onClick()">{{sub.title}}</a>
							<a v-else-if="sub.type == 'link'">
								<a class="route-link" :class="$prefixClass.menu + '-link'" :href="sub.link" :id="sub.id ? sub.id : ''">{{sub.title}}</a>
							</a>
						</li>
					</ul>
					<div :class="$prefixClass.sidebar + '-footer ' + $prefixClass.sidebar + '-footer-panel'">
						<slot name="footer" />
					</div>
					<a class="collapse-action-button" @click="activeBreakpointSubMenu = null">
						<i class="fal fa-times"></i>
					</a>
				</template>
			</div>
		</template>
	</div>
</template>
<script>
export default {
	name : 'm-sidebar',
	props : {
		noBreakpointed: Boolean,
		groups: {
			type: Array,
			default: () => { return [] }
		}
	},
	data(){
		return {
			breakpointWidth: 1440,
			// keyMenuNotActiveSelect: ['Tutorial', 'GetHelp'],
			selectedKeys: [],
			defaultOpenKeys: [],
			openKeys: [],
			windowWidth: window.innerWidth,
			activeBreakpointSubMenu: null
		}
	},
	created () {
		let _this = this
		const currentRouterName = _this.$router.currentRoute.name;
		_this.selectedKeys = [`${currentRouterName}`]
		_this.onOpenKeys(this.$route.name)
	},
	mounted() {
    window.addEventListener('resize', this.onResize)
  },
	beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
	computed: {
		menuGroups () {
			// Append path into Array
			this.groups.forEach(x => {
				if (x.type === 'router-link') {
					var route = this.$router.resolve({ name: x.route })
					x.path = route.href
				} else if (x.type === 'sub-menu') {
					x.sub.forEach(c => {
						if (c.type === 'router-link') {
							var routeC = this.$router.resolve({ name: c.route })
							c.path = routeC.href
						}
					})
				} else {
					// Silence is golden
				}
			})
			return this.groups
		},
		breakpointed () {
			if (this.noBreakpointed) { return false }
			return this.windowWidth < this.breakpointWidth
		},
		hasSlotLogo () { return this.$slots.logo },
		hasSlotLogoSm () { return this.$slots.logosm },
		activeBreakpointSubMenuKey () {
			if (this.activeBreakpointSubMenu) { return this.activeBreakpointSubMenu.key }
			return null
		}
	},
	watch:{
    	$route (to, from){
				let { name } = to
				// if(this.keyMenuNotActiveSelect.includes(name)){
				// 	return
				// }
				this.onOpenKeys(to.name)
				// this.selectedKeys.push(name)
				this.activeBreakpointSubMenu = null
			}
	},
	methods:{
		onResize() {
	    this.windowWidth = window.innerWidth
	  },
		showBreakpointSubMenu (group) {
			if (!this.activeBreakpointSubMenu) {
				this.activeBreakpointSubMenu = group
			} else {
				if (this.activeBreakpointSubMenu === group) {
					this.activeBreakpointSubMenu = null
				} else {
					this.activeBreakpointSubMenu = group
				}
			}
		},
		selectMenu({ item, key, selectedKeys }){
			if(this.keyMenuNotActiveSelect.includes(key)){
				return
			}
			this.selectedKeys = selectedKeys;
		},
		clickAway () {
			this.activeBreakpointSubMenu = null
		},
		onOpenKeys(routeName){
			let vm = this
			var route = this.$router.resolve({ name: routeName })
			var currentRoutePath = route.href
			vm.menuGroups.some(item => {
				if (item.route === routeName) {
					this.selectedKeys = [routeName]
					return
				}
				let obj = item.sub &&  item.sub.find(child => child.key == routeName || currentRoutePath.includes(child.path))
				if(obj) {
					vm.defaultOpenKeys = [`${item.key}`]
					this.openKeys.push(item.key)
					this.selectedKeys = []
					this.selectedKeys.push(obj.route)
					return true
				}
				return false
			})
		}
	}
}
</script>
<style lang="scss">
.#{$sidebar} {
	.#{$navigation} {
	  flex: 1;
	  overflow: overlay;
	  margin-top: 32px;
	  margin-bottom: 10px;
	  @include scroll-bar;
	  a {
	    text-decoration: none !important;
	  }
	}
}
.#{$menu}{
    &-submenu{
        .m-menu-open, .m-menu-selected {
          .m-menu-submenu-title {
            .anticon.m-menu-icon, .m-menu-text {
              color: $primary-color;
              font-weight: $font-weight-semibold;
            }
          }
        }
    }
}
$sidebar-bg-color: #f0f4f8;
.#{$molecule}-sidebar {
    height: 100vh;
    position: relative;
    @include noselect;
    background: $sidebar-bg-color;
    font-size: $font-size;
    &-footer {
      position: sticky;
      bottom: 0;
    }
    .#{$menu}-item.menu-divider {
      background: $line-color;
      height: 1px;
    }
    &:not(.breakpointed) {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      width: 230px;
      .a-logo, .m-navigation {
        padding: 0 16px;
      }
    }
    &-logo {
      padding: 6px;
      max-height: 100%;
      max-width: 100%;
    }
    .a-logo-image {
      text-align: center;
      padding: 12px;
    }
    .#{$menu} {
      background: none;
      border-right-color: transparent;
      overflow-x: hidden;
      .#{$menu}-submenu > .#{$menu} {
        background: transparent;
      }
      .#{$menu}-submenu-selected {
        .sub-menu-title {
          font-weight: $font-weight-semibold;
        }
      }
      // .#{$menu}-submenu-open {
      //   .#{$menu}-submenu-title {
      //     .anticon.m-menu-icon, .m-menu-text {
      //       color: $primary-color;
      //       font-weight: $font-weight-semibold;
      //     }
      //   }
      // }
      .#{$menu}-item > a, .sub-menu-title {
        display: flex;
        align-items: center;
      }
      .#{$menu}-item.#{$menu}-item-active {
        > a {
          color: unset;
        }
      }
      .#{$menu}-item.#{$menu}-item-selected {
        font-weight: $font-weight-semibold;
        border-radius: 8px;
        &::after {
          content: none;
        }
      }
    }
}
.#{$molecule}-sidebar.breakpointed {
  display: flex;
  background: none;
  .#{$molecule}-navigation-menu-breakpoint-wrapper {
    background: $sidebar-bg-color;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
	.#{$molecule}-sidebar-footer-sm {
		cursor: pointer;
	}
  .#{$molecule}-sidebar-logo-image {
    text-align: center;
    padding: 12px;
    img {
      width: 40px;
    }
  }
}
.#{$navigation}-menu-breakpoint {
  display: flex;
  flex-direction: row;
  &-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    &-item {
      margin-bottom: 8px;
      .route-button {
        @include no-focus-style;
        color: $text-color-secondary;
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;
        height: unset;
        &:active, &:focus {
          background: none;
        }
        &.active {
          color: $primary-color;
        }
        a {
          width: 56px;
          height: 40px;
          padding: 0;
          padding-left: 0!important;
          padding-right: 0!important;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          &.router-link-exact-active {
            background-color: $primary-light;
            .#{$menu}-icon {
              color: $primary-color;
            }
          }
        }
      }
    }
  }
  &-subs {
    background: $primary-light;
    transition: width 300ms cubic-bezier(0.2, 0, 0, 1) 0s;
    width: 0;
    padding-top: calc(32px + 65px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
    &.active {
      width: 230px;
      box-shadow: inset 2px 0 9px -7px rgba(0,0,0,0.4);
    }
    ul.sub-menu-list {
			@include scroll-bar;
      padding-left: 16px;
      padding-right: 16px;
			flex: 1;
			overflow-y: overlay;
      li.sub-menu-item {
        a.route-link {
          display: block;
          margin-bottom: 8px;
          height: 40px;
          padding: 0 16px;
          line-height: 40px;
          border-radius: $border-radius;
          color: $text-color;
          font-size: $font-size;
          font-weight: $font-weight-semibold;
          @include no-focus-style;
          &.router-link-exact-active {
            background: $text-color;
            color: #FFF;
          }
        }
      }
    }
  }
}
.collapse-action-button {
  color: $text-color-secondary;
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
  z-index: 11;
}
.breakpoint-menu-tooltip {
  .m-tooltip-inner {
    font-size: $font-size;
    padding: 3px 16px;
  }
}
.#{$logo} {
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Poppins;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background: $background-color;

    &:after {
        content: "";
        background-color: #E8E8E8;
        width: 100%;
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
    }

    &-image {
        img {
            max-width: 100%;
            max-height: 100%;
            width: 40px;
            min-width: 40px;
            height: 40px;
            border-radius: 50%;
            min-height: 40px;
            background-color: $primary-color;
        }
    }

    &-text {
      @include text-one-line;
      color: $primary-color;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
    }
}

.app-directory-icon {
    display: block;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 10px;
    height: 10px;
}

.app-directory-icon span {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    position: relative;
}

.app-directory-icon span:before {
    content: "";
    display: block;
    min-width: 14px;
    min-height: 14px;
    border-radius: 50%;
    border: 1px solid #00c35c;
    animation: wave-pulse-new 2.4s infinite;
    opacity: 0;
}

.app-directory-icon span:after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background-color: #00c35c;
    animation: ring-pulse 2.4s infinite;
    opacity: 0;
}

@keyframes wave-pulse-new {
    0% {
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 1;
    }

    to {
        opacity: 0.9;
    }

    40% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1);
    }

    80% {
        opacity: 0.9;
    }

    to {
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 1;
    }
}

@keyframes ring-pulse {
    0% {
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 1;
    }

    to {
        opacity: 0.9;
    }

    40% {
        opacity: 1;
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    80% {
        opacity: 0.9;
    }

    to {
        -webkit-transform: scale(2);
        transform: scale(2);
        opacity: 1;
    }
}
$app-sidebar-collapse-width : 80px !default;
@media(max-width : $app-collapse-breakpoint) {
  .app-layout__sidebar{
    width: $app-sidebar-collapse-width;
    .a-logo-text {
      display: none;
    }
  }
}
@media(max-width : $app-collapse-breakpoint){
  .app-layout {
    &__sidebar {
      width: auto !important;
      .#{$sidebar} {
        &.breakpointed {
          display: flex;
          flex-direction: row;
        }
      }
    }
  }
}
</style>
