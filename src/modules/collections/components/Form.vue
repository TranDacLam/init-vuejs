<template>
	<div class="form-collection">

        <vue-app-bar 
			:visible="isModify" 
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		></vue-app-bar >

        <div class="form-collection__content">
            <div :class="['form-collection__info', $prefixClass.card + '-stroke']">
                <h6 class="m-b-24">{{ $t('collections.form.info') }}</h6>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('collections.form.title') }}</label>
                    <div :class="[$prefixClass.col + '-18', (formstate && !$v.form.title.required ? 'has-error' : '')]">
                        <a-input placeholder="Enter text..." v-model="form.title"/>
                        <transition name="fade-in" mode="out-in">
                            <div v-if="formstate && !$v.form.title.required" class="form-error">
                                {{ $t('errors.required_field') }}
                            </div>
                        </transition>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('collections.form.description') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-summernote
                            :code="form.body_html"
                            @change="descriptionChange"
                        > </vue-summernote>
                    </div>
                </div>
                <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
                    <label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{ $t('collections.form.image') }}</label>
                    <div :class="$prefixClass.col + '-18'">
                        <vue-upload-image 
                            :maximumSize="maximumSize"
                            :maximumFile="1"
                            :multiple="false"
                            :value="form.image"
                            :classContainer="$prefixClass.updateImage + '-single'"
                            @change="uploadImages"
                        > </vue-upload-image>
                    </div>
                </div>
            </div>
            <div :class="['form-collection__type', $prefixClass.card + '-stroke']">
                <h6 class="m-b-24">{{ $t('collections.form.type') }}</h6>
                <a-radio-group v-model="form.collection_type ">
                    <div :class="[$prefixClass.form + '-item', 'm-b-24']">
                        <a-radio value="custom" :class="$prefixClass.radio + '-group'">
                            {{ $t('collections.form.manual') }}
                        </a-radio>
                        <p class="m-l-30 color-secondary fz-11 m-b-0">{{ $t('collections.form.manual_desc') }}</p>
                    </div>
                    <div :class="[$prefixClass.form + '-item', 'm-b-0']">
                        <a-radio value="smart" :class="$prefixClass.radio + '-group'">
                            {{ $t('collections.form.automated') }}
                        </a-radio>
                        <p class="m-l-30 color-secondary fz-11 m-b-0">{{ $t('collections.form.automated_desc') }}</p>
                    </div>
                </a-radio-group>
            </div>

            <div class="form-collection__button" v-if="isModify">
            <a-button type="secondary" class="m-r-8" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('collections.buttons.cancel') }}</a-button>
            <a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('collections.buttons.save') }}</a-button>
        </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'FormCollection',
    props: {
        value: {
            type: Object,
            required : true
        },
        mode: String,
        isModify :{
			type : Boolean,
			default : false,
		}
    },
	data(){
		return {
            typeTopBar: 'unsaved',
            maximumSize: 5,
            isMultiple: true,
            formstate: false,
            formDataOld: null
		}
    },
    validations: () => ({
		form: {
			title : {
                required
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
            'create': 'collections/createCollection',
            'update': 'collections/updateCollection'
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
				title: _this.form.title,
				body_html: _this.form.body_html,
				collection_type  : _this.form.collection_type,
            }
            if(!!_this.form.image.length){
                if(_this.form.image[0].name){
                    data['image'] = _this.form.image[0]
                }else{
                    data['image'] = _this.form.image[0].src
                }
            }
			let formData = this.createFormData(data)
            if(_this.mode == 'create'){
                _this.create(formData).then(res => {
                    let { status, data } = res.data
                    if(status){
                        _this.typeTopBar = 'save'
                        setTimeout(() => {
                            _this.$emit('update:is-modify', false)
                            _this.$router.push({name: _this.$routerName.UPDATE_COLLECTION, params: {id: data.collection_id}})
                        }, 1200)
                    }else{
                        _this.typeTopBar = 'error'
                    }
                }).catch((e) => {
                    _this.typeTopBar = 'error'
                }) 
            }else if(_this.mode == 'update'){
                 _this.update({id: _this.form.id, data: formData}).then(res => {
                    let { status } = res.data
                    if(status){
                        _this.typeTopBar = 'save'
                        setTimeout(() => {
                            _this.$emit('update:is-modify', false)
                        }, 2000)
                    }else{
                        _this.typeTopBar = 'error'
                    }
                }).catch((e) => {
                    _this.typeTopBar = 'error'
                }) 
            }
		},
		onCancel(){
            let _this = this
			_this.form = {..._this.form, ..._this.$clone(this.formDataOld)}
            setTimeout(() => {
                this.$emit('update:is-modify', false)
            })
        },
        descriptionChange(value){
            this.form.body_html = value
        },
        uploadImages(image){
            this.form.image = image
        },
	}
}
</script>

<style lang="scss">
    .form-collection{
        max-width: 720px;
        margin: auto;
        &__info{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__type{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__button{
            margin-top: 32px;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>