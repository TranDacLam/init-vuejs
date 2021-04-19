<template>
	<div class="form-customer">

        <vue-app-bar 
			:visible="isModify" 
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		></vue-app-bar >

        <div :class="['form-customer__overview', $prefixClass.card + '-stroke']">
            <h6 class="m-b-24">{{ $t('customers.form.overview') }}</h6>
            <div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.firt_name') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.first_name" />
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.last_name') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.last_name" />
                    </div>
                </div>
                <div 
                    :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24', 
                    errors.email || (formstate && (!$v.form.email.required || !$v.form.email.email)) ? 'has-error' : '']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.email') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.email" />
                        <transition name="fade-in" mode="out-in">
                            <div v-if="errors.email" class="form-error">
                                {{errors.email}}
                            </div>
                            <div v-else-if="mode == 'update' && formstate && !$v.form.email.required" class="form-error">
                                {{ $t('errors.required_field') }}
                            </div>
                            <div v-else-if="mode == 'update' && formstate && !$v.form.email.email" class="form-error">
                                {{ $t('errors.invalid_value') }}
                            </div>
                        </transition>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24', errors.phone ? 'has-error' : '']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.phone_number') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-input-intl-tel v-model="form.phone"></vue-input-intl-tel>
                        <transition name="fade-in" mode="out-in">
                            <div v-if="errors.phone" class="form-error">
                                {{errors.phone}}
                            </div>
                        </transition>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-0']">
                    <div :class="$prefixClass.col + '-24'">
                        <a-checkbox v-model="form.accept_marketing" :class="$prefixClass.checkbox + '-group'">
                            {{ $t('customers.form.accepts_marketing') }}
                        </a-checkbox>
                    </div>
                </div>
            </div>
        </div>

        <div :class="['form-customer__address', $prefixClass.card + '-stroke']">
            <h6 class="m-b-24">{{ $t('customers.form.address') }}</h6>
            <div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.firt_name') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.first_name"/>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.last_name') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.last_name"/>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.company') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.company"/>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.address') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.address1"/>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.apartment') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.address2" />
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">City</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.city" />
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.country_region') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-select 
                            :prefixCls="$prefixClass.select" 
                            placeholder="United States"
                            style="width: 100%"
                            v-model="form.addresses.country_code"
                        >
                            <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                            <a-select-option 
                                v-for="(c, index) in allCountries" 
                                :key="`index_${index}`"
                                :value="c.iso2"
                            >{{c.name}} ({{c.iso2.toUpperCase()}})</a-select-option>
                        </a-select>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.postal_code') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.addresses.zip"/>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-0']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.phone_number') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-input-intl-tel v-model="form.addresses.phone"></vue-input-intl-tel>
                    </div>
                </div>
            </div>
        </div>

        <div :class="['form-customer__notes', $prefixClass.card + '-stroke']">
            <h6 class="m-b-24">Add notes</h6>
            <div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-0']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.notes') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.note"/>
                    </div>
                </div>
            </div>
        </div>

        <div :class="['form-customer__tags', $prefixClass.card + '-stroke']">
            <h6 class="m-b-24">Tags</h6>
            <div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-0']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('customers.form.tags') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <a-input placeholder="Enter text..." v-model="form.tags"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="form-customer__button" v-if="isModify">
            <a-button type="secondary" class="m-r-8" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('customers.buttons.cancel') }}</a-button>
            <a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('customers.buttons.save') }}</a-button>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as momentTimezone from 'moment-timezone'
import { required, email } from 'vuelidate/lib/validators'
import allCountries from '@/constants/countries'

export default {
    name: 'FormCustomer',
    props: {
        value: {
            type: Object,
            required : true
        },
        mode: {
            type: String,
            required : true
        },
        isModify :{
			type : Boolean,
			default : false,
		}
    },
	data(){
		return {
            typeTopBar: 'unsaved',
            formstate: false,
            formDataOld: null,
            allCountries,
            errors: {}
		}
    },
    validations: () => ({
        form: {
            email: {
                required,
                email,
                valid(value) {
                    if(this.mode == 'update') {
                        return !this.errors.email
                    }
                    return true
                }
            }
        }
    }),
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
    watch: {
        'form.email'(val, oldVal){
            this.errors['email'] = ''
        },
        'form.phone'(val, oldVal){
            this.errors['phone'] = ''
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
        })
        window.addEventListener('beforeunload', function (event) {
            if(_this.isModify){
                event.returnValue = true
            }
        }, false)
    },
  	methods: {
        ...mapActions({
            'create': 'customers/createCustomer',
            'update': 'customers/updateCustomer',
        }),
		onSave(){
            let _this = this
            _this.formstate = true
			if(_this.$v.form.$invalid){
				_this.typeTopBar = 'error'
				return
			}
			_this.typeTopBar = 'saving'
			let data = {
				first_name: _this.form.first_name,
				last_name: _this.form.last_name,
				email: _this.form.email,
				phone: _this.form.phone,
                accept_marketing: _this.form.accept_marketing,
                addresses : {
                    id: _this.form.addresses.id,
                    first_name: _this.form.addresses.first_name,
                    last_name: _this.form.addresses.last_name,
                    company: _this.form.addresses.company,
                    address1 : _this.form.addresses.address1,
                    address2 : _this.form.addresses.address2,
                    city : _this.form.addresses.city,
                    country_code : _this.form.addresses.country_code,
                    zip : _this.form.addresses.zip,
                    phone : _this.form.addresses.phone,
                },
                note : _this.form.note,
                tags : _this.form.tags,
            }
            if(_this.mode == 'create'){
                _this.create(data).then(res => {
                    let { status, errors } = res.data
                    if(status){
                        _this.typeTopBar = 'save'
                        this.resetErrors()
                        setTimeout(() => {
                            _this.$emit('update:is-modify', false)
                            _this.$router.push({name: _this.$routerName.LIST_CUSTOMERS})
                        }, 1200)
                    }else{
                        _this.typeTopBar = 'error'
                        this.handleErrors(errors)
                    }
                }).catch((e) => {
                    _this.typeTopBar = 'error'
                }) 
            }else if(_this.mode == 'update'){
                 _this.update({id: _this.form.id, data}).then(res => {
                    let { status, errors } = res.data
                    if(status){
                        _this.typeTopBar = 'save'
                        this.resetErrors()
                        setTimeout(() => {
                            _this.$emit('update:is-modify', false)
                        }, 2000)
                    }else{
                        _this.typeTopBar = 'error'
                        this.handleErrors(errors)
                    }
                }).catch((e) => {
                    _this.typeTopBar = 'error'
                }) 
            }
		},
		onCancel(){
            let _this = this
            _this.form = {..._this.form, ..._this.$clone(this.formDataOld)}
            _this.resetErrors()
            setTimeout(() => {
                this.$emit('update:is-modify', false)
            })
        },
        handleErrors(errors){
            if(errors['email']){
                this.errors['email'] = errors['email']
            }else{
                delete this.errors['email']
            }
            if(errors['phone']){

                this.errors['phone'] = errors['phone']
            }else{
                delete this.errors['phone']
            }
        },
        resetErrors(){
            this.errors = {}
        }
	}
}
</script>

<style lang="scss">
    .form-customer{
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
        &__button{
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>