<template>
<div>
    <div :class="[$prefixClass.listCustomers+'__title']">
        <h5 class="m-b-20">{{$t('customers.name')}}</h5>
        <router-link :to="{name: $routerName.ADD_CUSTOMER}" :class="[$prefixClass.btn, $prefixClass.btn + '-primary']" v-if="statusLoading == 'exist_data'">{{ $t('customers.buttons.add_customer') }}</router-link>
    </div>
    <div :class="[$prefixClass.listCustomers+'__actions']" class="m-b-15">
        <a-button type="subtle" class="m-r-8" :class="$prefixClass.btn + '-subtle-secondary'"><i class="far fa-file-import m-r-5"></i>{{ $t('customers.import') }}</a-button>
        <a-button type="subtle" :class="$prefixClass.btn + '-subtle-secondary'"><i class="far fa-file-export m-r-5"></i>{{ $t('customers.export') }}</a-button>
    </div>
    <template v-if="statusLoading == 'first_time'">
            <vue-loading :loading="true" />
    </template>
    <template v-else-if="statusLoading == 'no_data'">
        <vue-list-no-data
            :textBtn="$t('customers.buttons.add_customer')"
            v-bind:onClick=" () => $router.push({name: $routerName.ADD_CUSTOMER})"
        >
            <template slot="title">{{$t('customers.no_data.title')}}</template>
            <template slot="description">{{$t('customers.no_data.desc')}}</template>
        </vue-list-no-data>
    </template>
    <template v-else>
        <div :class="[$prefixClass.listCustomers]">
            <a-tabs :prefixCls="$prefixClass.tabs" defaultActiveKey="1" :class="$prefixClass.tabs + '-border'">
                <a-tab-pane tab="All" key="1">
                    <a-table 
                        :prefixCls="$prefixClass.table"
                        :columns="columns"
                        :dataSource="listCustomers"
                        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, columnWidth: '5%'}"
                        :showHeader="(selectedRowKeys.length > 0) ? false : true"
                        :rowKey="record => record.id"
                        :pagination="false"
                        :loading="isLoading"
                        :rowClassName="() => { return $prefixClass.rowCustomer}"
                        :class="[$prefixClass.listCustomer, totalPage > 1 ? '' : 'm-table-border-bottom-none']"
                    >
                        <template slot="avatar" slot-scope="text">
                            <img :class="$prefixClass.avatarThumbnail" :src="text || avatarDefault()" alt=""/>
                        </template>
                        <template slot="name" slot-scope="text, record">
                            <router-link :to="{name: $routerName.UPDATE_CUSTOMER, params: {id: record.id}}" class="customers--name d-block">
                                {{ record && record.first_name }} {{ record && record.last_name }}
                            </router-link>
                            <span class="customers--country">{{ record.country_code }}</span>
                        </template>
                        <template slot="orders" slot-scope="text, record">
                            {{ record.orders.length }} {{ $t('orders.orders') }}
                        </template>
                        <template slot="total" slot-scope="text, record">
                            {{ record.total_spent | money({currency: record.currency})}} {{ $t('customers.spent') }}
                        </template>
                        <template slot="title">
                            <search-custom
                                :keyword="customSearch.keyword"
                                :orderType="customSearch.orderType"
                                @input="onKeyword"
                                @onSort="onSortBy"
                            >
                            </search-custom>
                            <div class="bulk-actions" v-if="selectedRowKeys.length > 0">
                                <span class="m-r-24">
                                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onChangeChecked">
                                    </a-checkbox>
                                    <span>{{selectedRowKeys.length}} {{ $t('collections.selected') }}</span>
                                </span>
                                <a-dropdown :prefixCls="$prefixClass.dropdown" :overlayClassName="$prefixClass.dropdown + '-default'">
                                    <a-menu :prefixCls="$prefixClass.menu" slot="overlay">
                                        <a-menu-item key="1">Make collections available</a-menu-item>
                                        <a-menu-item key="2">Make collections unavailable</a-menu-item>
                                        <a-menu-item key="3">UnpuDelete collectionsblish</a-menu-item>
                                    </a-menu>
                                    <a-button>{{$t('collections.bulk_action.name')}} <i class="fas fa-chevron-down m-l-15"></i> </a-button>
                                </a-dropdown>
                            </div>
                        </template>
                        <template slot="footer">
                            <vue-table-empty v-if="listCustomers.length <= 0">
                                <template slot="description">
                                    {{$t('customers.not_find')}}
                                </template>
                                <template slot="info">
                                    {{$t('customers.info_empty')}}
                                </template>
                            </vue-table-empty>
                            <vue-pagination :pageRange="3" v-model="customSearch.page" :total="totalPage"></vue-pagination>
                        </template>
                    </a-table> 
                </a-tab-pane>
                <a-tab-pane tab="New" key="2">
                    <vue-tab-empty />
                </a-tab-pane>
            </a-tabs>
        </div>
    </template>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import sizeLodash from 'lodash/size'
