<template>
	<div class="theme-settings-wrapper">

		<vue-app-bar 
			:visible="isModify" 
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		></vue-app-bar >

		<div class="theme-settings">
			<h5 class="m-b-15">{{ $t('theme_settings.name') }}</h5>
			<div :class="['theme-settings__content', $prefixClass.card + '-stroke']">
				<div class="theme-settings__default m-b-32">
					<h6 class="m-b-25">{{ $t('theme_settings.default_settings') }}</h6>
					<div class="">
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.radio_selection') }}</label>
							</div>
							<div class="col-8">
								<a-radio-group v-model="form.valueRadio" class="row" >
									<a-radio value="a" :class="[$prefixClass.radio + '-group', 'col-6 m-b-24']"> 
										{{ $t('theme_settings.option_a') }}
									</a-radio>
									<a-radio value="b" :class="[$prefixClass.radio + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_b') }}
									</a-radio>
									<a-radio value="d" :class="[$prefixClass.radio + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_d') }}
									</a-radio>
									<a-radio value="e" :class="[$prefixClass.radio + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_e') }}
									</a-radio>
								</a-radio-group>
							</div>
						</div>
						<div class="row" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.checkbox_selection') }}</label>
							</div>
							<div class="col-8">
								<div class="row">
									<a-checkbox v-model="form.checkbox.check1" :class="[$prefixClass.checkbox + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_a') }}
									</a-checkbox>
									<a-checkbox v-model="form.checkbox.check2" :class="[$prefixClass.checkbox + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_b') }}
									</a-checkbox>
									<a-checkbox v-model="form.checkbox.check3" :class="[$prefixClass.checkbox + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_d') }}
									</a-checkbox>
									<a-checkbox v-model="form.checkbox.check4" :class="[$prefixClass.checkbox + '-group', 'col-6 m-b-24']">
										{{ $t('theme_settings.option_e') }}
									</a-checkbox>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="theme-settings__custom">
					<h6 class="m-b-25">{{ $t('theme_settings.custom_settings') }}</h6>
					<div>
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.text_field') }}</label>
							</div>
							<div class="col-8">
								<a-input  style="width: 80%" v-model="form.text" placeholder="Enter text..."></a-input>
							</div>
						</div>
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.dropdown_selection') }}</label>
							</div>
							<div class="col-8">
								<a-select v-model="form.select" :prefixCls="$prefixClass.select" defaultValue="Select" style="width: 80%">
									<i class="fas fa-chevron-down" slot="suffixIcon"></i>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="disabled" disabled>Disabled</a-select-option>
									<a-select-option value="Yiminghe">yiminghe</a-select-option>
								</a-select>
							</div>
						</div>
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.toggle') }}</label>
							</div>
							<div class="col-8">
								<div :class="$prefixClass.switch + '-group'"  >
									<a-switch :prefixCls="$prefixClass.switch" v-model="form.toggle"/> <label> {{ $t('theme_settings.disable_notify') }}</label>
								</div>
							</div>
						</div>
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.color_selection') }}</label>
							</div>
							<div class="group col-8">
								<div class="col-4">
									<label>{{ $t('theme_settings.text') }}</label>
									<vue-colorpicker v-model="form.color1" class="m-t-8"></vue-colorpicker>
								</div>
								<div class="col-4">
									<label>{{ $t('theme_settings.background') }}</label>
									<vue-colorpicker v-model="form.color2" class="m-t-8"></vue-colorpicker>
								</div>
								<div class="col-4">
									<label>{{ $t('theme_settings.border') }}</label>
									<vue-colorpicker v-model="form.color3" class="m-t-8"></vue-colorpicker>
								</div>
							</div>
						</div>
						<div class="row m-b-40" :class="$prefixClass.form + '-item'">
							<div class="col-4">
								<label>{{ $t('theme_settings.icon_selection') }}</label>
							</div>
							<div class="group col-8">
								<div class="col-4">
									<a-select 
										:prefixCls="$prefixClass.select" 
										defaultValue="star" 
										style="width: 100%" 
										:class="$prefixClass.select + '-icon'" 
										:dropdownClassName="$prefixClass.select + '-dropdown-icon'"
										v-model="form.selectIcon"
									>
										<i class="fas fa-chevron-down" slot="suffixIcon"></i>
										<a-select-option value="star"><i class="fas fa-star"></i></a-select-option>
										<a-select-option value="heart"><i class="fas fa-heart"></i></a-select-option>
										<a-select-option value="grin-hearts" ><i class="fas fa-grin-hearts"></i></a-select-option>
										<a-select-option value="bell"><i class="fas fa-bell"></i></a-select-option>
										<a-select-option value="thumbs-up"><i class="fas fa-thumbs-up"></i></a-select-option>
										<a-select-option value="badge-dollar"><i class="fas fa-badge-dollar"></i></a-select-option>
									</a-select>
								</div>
								<div class="col-8"></div>
							</div>
						</div>
						<div class="text-right" v-if="isModify">
							<a-button type="secondary" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('theme_settings.buttons.cancel') }}</a-button>&nbsp;
							<a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('theme_settings.buttons.save') }}</a-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="theme-preview m-l-30">
			<h5 class="m-b-15">{{ $t('theme_settings.preview') }}</h5>
			<div :class="['theme-preview__content', $prefixClass.card + '-stroke']">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'ThemeSettings',
	metaInfo: {
		title: 'Theme Settings'
	},
	data(){
		return {
			value: 'a',
			form: {
				valueRadio: 'a',
				checkbox: {
					check1: false,
					check2: false,
					check3: false,
					check4: false,
					check5: false,
					check6: false
				},
				text: '',
				textarea: '',
				select: 'jack',
				toggle: false,
				color1: '#000',
				color2: '#000',
				color3: '#000',
				selectIcon: 'star'
			},
			isModify: false,
			typeTopBar: 'unsaved'
		}
	},
	watch:{
		'form': {
			handler(val){
				this.isModify = true
				this.typeTopBar = 'unsaved'
			},
			deep: true
		}
	},
	beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
	},
	methods: {
		onSave(){
			this.typeTopBar = 'saving'
			setTimeout(() => {
				this.typeTopBar = 'save'
			}, 2000)
			setTimeout(() => {
				this.isModify = false
			}, 3000)
		},
		onCancel(){
			this.isModify = false
		},
		onChange(){

		},
		handleChange(){

		}
	}
}
</script>

<style lang="scss">
	.theme{
		&-settings{
			flex: 5;
			&-wrapper{
				display: flex;
			}
			&__content{
				padding: 32px;
			}
			&__custom{
				.group{
					display: flex;
					> div{
						padding: 0;
						padding-right: 16px;
						> label{
						color: #000000;
						font-weight: normal;
						}
					}
					
				}
			}
		}
		&-preview{
			display: flex;
    		flex-direction: column;
			margin-left: 20px;
			flex: 3;
			&__content{
				background: $white-color;
				flex: 1;
			}
		}
		
	}
</style>


