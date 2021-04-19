<template>
  <div class="app-layout" id="app-layout-master">
    <div class="app-layout__wrapper">
      <div class="app-layout__sidebar-wrapper">
        <m-sidebar :groups="groups">
          <div slot="footer" class="all-center" style="flex-direction:column;padding: 1em;">
            <img width="100" src="@/assets/images/icons/500.png" alt="SMS" />
            <strong class="fz-20 m-t-5">Hello Footer</strong>
          </div>
          <div slot="footer-sm" class="all-center" style="padding: 1em;">
            <img src="@/assets/images/icons/500.png" alt="SMS" width="40" />
          </div>
        </m-sidebar>
      </div>
      <div class="app-layout__body">
        <div class="app-layout__header">
          <m-header hideBreadcrumbRoot :store="store" :accountSettings="accountSettings" @logout="logout" />
        </div>
        <div class="app-layout__container">
          <div class="app-layout__content wrapper-space">
            <template>
              <transition name="fade-in" mode="out-in">
                <router-view />
              </transition>
            </template>
          </div>
          <div class="app-layout__footer">
            <m-footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sidebarGroups from './app_sidebar'

export default {
  name: "DefaultLayout",
  data() {
    return {
      groups: sidebarGroups,
    }
  },
  computed: {
    ...mapGetters({
      store: 'auth/getStore',
      accountSettings: 'accountSettings/getAccountSettings',
    }),
  },
  created() {
    this.initOneSignal()
    this.initIntercom()
    this.getAccountSettings()
  },
  metaInfo: {
    titleTemplate: function(t) {
      return `${t} - ${this.$app.name}`
    }
  },
  methods: {
    ...mapActions({
      initOneSignal: 'initOneSignal',
      initIntercom: 'auth/initIntercom',
      toggleShowIntercom: 'auth/toggleShowIntercom',
      logout: 'auth/logout',
      getAccountSettings: 'accountSettings/getAccountSettings',
    })
  }
};
</script>
<style lang="scss" >
.preview-area {
    border: 1px dashed #CCC;
    border-radius: 10px;
    padding: 1em;
    background: #f6f6f6;
    &.f-col {
        display: flex;
        flex-direction: column;
        > * {
            margin-bottom: 1em;
        }
    }
}
pre {
    line-height: 1.4;
    padding: 1.25rem 1.5rem;
    margin: 0.85rem 0;
    background-color: #282c34;
    border-radius: 6px;
    overflow: auto;
    code {
        font-size: 1.25em;
        color: #fff;
        padding: 0;
        background-color: transparent;
        border-radius: 0;
    }
}
</style>
