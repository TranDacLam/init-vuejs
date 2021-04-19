<template>
    <div class="function-settings">

        <vue-app-bar 
			:visible="isModify" 
			:type="typeTopBar"
			@onSave="onSave"
			@onCancel="onCancel"
		></vue-app-bar >

        <div class="function-settings__content m-b-32">
            <a-tabs 
                :prefixCls="$prefixClass.tabs"  
                :activeKey="activeKey"
                @change="changeTab"
            >
                <a-tab-pane tab="Import Settings" key="1">
                    <div class="import-settings-container">
                        <h5>Import Settings</h5>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="Theme Settings" key="2" forceRender>
                    <div class="theme-settings-container">
                        <a-collapse 
                            :prefixCls="$prefixClass.collapse" 
                            defaultActiveKey="1" 
                            :bordered="false" 
                            :class="$prefixClass.collapse + '-order'"
                        >
                            <a-collapse-panel  key="3" class="m-b-20">
                                <template slot="header">
                                    <div>
                                        <div>
                                            <span class="">1</span>
                                            <strong>Setting 1</strong>
                                        </div>
                                        <a-button :class="$prefixClass.collapse + '-btn-reset'">Reset</a-button>
                                    </div>
                                </template>
                                <p>{{text}}</p>
                            </a-collapse-panel>
                            <a-collapse-panel  key="2" class="m-b-20">
                                <template slot="header">
                                    <div>
                                        <div>
                                            <span class="">
                                                <i class="fas fa-check"></i>
                                            </span>
                                            <strong>Setting 2</strong>
                                        </div>
                                        <a-button :class="$prefixClass.collapse + '-btn-reset'">Reset</a-button>
                                    </div>
                                </template>
                                <div class="general-settings-container">
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Radio selection</label>
                                        </div>
                                        <div class="col-9">
                                             <a-radio-group v-model="form.valueRadio" class="row">
                                                <a-radio value="a" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option A
                                                </a-radio>
                                                <a-radio value="b" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option B
                                                </a-radio>
                                                <a-radio value="c" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option C
                                                </a-radio>
                                                <a-radio value="d" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option D
                                                </a-radio>
                                                <a-radio value="e" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option E
                                                </a-radio>
                                                <a-radio value="f" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option F
                                                </a-radio>
                                            </a-radio-group>
                                        </div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Checkbox selection</label>
                                        </div>
                                        <div class="col-9">
                                            <div class="row">
                                                <a-checkbox v-model="form.checkbox.check1" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option A</a-checkbox>
                                                <a-checkbox v-model="form.checkbox.check2" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option B</a-checkbox>
                                                <a-checkbox v-model="form.checkbox.check3" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option C</a-checkbox>
                                                <a-checkbox v-model="form.checkbox.check4" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option D</a-checkbox>
                                                <a-checkbox v-model="form.checkbox.check5" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option E</a-checkbox>
                                                <a-checkbox v-model="form.checkbox.check6" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option F</a-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Text field</label>
                                        </div>
                                        <div class="col-5">
                                            <a-input placeholder="Enter text..." v-model="form.text"></a-input>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Dropdown selection</label>
                                        </div>
                                        <div class="col-5">
                                            <a-select :prefixCls="$prefixClass.select" defaultValue="Select" v-model="form.selection" style="width: 100%">
                                                <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                                                <a-select-option value="jack">Jack</a-select-option>
                                                <a-select-option value="lucy">Lucy</a-select-option>
                                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                                            </a-select>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <label>Toggle</label>
                                        </div>
                                        <div class="col-5">
                                           <div :class="$prefixClass.switch + '-group'"  >
                                                <a-switch :prefixCls="$prefixClass.switch" v-model="form.toggle"/> <label>Disable notifications</label>
                                            </div>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                </div>
                            </a-collapse-panel>
                            <a-collapse-panel key="1">
                                <template slot="header">
                                    <div>
                                        <div>
                                            <span class="">3</span>
                                            <strong>Setting 3</strong>
                                        </div>
                                        <a-button :class="$prefixClass.collapse + '-btn-reset'">Reset</a-button>
                                    </div>
                                </template>
                                <div class="general-settings-container">
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Radio selection</label>
                                        </div>
                                        <div class="col-9">
                                             <a-radio-group v-model="form2.valueRadio" class="row">
                                                <a-radio value="a" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option A
                                                </a-radio>
                                                <a-radio value="b" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option B
                                                </a-radio>
                                                <a-radio value="c" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option C
                                                </a-radio>
                                                <a-radio value="d" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option D
                                                </a-radio>
                                                <a-radio value="e" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option E
                                                </a-radio>
                                                <a-radio value="f" :class="[$prefixClass.radio + '-group', 'col-4 m-r-0 m-b-24']">
                                                    Option F
                                                </a-radio>
                                            </a-radio-group>
                                        </div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Checkbox selection</label>
                                        </div>
                                        <div class="col-9">
                                            <div class="row">
                                                <a-checkbox v-model="form2.checkbox.check1" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option A</a-checkbox>
                                                <a-checkbox v-model="form2.checkbox.check2" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option B</a-checkbox>
                                                <a-checkbox v-model="form2.checkbox.check3" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option C</a-checkbox>
                                                <a-checkbox v-model="form2.checkbox.check4" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option D</a-checkbox>
                                                <a-checkbox v-model="form2.checkbox.check5" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option E</a-checkbox>
                                                <a-checkbox v-model="form2.checkbox.check6" :class="[$prefixClass.checkbox + '-group', 'col-4 m-b-24']">Option F</a-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Text field</label>
                                        </div>
                                        <div class="col-5">
                                            <a-input placeholder="Enter text..." v-model="form2.text"></a-input>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                    <div class="row m-b-32">
                                        <div class="col-3">
                                            <label>Dropdown selection</label>
                                        </div>
                                        <div class="col-5">
                                            <a-select :prefixCls="$prefixClass.select" defaultValue="Select" v-model="form2.selection" style="width: 100%">
                                                <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                                                <a-select-option value="jack">Jack</a-select-option>
                                                <a-select-option value="lucy">Lucy</a-select-option>
                                                <a-select-option value="disabled" disabled>Disabled</a-select-option>
                                                <a-select-option value="Yiminghe">yiminghe</a-select-option>
                                            </a-select>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-3">
                                            <label>Toggle</label>
                                        </div>
                                        <div class="col-5">
                                           <div :class="$prefixClass.switch + '-group'"  >
                                                <a-switch :prefixCls="$prefixClass.switch" v-model="form2.toggle"/> <label>Disable notifications</label>
                                            </div>
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                </div>
                            </a-collapse-panel>
                        </a-collapse>
                    </div>
                </a-tab-pane>
                <a-tab-pane tab="Email Settings" key="3">
                    <div class="email-settings-container">
                        <h5>Email Settings</h5>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="function-settings__btn" v-if="isModify">
            <a-button class="m-r-8" @click="onCancel" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">Cancel</a-button>
            <a-button type="primary" @click="onSave" :disabled="typeTopBar == 'saving' || typeTopBar == 'save'">Save</a-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FunctionSettings',
    metaInfo: {
		title: 'Settings'
	},
    data(){
        return{
            text: 'A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.',
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
				selection: 'jack',
				toggle: false
            },
            form2: {
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
            typeTopBar: 'unsaved',
            activeKey: '2'
        }
    },
    watch:{
		'form': {
			handler(val){
				this.isModify = true
				this.typeTopBar = 'unsaved'
			},
			deep: true
        },
        'form2': {
			handler(val){
				this.isModify = true
				this.typeTopBar = 'unsaved'
			},
			deep: true
		}
	},
    mounted(){

    },
    beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
	},
    methods:{
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
        changeTab(key){
            if( this.isModify ){
                this.$confirm({
                    title: (confirm && confirm.title) || this.$t('app.confirm.change_setting.title'),
                    content: (confirm && confirm.content) || this.$t('app.confirm.change_setting.content'),
                    okText : (confirm &&confirm.okText) || this.$t('app.confirm.change_setting.ok_text'),
                    cancelText : (confirm &&confirm.cancelText) || this.$t('app.confirm.change_setting.cancel_text'),
                    okType: (confirm && confirm.okType) || 'danger',
                    okButtonProps: {class: `${this.$prefixClass.btn} ${this.$prefixClass.btn}-primary`},
                    cancelButtonProps: {class: `${this.$prefixClass.btn}`},
                    zIndex : (confirm &&confirm.zIndex) || 10002,
                    closable: true,
                    prefixCls: this.$prefixClass.modal,
                    onOk : ()=>{
                        this.activeKey = key
                        this.isModify = false
                    },
                    onCancel :()=>{
                        
                    }
                })
            }else{
                this.activeKey = key
            }
        }
    }
}
</script>
<style lang="scss">
    .function-settings{
        &__content{
            .ant{
                &-tabs{
                    background: none; 
                }
                &-collapse{
                    background: none;
                    &-item{
                        background: $white-color;
                    }
                    &-content-box{
                        padding: 34px 32px !important; 
                    }
                }
                &-btn{
                    background: none !important;
                    color: $white-color;
                }
            }
        }
        &__btn{
            text-align: right;
        }
    }
</style>