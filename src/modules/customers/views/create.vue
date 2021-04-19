<template>
	<div class="add-customer-wrapper">
		<div class="add-customer">
            <router-link :to="{name: $routerName.LIST_CUSTOMERS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left"></i>{{$t('customers.back_list')}}</router-link>
            <h5 class="m-b-16">{{ $t('customers.add_customer') }}</h5>
            <div class="add-customer__content">
                <form-customer
                    v-model="form"
                    mode="create"
                    :is-modify.sync="isModify"
                >
                </form-customer>
            </div>
	    </div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import FormCustomer from './../components/Form'

export default {
    name: 'AddCustomer',
    metaInfo: {
		title: 'Add Customer',
	},
	data(){
		return {
            form: {
				first_name: '',
                last_name: '',
                email: '',
                phone: '',
                accept_marketing: false,
                addresses: {
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
            isModify: false
		}
    },
    computed: {
		...mapGetters({
			store : 'auth/getStore'
		})
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
    created(){
        let country = this.store && this.store.country || ''
        this.form.addresses.country_code = country.toLowerCase()
    }
}
</script>

<style lang="scss">
    .add-customer{
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