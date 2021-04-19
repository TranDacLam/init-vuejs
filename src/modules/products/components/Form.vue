<template>
    <div class="form-product">
        <vue-app-bar 
            :visible="isModify" 
            :type="typeTopBar"
            @onSave="onSave"
            @onCancel="onCancel"
        ></vue-app-bar >
        <div class="form-product__body m-b-24">
            <div class="form-product__info">
                <h6 class="m-b-24">{{ $t('products.product_information') }}</h6>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24', (formstate && !$v.form.title.required) ? 'has-error' : '']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.product_title') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.title"/>
                        <transition name="fade-in" mode="out-in">
                            <div v-if="formstate && !$v.form.title.required" class="form-error">
                                {{ $t('errors.required_field') }}
                            </div>
                        </transition>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.description') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-summernote
                            :code="form.body_html"
                            @change="descriptionChange"
                        > </vue-summernote>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.image') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-upload-image 
                            :multiple="isMultiple"
                            :maximumSize="maximumSize"
                            :maximumFile="maximumFile"
                            :value="form.images"
                            @change="uploadImages"
                        > </vue-upload-image>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-product__body m-b-24">
            <div class="form-product__pricing">
                <h6 class="m-b-24">{{ $t('products.pricing') }}</h6>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24', (errors.variants.price || formstate && !$v.form.variants.price.valid) ? 'has-error' : '']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.price') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="0" v-model="variantValues.price" @change="changePrice('price')">
                            <span slot="prefix">₫</span>
                        </a-input>
                        <transition name="fade-in" mode="out-in">
                            <div v-if="errors.variants.price" class="form-error">
                                {{errors.variants.price}}
                            </div>
                            <div v-else-if="formstate && !$v.form.variants.price.valid" class="form-error">
                                {{ $t('errors.required_field') }}
                            </div>
                        </transition>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.compare_price') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="0" v-model="variantValues.compare_at_price" @change="changePrice('compare_at_price')">
                            <span slot="prefix">₫</span>
                        </a-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-product__body m-b-24">
            <div class="form-product__inventory">
                <h6 class="m-b-24">{{ $t('products.inventory') }}</h6>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.quantity') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input-number :class="$prefixClass.counter" :min="1" v-model="variantValues.inventory_quantity"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-product__body m-b-24" v-if="mode=='create'">
            <form-variants
                v-model="form"
                :defaultVariant="defaultVariant"
            ></form-variants>
        </div>
        <div class="text-right m-b-24">
            <a-checkbox :class="$prefixClass.checkbox + '-group'" v-model="form.unpublish">
                {{ $t('products.unpublish') }} 
            </a-checkbox>
        </div>
        <div class="form-product__button" v-if="isModify">
            <a-button type="secondary" class="m-r-8" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('products.buttons.cancel') }}</a-button>
            <a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('products.buttons.save') }}</a-button>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import FormVariants from './FormVariants'
