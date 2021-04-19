<template>
	<div class="account-settings-wrapper">

		<vue-app-bar 
			:visible="isModify" 
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		></vue-app-bar >
		
		<div class="account-settings">
			<h5 class="m-b-16">{{$t('account_settings.name')}}</h5>
			<div :class="['account-settings__content', $prefixClass.card + '-stroke']">
				<h6 class="m-b-24">{{$t('account_settings.account_information')}}</h6>
				<div>
					<!-- <div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">Avatar image</label>
						<div :class="[$prefixClass.col + '-18']">
							<div :class="[$prefixClass.avatar, 'm-b-16']">
								<img src="@/assets/images/avatar-default.png"/>
							</div>
							<div class="d-flex">
								<a-input placeholder="No file selectd" v-model="form.avatar" readonly/>
								<label for="upload-avatar" :class="['m-l-8 d-flex align-items-center', $prefixClass.btn, $prefixClass.btn + '-secondary']">
									Browse
								</label>
								<input id="upload-avatar" type="file" class="d-none" @change="onUploadAvatar"/>
							</div>
							<p class="color-secondary m-t-3 fz-11">Allowed Formats: jpeg, gif and png (maximum 5MB)</p>
						</div>
					</div> -->
					<div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{$t('account_settings.form.first_name')}}</label>
						<div :class="$prefixClass.col + '-18'">
							<a-input placeholder="Enter text..." v-model="form.first_name"/>
						</div>
					</div>
					<div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{$t('account_settings.form.last_name')}}</label>
						<div :class="$prefixClass.col + '-18'">
							<a-input placeholder="Enter text..." v-model="form.last_name"/>
						</div>
					</div>
					<div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{$t('account_settings.form.email_address')}}</label>
						<div :class="[$prefixClass.col + '-18', (formstate && (!$v.form.email.required || !$v.form.email.email) ? 'has-error' : '')]">
							<a-input placeholder="Enter text..." v-model="form.email"/>
							<transition name="fade-in" mode="out-in">
								<div  v-if="formstate && !$v.form.email.required" class="form-error">
									{{ $t('errors.required_field') }}
								</div>
								<div  v-else-if="formstate && !$v.form.email.email" class="form-error">
									{{ $t('errors.invalid_value') }}
								</div>
							</transition>
						</div>
					</div>
					<div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{$t('account_settings.form.time_zone')}}</label>
						<div :class="$prefixClass.col + '-18'">
							<a-select :prefixCls="$prefixClass.select" v-model="form.timezone" defaultValue="United States" style="width: 100%">
								<i class="fas fa-chevron-down" slot="suffixIcon"></i>
								<a-select-option v-for="tz in lisTimezone" :key="tz.tzName" :value="tz.tzName">
									{{tz.tzPresentationName}}
								</a-select-option>
							</a-select>
						</div>
					</div>
					<div :class="[$prefixClass.row, $prefixClass.form + '-item', 'm-b-24']">
						<label :class="[$prefixClass.label, $prefixClass.col + '-6']">{{$t('account_settings.form.store_currency')}}</label>
						<div :class="$prefixClass.col + '-18'">
							<a-input disabled :value="form.currency" style="width: 60px;" />
						</div>
					</div>
					<div :class="[$prefixClass.row]">
						<div :class="$prefixClass.col + '-6'">
						</div>
						<div :class="$prefixClass.col + '-18'" v-if="buttonTextOneSignal">
							<a-button :class="$prefixClass.btn + '-onesignal'" @click="onManageWebPushSubscriptionButtonClicked">{{buttonTextOneSignal}}</a-button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
	name : 'AccountSettings',
	metaInfo: {
		title: 'Account Settings',
	},
	data(){
		return {
			avatar: null,
			form: {
				first_name: '',
				last_name: '',
				email: '',
				timezone: '',
				currency: ''
			},
			isModify: false,
			typeTopBar: 'unsaved',
			lisTimezone: [],
			formstate: false,
			isDisabledSave: true,
			OneSignal: null,
			buttonTextOneSignal: ''
		}
	},
	validations: () => ({
		form: {
			email :{
				required,
				email
			}
		},
	}),
	beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
	},
	async created () {
		this.lisTimezone = this.$helper.getListTimezone()
		if(!this.accountSettings){
			await this.getAccountSettings().then(res => {
				let { status, data } = res.data
				if(status){
					this.convertData(data)
				}
			})
		}else{
			this.convertData(this.accountSettings)
		}
		this.$nextTick(()=>{
			this.isModify = false
			this.$watch('form' , {
				handler : function(){
					this.isModify = true
					this.typeTopBar = 'unsaved'
					// if(!this.$v.form.$invalid){
					// 	this.isDisabledSave = false
					// }else{
					// 	this.isDisabledSave = true
					// }
				},
				deep : true
			})
		})
	},
	mounted(){
		// this.callbackOneSignal()
		setTimeout(() => {
			this.onOneSignal()
		})
	},
	computed: {
		...mapGetters({
			'accountSettings' : 'accountSettings/getAccountSettings'
		})
	},
	methods:{
		...mapActions({
			'getAccountSettings' : 'accountSettings/getAccountSettings',
			'saveAccountSettings' : 'accountSettings/saveAccountSettings',
			'callbackOneSignal': 'callbackOneSignal',
		}),
		onUploadAvatar(e){
			let _this = this
			let files = e.target.files || e.dataTransfer.files
			if (!files.length)
				return
			let file =files[0]
			console.log("banner", file)
			let bytes = 1024 * 1024 * 5
			if(file.size > bytes){
				alert(`The image [${file.name}] must be under 5MB.`)
				return
			}
			if(!((/[\/.](gif|jpeg|jpg|png)$/i).test(file.type))){
				alert('Sorry, this file format is not supported. Only jpg, jpeg, png and gif are accepted.')
				return
			}
			let reader = new FileReader()
			// Response imgae base 64
			reader.onload = (e) => {
				// _this.base64 = e.target.result
				_this.avatar = file
			}
			reader.readAsDataURL(file)
		},
		async onSave(){
			this.formstate = true
			if(this.$v.form.$invalid){
				this.typeTopBar = 'error'
				return
			}
			this.typeTopBar = 'saving'
			let data = {
				first_name: this.form.first_name,
				last_name: this.form.last_name,
				email: this.form.email,
				currency: this.form.currency,
				timezone: this.form.timezone
			}
			this.saveAccountSettings(data).then(res => {
				let { status } = res.data
				if(status){
					this.typeTopBar = 'save'
					setTimeout(() => {
						this.isModify = false
					}, 2000)
				}else{
					this.typeTopBar = 'error'
				}
			}).catch((e) => {
				_this.typeTopBar = 'error'
			}) 
		},
		onCancel(){
			this.convertData(this.accountSettings)
			setTimeout(() => {
				this.isModify = false
			})
		},
		convertData(data){
			let _this = this
			let {
				first_name = '',
				last_name = '',
				email = '',
				currency = '',
				timezone = ''
			} = data
			_this.form.first_name = first_name
			_this.form.last_name = last_name
			_this.form.email = email
			_this.form.currency = currency
			_this.form.timezone = timezone
		},
		onOneSignal(){
			let _this = this
			_this.OneSignal = window.OneSignal || []

			_this.OneSignal.push(function() {
				if (!_this.OneSignal.isPushNotificationsSupported()) {
					return
				}
				_this.updateMangeWebPushSubscriptionButton()
				_this.OneSignal.on("subscriptionChange", function(isSubscribed) {
					/* If the user's subscription state changes during the page's session, update the button text */
					_this.updateMangeWebPushSubscriptionButton()
				})
			})
		},
		onManageWebPushSubscriptionButtonClicked(event) {
			let _this = this
			this.getSubscriptionState().then(function(state) {
				if (state.isPushEnabled) {
					/* Subscribed, opt them out */
					_this.OneSignal.setSubscription(false)
				} else {
					if (state.isOptedOut) {
						/* Opted out, opt them back in */
						_this.OneSignal.setSubscription(true)
					} else {
						/* Unsubscribed, subscribe them */
						_this.OneSignal.registerForPushNotifications()
					}
				}
			});
			event.preventDefault()
		},
		updateMangeWebPushSubscriptionButton() {
			let _this = this
			let subscribeText = 'Subscribe to Notifications'
			let unsubscribeText = 'Unsubscribe from Notifications'

			_this.getSubscriptionState().then(function(state) {
				_this.buttonTextOneSignal = !state.isPushEnabled || state.isOptedOut ? subscribeText : unsubscribeText
			})
		},
		getSubscriptionState() {
			let _this = this
			return Promise.all([
					_this.OneSignal.isPushNotificationsEnabled(),
					_this.OneSignal.isOptedOut()
				]).then(function(result) {
					var isPushEnabled = result[0]
					var isOptedOut = result[1]
					return {
						isPushEnabled: isPushEnabled,
						isOptedOut: isOptedOut
					}
				}
			)
		}
	}
}
</script>

<style lang="scss">
	.account-settings {
		max-width: 720px;
		
		margin: auto;
		&__content{
			padding: 24px 40px;
		}
	}
	.#{$btn}{
		&-onesignal{
			background-color: rgb(225, 45, 48);
    		color: rgb(255, 255, 255);
			&:hover{
				background-color: rgb(225, 45, 48);
				border-color: rgb(225, 45, 48);
				color: rgb(255, 255, 255);
				box-shadow: 2px 3px 4px grey;
			}
			&:focus{
				background-color: rgb(225, 45, 48);
				border-color: rgb(225, 45, 48);
				color: rgb(255, 255, 255);
			}
		}
	}
</style>