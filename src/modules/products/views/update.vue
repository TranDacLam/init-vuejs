<template>
    <div class="update-product">
        <div class="m-b-16">
            <router-link :to="{name: $routerName.LIST_PRODUCTS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left m-r-8"></i>{{ $t('products.back_products_list') }}
            </router-link>
            <h5> {{ $t('products.update_product') }} </h5>
        </div>
        <div>
            <template v-if="isLoading">
                <vue-loading :loading="true" />
            </template>
            <template v-else>
                <transition name="fade-in" mode="out-in">
                    <form-product
                        v-model="form"
                        mode="update"
                        :is-modify.sync="isModify"
                    >
                    </form-product>
                </transition>
            </template>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import FormProduct from './../components/Form'
export default {
    name: 'UpdateProduct',
    metaInfo:{
        title: 'Update Product'
    },
    components:{
        FormProduct
    },
    data(){
        return {
            product_id: 0,
            form:{
                id: 0,
                title: '',
                body_html: '',
                images: [],
                unpublish: false,
                isMutipleOptions: false,
                variants: [
                    {
                        id: '',
                        title: '',
                        price: '',
                        option1: '',
                        option2: '',
                        option3: '',
                        barcode: '',
                        sku: '',
                        compare_at_price: '',
                        inventory_quantity: ''
                    }
                ],
                options : []
            },
            isModify: false,
            isLoading: true
        }
    },
    created(){
        this.getProductInfo()
    },
    beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
    },
    methods:{
        ...mapActions({
            'getProductDetail': 'products/getProductDetail'
        }),
        async getProductInfo(){
            let query = this.getQuery(this.$route.params)
            let self = this
            this.product_id = query.product_id
            await this.getProductDetail({product_id: this.product_id}).then(res => {
                let { status = false, data = {} } = res.data
                if ( status ){
                    self.mappingObject(self.form, data)
                    self.form.variants.forEach(variant => {
                        variant.price = this.formatPrice(variant.price)
                        variant.compare_at_price = this.formatPrice(variant.compare_at_price)
                    });
                    self.form.unpublish = ( data.published_at ) ? false : true
                }
                self.isLoading = false
            }).catch((e) => {
                console.log(e)
            })
        },
        getQuery(query){
            let result = {}
			if (query.product_id) {
				result['product_id'] = query.product_id
			}
			return result
        },
        formatPrice(value){
            if (isNaN(value)) {
                return ''
            }
            return String(value).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }
}
</script>
<style lang="scss">
    .update-product{
        max-width: 750px;
        margin: auto;
    }
</style>