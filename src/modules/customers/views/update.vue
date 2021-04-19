<template>
	<div class="update-customer-wrapper">
		<div class="update-customer">
            <router-link :to="{name: $routerName.LIST_CUSTOMERS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left"></i>{{$t('customers.back_list')}}</router-link>
            <h5 class="m-b-16">{{ $t('customers.update_customer') }}</h5>
            <div class="update-customer__content">
                <template v-if="isLoading">
                    <vue-loading :loading="true" />
                </template>
                <template v-else>
                    <transition name="fade-in" mode="out-in">
                        <form-customer
                            v-model="form"
                            mode="update"
                            :is-modify.sync="isModify"
                        >
                        </form-customer>
                    </transition>
                </template>
            </div>
	    </div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FormCustomer from './../components/Form'

export default {
    name: 'UpdateCustomer',
    metaInfo: {
		title: 'Update Customer',
	},
	data(){
		return {
            form: {
                id: '',
				first_name: '',
                last_name: '',
                email: '',
                phone: '',
                accept_marketing: false,
                addresses: {
                    id: '',
                    first_name: '',
                    last_name: '',
                    company: '',
                    address1: '',
                    address2: '',
                    city: '',
                    country_code: '',
                    zip: '',
                    phone: '',
                },
                note: '',
                tags: ''
			},
            isModify: false,
            isLoading: true
		}
    },
    components: {
        FormCustomer
    },
    beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
    },
    computed: {
        ...mapGetters({
            store : 'auth/getStore'
        }),
    },
    async created(){
        let id = this.$route.params && this.$route.params.id ? this.$route.params.id : ''
		try {
            let res = await this.getCustomer(id)
            // console.log(res.data)
            let { status, data} = res.data
            if(status){
                this.convertData(data)
            }
		} catch (err) {
			console.log(err)
		} finally{
            this.isLoading = false
        }
	},
  	methods: {
        ...mapActions({
            'getCustomer': 'customers/getCustomer'
        }),
        convertData(data){
			let _this = this
			let {
                id = '',
				first_name = '',
				last_name = '',
                email = '',
                phone = '',
                accept_marketing = '',
                note = '',
                tags = ''
            } = data
            _this.form.id = id
            _this.form.first_name = first_name
            _this.form.last_name = last_name
            _this.form.email = email
            _this.form.phone = phone
            _this.form.accept_marketing = accept_marketing
            if(!!data.addresses.length){
                let addresses = data.addresses[0]
                let country = addresses.country_code || (this.store && this.store.country) || ''
                _this.form.addresses.id = addresses.id || ''
                _this.form.addresses.first_name = addresses.first_name || ''
                _this.form.addresses.last_name = addresses.last_name || ''
                _this.form.addresses.company = addresses.company || ''
                _this.form.addresses.address1 = addresses.address1 || ''
                _this.form.addresses.address2 = addresses.address2 || ''
                _this.form.addresses.city = addresses.city || ''
                _this.form.addresses.country_code = country.toLowerCase()
                _this.form.addresses.zip = addresses.zip || ''
                _this.form.addresses.phone = addresses.phone || ''
            }
            _this.form.note = note
            _this.form.tags = tags
		},
	}
}
</script>

<style lang="scss">
    .update-customer{
        max-width: 720px;
        margin: auto;
        &__overview{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__address{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__notes{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__tags{
            padding: 24px 40px;
        }
    }
</style>
