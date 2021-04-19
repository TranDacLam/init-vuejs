<template>
	<div :class="$prefixClass.listOrders">
		<div class="d-flex justify-content-between m-b-20">
            <h5>{{ $t('orders.name') }}</h5>
			<router-link :to="{name: $routerName.FUNCTION_CREATE}" :class="[$prefixClass.btn, $prefixClass.btn + '-primary']" v-if="statusLoading == 'exist_data'">{{ $t('orders.create_order') }}</router-link>
        </div>
        <div class="m-b-15">
			<a-button type="subtle" class="m-r-8" :class="$prefixClass.btn + '-subtle-secondary'"><i class="far fa-file-export m-r-3"></i> {{ $t('orders.export') }}</a-button>
            <a-dropdown :prefixCls="$prefixClass.dropdown" :trigger="['click']">
				<a-button type="subtle" class="m-r-8" :class="$prefixClass.btn + '-subtle-secondary'">{{ $t('orders.more_action') }}<i class="fas fa-chevron-down m-l-3"></i></a-button>
                <a-menu :prefixCls="$prefixClass.menu" slot="overlay">
					<a-menu-item key="1" @click="onClickAction">{{ $t('orders.import') }}</a-menu-item>
					<a-menu-item key="2" @click="onClickAction">{{ $t('orders.publish') }}</a-menu-item>
					<a-menu-item key="3" @click="onClickAction">{{ $t('orders.unpublish') }}</a-menu-item>
					<a-menu-item key="4" @click="onClickAction">{{ $t('orders.delete') }}</a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>

		<template v-if="statusLoading == 'first_time'">
			<vue-loading :loading="true" />
		</template>
		<template v-else-if="statusLoading == 'no_data'">
			<vue-list-no-data
				:textBtn="$t('orders.button.create_order')"
				v-bind:onClick="() => $router.push({name: $routerName.FUNCTION_CREATE})"
			>
				<template slot="title">{{$t('orders.no_data.title')}}</template>
				<template slot="description">{{$t('orders.no_data.desc')}}</template>
			</vue-list-no-data>
		</template>
		<template v-else>
        	<a-tabs :prefixCls="$prefixClass.tabs" defaultActiveKey="1" :class="[$prefixClass.tabs + '-border', $prefixClass.card + '-stroke']">
				<a-tab-pane tab="All" key="1">
					<a-table 
						:prefixCls="$prefixClass.table"
						:columns="columns" 
						:dataSource="listOrders" 
						:rowSelection="rowSelection"
						:rowKey="record => record.id"
						:pagination="false"
						:loading="isLoading"
						:rowClassName="() => { return $prefixClass.rowOrder}"
						:class="[$prefixClass.listOrder, totalPage > 1 ? '' : 'm-table-border-bottom-none']"
					>
						<template slot="order" slot-scope="text">
							<a href="javascript:;">{{text}}</a>
						</template>
						<template slot="date" slot-scope="text">
							{{ text | formatDate }}
						</template>
						<template slot="customer" slot-scope="text">
							{{ text && text.first_name }} {{ text && text.last_name }}
						</template>
						<template slot="financial_status" slot-scope="text">
							<vue-status
								:label="text || 'unpaid'"
								:type="text && text.toLowerCase() || 'unpaid'"
							></vue-status>
						</template>
						<template slot="fulfillment_status" slot-scope="text">
							<vue-status
								:label="text || 'unfulfilled'"
								:type="text && text.toLowerCase() || 'unfulfilled'"
							></vue-status>
						</template>
						<span slot="total_price" slot-scope="text, record">
							{{ text | money({currency: record.currency}) }}
						</span>
						<template slot="title">
							<search-custom-orders
								:search="customSearch.keyword"
								:paymentChecked="customSearch.paymentStatus"
								:fulfillmentChecked="customSearch.fulfillmentStatus"
								:statusChecked="customSearch.status"
								@onSearch="onKeyword"
								@onChange="onChangeSearchCustom"
							></search-custom-orders>
						</template>
						<template slot="footer">
							<vue-table-empty v-if="listOrders.length <= 0">
								<template slot="description">
									{{$t('orders.not_find')}}
								</template>
								<template slot="info">
									{{$t('orders.info_empty')}}
								</template>
							</vue-table-empty>
							<vue-pagination :pageRange="3" v-model="customSearch.page" :total="totalPage"></vue-pagination>
						</template>
					</a-table>
				</a-tab-pane>
            	<a-tab-pane tab="Open" key="2" >
					<a-table 
						:prefixCls="$prefixClass.table"
						:columns="columns" 
						:dataSource="listOrders" 
						:rowSelection="rowSelection"
						:rowKey="record => record.id"
						:pagination="false"
						:loading="isLoading"
						:rowClassName="() => { return $prefixClass.rowOrder}"
						:class="[$prefixClass.listOrder, totalPage > 1 ? '' : 'm-table-border-bottom-none']"
					>
						<template slot="order" slot-scope="text">
							<a href="javascript:;">{{text}}</a>
						</template>
						<template slot="date" slot-scope="text">
							{{ text | formatDate }}
						</template>
						<template slot="customer" slot-scope="text">
							{{ text && text.first_name }} {{ text && text.last_name }}
						</template>
						<template slot="financial_status" slot-scope="text">
							<vue-status
								:label="text || 'unpaid'"
								:type="text && text.toLowerCase() || 'unpaid'"
							></vue-status>
						</template>
						<template slot="fulfillment_status" slot-scope="text">
							<vue-status
								:label="text || 'unfulfilled'"
								:type="text && text.toLowerCase() || 'unfulfilled'"
							></vue-status>
						</template>
						<span slot="total_price" slot-scope="text, record">
							{{ text | money({currency: record.currency}) }}
						</span>
						<template slot="title">
							<search-custom-orders
								@onSearch="onKeyword"
							></search-custom-orders>
						</template>
						<template slot="footer">
							<vue-table-empty v-if="listOrders.length <= 0">
								<template slot="description">
									{{$t('orders.not_find')}}
								</template>
								<template slot="info">
									{{$t('orders.info_empty')}}
								</template>
							</vue-table-empty>
							<vue-pagination :pageRange="3" v-model="customSearch.page" :total="totalPage"></vue-pagination>
						</template>
					</a-table>
				</a-tab-pane>
				<a-tab-pane tab="Unfulfilled and partially fulfilled" key="3">
					<vue-tab-empty />
				</a-tab-pane>
				<a-tab-pane tab="Unpaid" key="4">
					<vue-tab-empty />
				</a-tab-pane>
			</a-tabs>
		</template>
        <br><br>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import sizeLodash from 'lodash/size'