export default {
    name: 'FormProduct',
    props:{
        value: {
            type: Object,
            required : true
        },
        mode: String,
        isModify: {
            type : Boolean,
            default : false,
        }
    },
    components: {
        FormVariants
    },
    data(){
        return {
            maximumSize: 5,
            isError: false,
            maximumFile: 7,
            isMultiple: true,
            formstate: false,
            typeTopBar: 'unsaved',
            formDataOld: null,
            errors: {
                variants: {}
            },
            variantValues: {
                price: '',
                compare_at_price: '',
                inventory_quantity: ''
            },
            defaultVariant: {
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
        }
    },
    validations: () => ({
        form: {
            title : {
                required
            },
            variants: {
                price: {
                    valid: function(){
                        if(this.mode == 'update' && this.form.variants.length <= 1) {
                            return (this.variantValues.price != '')
                        }
                        return true
                    }
                }
            }
        }
    }),
    created(){
        for(let property in this.variantValues){
            this.variantValues[property] = this.form.variants[0][property]
            this.defaultVariant[property] = this.form.variants[0][property]
        }
    },
    computed: {
        form: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    },
    mounted(){
        let _this = this
        this.formDataOld = this.$clone(this.form)
        this.$nextTick(()=>{
            this.$watch('form' , {
                handler : function(){
                    this.$emit('update:is-modify', true)
                    this.typeTopBar = 'unsaved'
                },
                deep : true
            })
            this.$watch('variantValues', {
                handler: function(val){
                    for(let property in this.variantValues){
                        this.defaultVariant[property] = this.variantValues[property]
                    }
                    if (this.form.isMutipleOptions == false || this.form.options[0].values.length < 1) {
                        for(let property in this.variantValues){
                            this.form.variants[0][property] = this.variantValues[property]
                        }
                    }
                },
                deep: true
            })
        })
        window.addEventListener('beforeunload', function (event) {
            if(_this.isModify){
                event.returnValue = true
            }
        }, false)
    },
    methods:{
        ...mapActions({
            'created': 'products/createProduct',
            'updated': 'products/updateProduct'
        }),
        onSave(){
            this.formstate = true
            if(this.$v.form.$invalid){
				this.typeTopBar = 'error'
				return
			}
            this.typeTopBar = 'saving'
            switch(this.mode){
                case 'create':
                        this.handleCreate()
                    break
                case 'update':
                        this.handleUpdate()
                    break
                default:
                    console.log('Mode undefind')
                    
            }
        },
        async handleCreate(){
            let formData = this.createFormData(this.form)
            await this.created(formData).then(res => {
            let { status = false, errors, data } = res.data
                if( status){
                    this.typeTopBar = 'save'
                    this.resetErrors()
                    setTimeout(()=>{
                        this.$emit('update:is-modify', false)
                        if( !data.product.published_at ) {
                            this.form.id = data.product_id
                            this.showConfirm()
                        } else {
                            this.$router.push({ name: this.$routerName.LIST_PRODUCTS })
                        }
                        // this.$router.push({ name: this.$routerName.UPDATE_PRODUCT, params: {product_id: data.product_id}})
                    }, 2000)
                } else {
                    this.typeTopBar = 'error'
                    this.handleErrors(errors)
                }
            }).catch((e) => {
                this.typeTopBar = 'error'
            }) 
        },
        async handleUpdate(){
            let product_id = this.form.id
            let formData = this.createFormData(this.form)
            await this.updated({formData: formData, product_id: product_id}).then(res => {
            let { status = false, errors } = res.data
                if( status){
                    this.typeTopBar = 'save'
                    this.resetErrors()
                    setTimeout(()=>{
                        this.$emit('update:is-modify', false)
                    }, 2000)
                } else {
                    this.typeTopBar = 'error'
                    this.handleErrors(errors)
                }
            }).catch((e) => {
                this.typeTopBar = 'error'
            }) 
        },
        onCancel(){
            let _this = this
            _this.form = {..._this.form, ..._this.$clone(this.formDataOld)}
            _this.resetErrors()
            setTimeout(() => {
                this.$emit('update:is-modify', false)
            })
        },
        descriptionChange(value){
            this.form.body_html = value
        },
        uploadImages(images){
            this.form.images = images
        },
        changePrice(property){
            this.variantValues[property] = this.variantValues[property].replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        handleErrors(errors){
            if(errors['price']){
                this.errors['variants']['price'] = errors['price']
            }else{
                delete this.errors['variants']['price']
            }
        },
        resetErrors(){
            this.$set(this.errors, 'variants', {})
        },
        showConfirm(){
            this.alertConfirm({
				title: 'Publish Product',
                content: h => <div>Your product is saved but not published.<br></br>
                Do you want to publish this product on your store?</div>,
                okText: this.$t('app.confirm.product.publish_now'),
			    cancelText: this.$t('app.confirm.product.later'),
                action: (isPublish) => {
					if(isPublish){
                        this.form.unpublish = false
                        this.typeTopBar = 'saving'
                        this.handleUpdate()
                    }else{
                        console.log('later')
                    }
                    this.$router.push({ name: this.$routerName.LIST_PRODUCTS })
				},
			})
        }
    }
}
</script>
<style lang="scss">
    .form-product{
        &__body{
            border-radius: 4px;
            padding: 32px 40px;
            background: $white-color;
            border: 1px solid $line-color;
            
        }
        &__pricing{
            .a-input{
                padding-left: 35px !important;
            }
        }
        &__button{
            text-align: right;
        }
    }
</style>