import Vue from 'vue'
import axios from '@/plugins/axios'

Vue.mixin({
  methods: {
    redirect(route) {
      this.$router.push(route)
    },
    setRouterLinkDefault({
      name,
      params,
      query
    }) {
      let current = {
        name: this.$route.name,
        params: this.$route.params,
        query: this.$route.query
      }
      if (name) {
        current.name = name
      }
      if (params) {
        current.params = params
      }
      if (query) {
        current.query = query
      }
      return current
    },
    createAxiosCancelRequestToken() {
      const CancelToken = axios.CancelToken;
      return CancelToken.source()
    },
    confirmBeforeRouteLeave({
      to,
      from,
      next,
      title = this.$t('app.confirm.route_leave.title'),
      content = this.$t('app.confirm.route_leave.content'),
      okText = this.$t('app.confirm.route_leave.ok_text'),
      cancelText = this.$t('app.confirm.route_leave.cancel_text'),
      okType = 'danger',
      okButtonProps = {
        class: `${this.$prefixClass.btn} ${this.$prefixClass.btn}-primary`
      },
      cancelButtonProps = {
        class: `${this.$prefixClass.btn}`
      },
      zIndex = 10002,
      closable = true
    }) {
      this.$confirm({
        title,
        content,
        okText,
        cancelText,
        okType,
        okButtonProps,
        cancelButtonProps,
        zIndex,
        closable,
        prefixCls: this.$prefixClass.modal,
        onOk: () => {
          next()
        },
        onCancel: () => {}
      })
    },
    createFormData: function(object, form, namespace) {
      const formData = form || new FormData();
      for (let property in object) {
        // if (!object.hasOwnProperty(property) || !object[property]) {
        //     continue;
        // }
        const formKey = namespace ? `${namespace}[${property}]` : property;
        if (object[property] instanceof Date) {
          formData.append(formKey, object[property].toISOString());
        } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
          if (Array.isArray(object[property]) && object[property].length <= 0) {
            formData.append(formKey, []);
          } else {
            this.createFormData(object[property], formData, formKey);
          }
        } else {
          formData.append(formKey, object[property]);
        }
      }
      return formData;
    },
    mappingObject(oldForm, newForm) {
      for (let property in oldForm) {
        if (!newForm.hasOwnProperty(property) || !newForm[property]) {
          continue;
        }
        if (typeof(oldForm[property]) === 'object' && property != 'images') {
          this.mappingObject(oldForm[property], newForm[property])
        } else {
          oldForm[property] = newForm[property]
        }
      }
    },
    imageDefault() {
      return require('@/assets/images/no-img-product.png')
    },
    avatarDefault() {
      return require('@/assets/images/avatar-default.png')
    },
    pushRouterLinkDefault({
      name,
      params,
      query
    }) {
      // return new Promise((resolve, reject)=>{
      let current = {
        name: this.$route.name,
        params: this.$route.params,
        query: this.$route.query
      }
      if (name) {
        current.name = name
      }
      if (params) {
        current.params = params
      }
      if (query) {
        current.query = query
      }
      this.$router.push(current)
      // })
    },
    showFormErrors(message) {
      var content = ''
      if (message) {
        if (typeof message == 'string') {
          content = message
        } else if (typeof message == 'object') {
          for (const key in message) {
            if (message.hasOwnProperty(key)) {
              const element = message[key];
              if (typeof element == 'object' && element.length) {
                content = element[0]
              }
              break
            }
          }
        }
      }
      this.$notification['error']({
        message: 'Error',
        description: content,
      });
    }
  }
})
