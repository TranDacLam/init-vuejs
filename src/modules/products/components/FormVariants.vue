<template>
    <div class="form-product__variants">
        <h6 class="m-b-24">{{ $t('products.variants') }}</h6>
        <template>
            <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                <a-checkbox :class="$prefixClass.checkbox + '-group'" v-model="form.isMutipleOptions" @change="onMutipleOptions">
                    {{ $t('products.multiple_options')}}
                </a-checkbox>
            </div>
            <div v-if="form.isMutipleOptions">
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']" v-for="(option, index) in form.options" :key="index">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6', 'p-r-16']">{{ $t('products.option', {count: index+1}) }}</label>
                    <div :class="[$prefixClass.col + '-6']">
                        <vue-input-datalist
                            v-model="option.name"
                            :options="options"
                            @onChangeOption="onChangeOption"
                        ></vue-input-datalist>
                    </div>
                    <div :class="[$prefixClass.col + '-11', 'p-l-16', 'm-r-12']">
                        <a-variants 
                            v-model="option.values"
                            @onGenerateVariants="onGenerateVariants()"
                        ></a-variants>
                    </div>
                    <i v-if="form.options.length > 1" :class="[$prefixClass.col + '-1', 'far', 'fa-times-circle']" @click="removeOptions(index)"></i>
                </div>
                <div class="text-right m-b-24" v-if="form.options.length < 3">
                    <a-button type="secondary" @click="addMoreOption">{{ $t('products.buttons.add_another_option')}}</a-button>
                </div>
                <div class="variants__preview" v-if="form.isMutipleOptions && form.options[0].values.length > 0">
                    <hr class="m-b-24">
                    <label>{{ $t('products.preview')}}</label>
                    <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-t-24', 'm-b-7']">
                        <label :class="[$prefixClass.label, $prefixClass.col + '-4', 'p-r-24']">{{ $t('products.variant')}}</label>
                        <label :class="[$prefixClass.label, $prefixClass.col + '-6', 'p-r-24']">{{ $t('products.price')}}</label>
                        <label :class="[$prefixClass.label, $prefixClass.col + '-4', 'p-r-24']">{{ $t('products.quantity')}}</label>
                        <label :class="[$prefixClass.label, $prefixClass.col + '-4', 'p-r-24']">{{ $t('products.sku')}}</label>
                        <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('products.barcode')}}</label>
                    </div>
                    <hr class="m-b-16">
                    <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-16']" v-for="(variant, index) in form.variants" :key="index">
                        <span :class="[$prefixClass.col + '-4', 'p-r-24']">{{variant.title}}</span>
                        <div :class="[$prefixClass.col + '-6', 'p-r-24']">
                            <a-input :class="[$prefixClass.inputPseudo + '-prepend']" placeholder="Enter text..." v-model="variant.price" @change="changePrice(index)">
                                <span class="" slot="prefix" >₫</span>
                            </a-input  >
                        </div>
                        <div :class="[$prefixClass.col + '-4', 'p-r-24']">
                            <a-input-number :class="$prefixClass.counter"  placeholder="0" v-model="variant.inventory_quantity"/>
                        </div>
                        <div :class="[$prefixClass.col + '-4', 'p-r-24']">
                            <a-input v-model="variant.sku"/>
                        </div>
                        <div :class="[$prefixClass.col + '-5', 'm-r-12']">
                            <a-input v-model="variant.barcode"/>
                        </div>
                        <i :class="[$prefixClass.col + '-1', 'far', 'fa-times-circle']" @click="removeVariant(variant)"></i>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import AVariants from './Variants'
export default {
    name: 'FormVariants',
    props: {
        value: {
            type: Object,
            required : true
        },
        defaultVariant: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            options: [],
            arrList: [],
            defaultOptions: ['Color', 'Size', 'Style', 'Material']
        }
    },
    components: {
        AVariants
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
    created(){
        this.options = this.$clone(this.defaultOptions)
    },
    methods: {
        onMutipleOptions(e){
            if(e.target.checked){
                this.form.isMutipleOptions = true
                this.form.options.push({name: this.options[0], values: []})
                this.options =  this.options.filter(item => item != this.options[0])
            }else{
                this.form.isMutipleOptions = false
                this.form.options = []
                this.form.variants = []
                this.form.variants.push(this.$clone(this.defaultVariant))
                this.options = this.$clone(this.defaultOptions)
            }
        },
        removeOptions(index){
            this.options.push(this.form.options[index].name)
            this.form.options = this.form.options.filter(item => item !== this.form.options[index])
            this.onGenerateVariants()
        },
        addMoreOption(){
            this.form.options.push({name: this.options[0], values: []})
            this.options = this.options.filter(item => item != this.options[0])
        },
        onGenerateVariants(){
            let arrList = []
            let generateVariants = function(arr1, arr2){
                arrList =  (arr2) ? [] : arrList
                arr1.forEach(option1 => {
                    if (arr2 && arr2.length) { 
                        arr2.forEach(option2 => {
                            arrList.push(option1 + ' / ' + option2)
                        })
                    } else {
                        arrList.push(option1)
                    }
                    
                })
            }
            if (this.form.options.length == 1) {
                generateVariants(this.form.options[0].values)
            } else {
                for(let i=0; i < this.form.options.length - 1; i++){
                    let arrA = arrList.length > 0 ? arrList : this.form.options[i].values
                    generateVariants(arrA, this.form.options[i+1].values)
                }
            }
            let variants = []
            for(let index in arrList) {
                if (!this.form.variants[index]) {
                    variants[index] = this.$clone(this.defaultVariant)
                } else { 
                    variants[index] = this.form.variants[index]
                }
                variants[index].title = arrList[index]
                let options = arrList[index].split('/')
                for(let i in options){
                    variants[index]['option'+(Number(i)+1)] = options[i]
                }
            }
            this.form.variants = variants
        },
        changePrice(index){
            this.form.variants[index].price = this.form.variants[index].price.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        removeVariant(variant){
            this.form.variants = this.form.variants.filter(item => item.title != variant.title)
        },
        onChangeOption(option){
            this.options = this.options.filter(item => item != option.newValue)
            this.options.push(option.oldValue)
        }
    }
}
</script>
<style lang="scss" scoped>
    .form-product{
        &__variants{
            .m-form-item {
                display: flex;
                align-items: center;
            }
            label {
                font-weight: bold;
            }
            .fa-times-circle {
                font-size: 15px;
                color: $text-color-secondary;
                display: flex;
                align-items: center;
                &:hover{
                    cursor: pointer;
                }
            }
            .variants {
                &__preview{
                    > label {
                        font-size: 15px !important; 
                    }
                }
            }
        }
    }
</style>