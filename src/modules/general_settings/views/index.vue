<template>
	<div class="general-settings-wrapper">
		<vue-app-bar
			:visible="isModify"
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		/>
		<div class="general-settings">
			<h5 class="m-b-15">{{ $t('general_settings.name') }}</h5>
			<div :class="['general-settings__content', $prefixClass.card + '-stroke']">
				<div class="general-settings__default m-b-32">
					<h6 class="m-b-25">{{ $t('general_settings.default_settings') }}</h6>
					<div class="">
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-3">
								<label>{{ $t('general_settings.radio_selection') }}</label>
							</div>
							<div class="col-9">
								<a-radio-group v-model="form.valueRadio" class="row">
									<a-radio value="a" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_a') }}
									</a-radio>
									<a-radio value="b":class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_b') }}
									</a-radio>
									<a-radio value="c" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_c') }}
									</a-radio>
									<a-radio value="d" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_d') }}
									</a-radio>
									<a-radio value="e" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_e') }}
									</a-radio>
									<a-radio value="f" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
										{{ $t('general_settings.option_f') }}
									</a-radio>
								</a-radio-group>
							</div>
						</div>
						<div class="row" :class="$prefixClass.form + '-item'">
							<div class="col-3">
								<label>{{ $t('general_settings.checkbox_selection') }}</label>
							</div>
							<div class="col-9">
								<div class="row">
									<a-checkbox v-model="form.checkbox.check1" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_a') }}</a-checkbox>
									<a-checkbox v-model="form.checkbox.check2" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_b') }}</a-checkbox>
									<a-checkbox v-model="form.checkbox.check3" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_c') }}</a-checkbox>
									<a-checkbox v-model="form.checkbox.check4" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_d') }}</a-checkbox>
									<a-checkbox v-model="form.checkbox.check5" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_e') }}</a-checkbox>
									<a-checkbox v-model="form.checkbox.check6" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">{{ $t('general_settings.option_f') }}</a-checkbox>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="general-settings__custom">
					<h6 class="m-b-25">{{ $t('general_settings.custom_settings') }}</h6>
					<div class="">
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-3">
								<label>{{ $t('general_settings.text_field') }}</label>
							</div>
							<div class="col-5">
								<a-input placeholder="Enter text..." v-model="form.text"></a-input>
							</div>
						</div>
						<div class="row m-b-32" :class="$prefixClass.form + '-item'">
							<div class="col-3">
								<label>{{ $t('general_settings.text_area') }}</label>
							</div>
							<div class="col-5">
								<a-textarea placeholder="Enter text..." :rows="5" v-model="form.textarea"></a-textarea>
							</div>
						</div>
						<div class="row m-b-32">
							<div class="col-3">
								<label>{{ $t('general_settings.dropdown_selection') }}</label>
							</div>
							<div class="col-5">
								<a-select :prefixCls="$prefixClass.select" defaultValue="Select" style="width: 100%" v-model="form.selection">
									<i class="fas fa-chevron-down" slot="suffixIcon"></i>
									<a-select-option value="jack">Jack</a-select-option>
									<a-select-option value="lucy">Lucy</a-select-option>
									<a-select-option value="disabled" disabled>Disabled</a-select-option>
									<a-select-option value="Yiminghe">yiminghe</a-select-option>
								</a-select>
							</div>
						</div>
						<div class="row" :class="$prefixClass.form + '-item'">
							<div class="col-3">
								<label>{{ $t('general_settings.toggle') }}</label>
							</div>
							<div class="col-5">
								<div :class="$prefixClass.switch + '-group'">
									<a-switch :prefixCls="$prefixClass.switch" v-model="form.toggle" /> <label>{{ $t('general_settings.disable_notify') }}</label>
								</div>
							</div>
						</div>
						<br>
						<transition name="fade-in" mode="out-in">
							<div class="text-right m-t-40" v-if="isModify">
								<a-button type="secondary" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('general_settings.buttons.cancel') }}</a-button>&nbsp;
								<a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">{{ $t('general_settings.buttons.save') }}</a-button>
							</div>
						</transition>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'GeneralSettings',
	metaInfo: {
		title: 'General Settings'
	},
	data(){
		return {
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
				selection: 'jack',
				toggle: false
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
	.general-settings{
		&__content{
			padding: 32px 80px;
		}
	}
</style>