import SearchCustom from './../components/SearchCustom'

export default {
    name: 'CustomersList',
    metaInfo: {
		title: 'Customers'
    },
    components: {
        SearchCustom
    },
    data(){
        return {
            columns: [
                {
                    title: '',
                    dataIndex: 'avatar',
                    scopedSlots: { customRender: 'avatar' },
                    align: 'center',
                    width: '10%',
                },
                {
                    title: this.$t('customers.title.customer'),
                    dataIndex: 'name',
                    scopedSlots: { customRender: 'name' },
                    width: '50%',
                },
                {
                    title: this.$t('customers.title.orders_place'),
                    dataIndex: '',
                    scopedSlots: { customRender: 'orders' },
                    width: '15%',
                },
                {
                    title: this.$t('customers.title.total_spent'),
                    dataIndex: '',
                    scopedSlots: { customRender: 'total' },
                    width: '15%',
                }
            ],
            isLoading: false,
            customSearch:{
                orderType: 'desc',
                keyword: '',
                page: 1
            },
            listCustomers: [],
            totalPage: 0,
            statusLoading: 'first_time',
            indeterminate: false,
            checkAll: false,
            selectedRowKeys: [],
            listRowKeys: []
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
    async created(){
        let query = this.$route.query
        await this.getList(query)
        console.log(this.listCustomers)
        if(sizeLodash(query) > 0 || this.listCustomers.length > 0){
			this.statusLoading = 'exist_data'
		}else{
			this.statusLoading = 'no_data'
		}
    },
    methods:{
        ...mapActions({
            'getCustomers': 'customers/getCustomers'
        }),
        async getList(route){
            this.isLoading = true
            if( !route ){
                route = this.$route.query
            }
            let query = this.getQuery(route)
            let { 
				page = 1, 
				keyword = '', 
				order_type = 'desc', 
            } = query
            this.customSearch.keyword = keyword
            this.customSearch.orderType = order_type
            this.customSearch.page = page
            await this.getCustomers({page, keyword, order_type}).then(res => {
                let { status = false, data = [] } = res.data
                this.resetSelected()
				if( status ){
                    let listCustomers = data.data
                    this.customSearch.page = data.current_page
                    this.totalPage = data.last_page
                    listCustomers.length > 0 && listCustomers.forEach((customer) => {
                        customer.total_spent = 0;
                        this.listRowKeys.push(customer.id)
                        if(customer.orders && customer.orders.length){
                            customer.orders.forEach(function(order){
                                customer.total_spent += Number(order.total_price) ? Number(order.total_price) : 0
                                customer.currency = (order.currency && order.currency!=customer.currency) ? order.currency : customer.currency
                            })
                        }
                    })
                    this.listCustomers = listCustomers
				}else{
                    this.listCustomers = []
                }
                this.isLoading = false
			}).catch((e) => {
                console.log(e)
            }) 
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
			return result
        },
        setQuery(query) {
			this.pushRouterLinkDefault({
				name: this.$routerName.LIST_CUSTOMERS,
				query: query
			});
        },
        onSortBy(value){
            this.customSearch.orderType = value
            let query = this.getQuery(this.$route.query)
			if( value ){
				query['order_type'] = value
			}else{
				delete query['order_type'] 
			}
			this.setQuery(query)
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
        onSelectChange(selectedRowKeys){
            this.selectedRowKeys = selectedRowKeys;
            this.indeterminate = !!selectedRowKeys.length && selectedRowKeys.length < this.listRowKeys.length;
            this.checkAll = selectedRowKeys.length === this.listRowKeys.length;
        },
        onChangeChecked(e){
            if(e.target.checked){
                this.selectedRowKeys = this.$clone(this.listRowKeys)
                this.checkAll = e.target.checked
            }else{
                this.selectedRowKeys.splice(0, this.selectedRowKeys.length)
                this.checkAll = e.target.checked
            }
            this.indeterminate = false
        },
        resetSelected(){
            this.listRowKeys.splice(0, this.listRowKeys.length)
            this.selectedRowKeys.splice(0, this.selectedRowKeys.length)
            this.checkAll = false
            this.indeterminate = false
        }
    }
}
</script>

<style lang="scss">
    .#{$organism}-list-customers{
        background-color: $white-color;
        border-radius: $border-radius;
        &__title{
            display: flex;
            justify-content: space-between;
        }
        .#{$table}{
            &-tbody{
                border-top: 1px solid $line-color;
                > tr > td{
                    padding-top: 12px;
                    padding-bottom: 12px;
                }
                .customers{
                    &--name{
                        font-weight: 600;
                    }
                    &--country{
                        color: #8c8c8c;
                    }
                }
            }
            &-title{
                display: block;
            }
        }
        .#{$pagination}{
            margin: 30px 0;
        }
        .bulk-actions{
            padding-left: 24px;
            padding-right: 24px;
            margin-top: 24px;
        }
    }
</style>