import SearchCustomOrders from './../components/SearchCustomOrders'

export default {
	name : 'Table',
	metaInfo: {
		title: 'Table'
	},
	data(){
		return {
            columns:[
				{
					title: this.$t('orders.title.order'),
					dataIndex: 'name',
					scopedSlots: { customRender: 'order' },
				},
				{
					title: this.$t('orders.title.date'),
					dataIndex: 'created_at',
					scopedSlots: { customRender: 'date' },
				},
				{
					title: this.$t('orders.title.customer'),
					scopedSlots: { customRender: 'customer' },
					dataIndex: 'customer',
				},
				{
					title: this.$t('orders.title.payment'),
					scopedSlots: { customRender: 'financial_status' },
					dataIndex: 'financial_status',
				},
				{
					title: this.$t('orders.title.fulfillment'),
					scopedSlots: { customRender: 'fulfillment_status' },
					dataIndex: 'fulfillment_status',
				},
				{
					title: this.$t('orders.title.total'),
					scopedSlots: { customRender: 'total_price' },
					dataIndex: 'total_price',
				}
			],
            currentPageData: 1,
            selectedRowKeys: [],
			cancelRequest: null,
			isLoading: false,
			customSearch: {
				keyword: '',
				orderType: 'desc',
				order_by: '',
				page: 1,
				paymentStatus: [],
				fulfillmentStatus: [],
				status: ''
			},
			listOrders: [],
			totalPage: 0,
			statusLoading: 'first_time',
		}
	},
	components: {
		SearchCustomOrders
	},
    computed: {
        rowSelection() {
            const { selectedRowKeys } = this;
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                }
            }
        }
	},
	async created(){
		let query = this.$route.query
		await this.getList(query)
		if(sizeLodash(query) > 0 || this.listOrders.length > 0){
			this.statusLoading = 'exist_data'
		}else{
			this.statusLoading = 'no_data'
		}
	},
	async beforeRouteUpdate(to, from, next) {
		try {
			await this.getList(to.query);
		} catch (e) {
			
		} finally {
			next();
		}
	},
    methods: {
		...mapActions({
			'getOrders': 'orders/getOrders'
		}),
		async getList(route){
			this.isLoading = true
			if( !route ){
				route = this.$route.query 
			}
			if (this.cancelRequest) {
				this.cancelRequest.cancel('Start new request, stop active request');
			}
			this.cancelRequest = this.createAxiosCancelRequestToken()
			
			let query = this.getQuery(route)
			
			let { 
				page = 1, 
				keyword = '', 
				order_type = 'desc', 
				order_by = '',
				status = ''
			} = query
			let payment_status = query.payment_status ? query.payment_status.split(',') :  []
			let fulfillment_status = query.fulfillment_status ? query.fulfillment_status.split(',') :  []

			this.customSearch.orderType = order_type
			this.customSearch.page = page
			this.customSearch.keyword = keyword
			this.customSearch.orderBy = order_by
			this.customSearch.paymentStatus = payment_status
			this.customSearch.fulfillmentStatus = fulfillment_status
			this.customSearch.status = status

			await this.getOrders({page, keyword, order_by, order_type, payment_status, cancel_request_token : this.cancelRequest.token}).then(res => {
				let { status = false, data = null } = res.data
				if(status){
					this.listOrders = data.data
					this.totalPage = data.last_page
					this.customSearch.page = data.current_page 
				}else{
					this.listOrders = []
				}
				this.isLoading = false
			}).catch((e) => {
                console.log(e)
            }) 
		},
        onClickAction(){
			this.toastWarning({title:'The feature are improving' })
		},
		setQuery(query) {
			// var query = {}
			// this.customSearch.forEach((item) => {
			// 	if (object.hasOwnProperty(item)) {
			// 		query[item] = object[item]
			// 	}
			// })
			this.pushRouterLinkDefault({
				name: this.$routerName.FUNCTION_TABLE,
				query: query
			});
        },
        getQuery(query){
			let result = {}
			if (query.page && this.$helper.isNumeric(query.page)) {
				result['page'] = query.page
			}
			if (query.keyword) {
				result['keyword'] = query.keyword
			}
			if (query.order_type) {
				result['order_type'] = query.order_type
			} else {
				delete result['order_type']
			}
			if (query.order_by) {
				result['order_by'] = query.order_by
			} else {
				delete result['order_by']
			}
			if(query.payment_status){
				result['payment_status'] = query.payment_status
			}else{
				delete query['payment_status'] 
			}
			if(query.fulfillment_status){
				result['fulfillment_status'] = query.fulfillment_status
			}else{
				delete query['fulfillment_status'] 
			}
			if(query.status){
				result['status'] = query.status
			}else{
				delete query['status'] 
			}
			return result
        },
		onKeyword(event){
			this.customSearch.keyword = event
  			this.onChangeKeyword();
		},
		onChangeKeyword(){
			let query = this.getQuery(this.$route.query)
			let keyword = this.customSearch.keyword
			if( keyword ){
				query['keyword'] = keyword
			}else{
				delete query['keyword'] 
			}
			if (query.hasOwnProperty('page')) {
				delete query['page']
			}
			this.setQuery(query)
		},
		onChangeSearchCustom({type, value}){
			let query = this.getQuery(this.$route.query)
			if(type == 'payment'){
				if( value.length > 0 ){
					query['payment_status'] = value.join()
				}else{
					delete query['payment_status'] 
				}
			}
			if(type == 'fulfillment'){
				if( value.length ){
					query['fulfillment_status'] = value.join()
				}else{
					delete query['fulfillment_status'] 
				}
			}
			if(type == 'status'){
				if( value ){
					query['status'] = value
				}else{
					delete query['status'] 
				}
			}

			if(type == 'sort'){
				query['order_type'] = value
			}
			
			if (query.hasOwnProperty('page')) {
				delete query['page']
			}
			this.setQuery(query)
		},
		onClickCreateOrder(){
			console.log("create order")
		}
    }
}
</script>

<style lang="scss">
	.#{$organism}-list-orders{
		.#{$pagination}{
			margin-top: 30px;
    		margin-bottom: 30px;
		}
	}
</style>