<template>
    <div class="form-create-product">
        <div class="m-b-16">
            <router-link :to="{name: $routerName.LIST_PRODUCTS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left m-r-8"></i>{{ $t('products.back_products_list') }}
            </router-link>
            <h5> {{ $t('products.add_product') }} </h5>
        </div>
        <form-product
            :is-modify.sync="isModify"
            v-model="form"
            mode="create"
        ></form-product>
    </div>
</template>
<script>
import FormProduct from './../components/Form'
export default {
    name: 'AddProduct',
    metaInfo:{
        title: 'Add Product'
    },
    data(){
        return {
            form:{
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
                        inventory_quantity: 100
                    }
                ],
                options: []
            },
            isModify: false
        }
    },
    components:{
        FormProduct
    },
    beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
    },
    methods:{
        
    }
}
</script>
<style lang="scss">
    .form-create-product{
        max-width: 716px;
        margin: auto;
    }
</style>