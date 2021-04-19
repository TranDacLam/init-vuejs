<template>
	<div class="search-custom-orders p-l-25 p-r-25 w-100">
        <div class="d-flex justify-content-between">
            <div class="search-custom-orders__filter d-flex">
                <div :class="['d-flex',  $prefixClass.searchWDropdown]">
                    <a-dropdown 
                        :prefixCls="$prefixClass.dropdown" 
                        :trigger="['click']" 
                        :overlayClassName="$prefixClass.dropdown + '-default'" 
                        v-if="isActionStatus"
                    >
                        <a-menu :prefixCls="$prefixClass.menu" slot="overlay" @click="onChangeStatus">
                            <a-menu-item v-for="item in status.data" :key="item.value">{{item.label}}</a-menu-item>
                        </a-menu>
                        <a-button> {{ $t('orders.status') }} <i class="fas fa-chevron-down m-l-15"></i> </a-button>
                    </a-dropdown>
                    
                    <template v-if="isActionPaymentStatus">
                        <vue-multiselect-checkbox
                            textBtn="Payment status"
                            :data="payment.data"
                            :listChecked="payment.listChecked"
                            :isClearAll="true"
                            @onChange="onChangePayment"
                        >
                        </vue-multiselect-checkbox>
                    </template>

                    <template v-if="isActionFulfillment">
                        <vue-multiselect-checkbox
                            textBtn="Fulfillment"
                            :data="fulfillment.data"
                            :listChecked="fulfillment.listChecked"
                            :isClearAll="true"
                            @onChange="onChangeFulfillment"
                        >
                        </vue-multiselect-checkbox>
                    </template>

                    <vue-search :value="search" @input="onKeyword"></vue-search>
                </div>
            </div>
            <div class="search-custom-orders__sort">
                <span class="fw-600 m-r-8">{{ $t('orders.filter.sort_by') }}</span>
                <a-select :prefixCls="$prefixClass.select" defaultValue="asc" style="width: 120px" @change="onSortBy">
                    <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                    <a-select-option value="asc">ASC</a-select-option>
                    <a-select-option value="desc" >DESC</a-select-option>
                </a-select>
            </div>
        </div>
        <div class="search-custom-orders__status m-t-8 text-left">
            <a-tag closable class="p-r-0" @close="closeTag('status')" v-model="status.visibleTag" v-if="status.checked">{{this.status.checked}}</a-tag>
            <a-tag closable class="p-r-0" @close="closeTag('payment')" v-model="payment.visibleTag" v-if="payment.listChecked.length > 0">{{this.payment.listChecked.join(', ')}}</a-tag>
            <a-tag closable class="p-r-0" @close="closeTag('fulfillment')" v-model="fulfillment.visibleTag" v-if="fulfillment.listChecked.length > 0">{{this.fulfillment.listChecked.join(', ')}}</a-tag>
        </div>
	</div>
</template>

<script>

export default {
    name: 'SearchCustomOrders',
    props: {
        type: {
            type : String,
			default : 'primary'
        },
        isActionStatus: {
            type : Boolean,
			default : true
        },
        isActionPaymentStatus: {
            type : Boolean,
			default : true
        },
        isActionFulfillment: {
            type : Boolean,
			default : true
        },
        search: {
            type : String,
			default : ''
        },
        paymentChecked: {
            type : Array,
			default : () => []
        },
        fulfillmentChecked: {
            type : Array,
			default : () => []
        },
        statusChecked: {
            type : String,
			default : ''
        },
    },
	data(){
		return {
            payment: {
                visibleTag: true,
                listChecked: this.paymentChecked,
                data: [
                    { label: 'Paid', value: 'paid' },
                    { label: 'Unpaid', value: 'unpaid' },
                    { label: 'Partially refunded', value: 'partially_refunded' },
                    { label: 'Pending', value: 'pending' },
                ],
            },
            fulfillment: {
                visibleTag: true,
                listChecked: this.fulfillmentChecked,
                data: [
                    { label: 'Fulfillment', value: 'fulfillment' },
                    { label: 'Unfulfillment', value: 'unfulfillment' },
                    { label: 'Partially fulfilled', value: 'partially_fulfilled' }
                ],
            },
            status: {
                visibleTag: true,
                checked: this.statusChecked,
                data: [
                    { label: 'Open', value: 'open' },
                    { label: 'Archived', value: 'archived' },
                    { label: 'Canceled', value: 'canceled' }
                ],
            },
		}
	},
  	mounted() {
    },
    methods: {
        onSortBy(val){
            this.$emit('onChange', {type: 'sort', value: val})
        },
        onKeyword(event){
            this.$emit('onSearch', event)
        },
        onChangePayment(list){
            this.payment.listChecked = list
            if(this.payment.listChecked.length > 0){
                this.payment.visibleTag = true
            }else{
                this.payment.visibleTag = false
            }
            this.$emit('onChange', {type: 'payment', value: this.payment.listChecked})
        },
        onChangeFulfillment(list){
            this.fulfillment.listChecked = list
            if(this.fulfillment.listChecked.length > 0){
                this.fulfillment.visibleTag = true
            }else{
                this.fulfillment.visibleTag = false
            }
            this.$emit('onChange', {type: 'fulfillment', value: this.fulfillment.listChecked})
        },
        onChangeStatus(event){
            this.status.checked = event.key
            this.status.visibleTag = true
            this.$emit('onChange', {type: 'status', value: this.status.checked})
        },
        closeTag(type){
            if(type == 'payment'){
                this.payment.visibleTag = false
                this.payment.listChecked.splice(0, this.payment.listChecked.length)
                this.$emit('onChange', {type, value: []})
            }else if(type == 'fulfillment'){
                this.fulfillment.visibleTag = false
                this.fulfillment.listChecked.splice(0, this.fulfillment.listChecked.length)
                this.$emit('onChange', {type, value: []})
            }else if(type == 'status'){
                this.status.visibleTag = false
                this.status.checked = ''
                this.$emit('onChange', {type, value: ''})
            }
        }
    }
}
</script>

<style lang="scss" >
	.search-custom-orders{
		&__filter{
            
        }
	}
</style>