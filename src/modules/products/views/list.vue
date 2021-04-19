<template>
    <div>
        <div :class="[$prefixClass.listProducts+'__title']">
            <h5 class="m-b-20">{{ $t('products.name') }}</h5>
            <router-link :to="{name: $routerName.ADD_PRODUCT}">
                <a-button type="primary" v-if="statusLoading == 'exist_data'">{{ $t('products.buttons.add_product') }}</a-button>
            </router-link>
        </div>
        <div :class="[$prefixClass.listProducts+'__actions']" class="m-b-15">
            <a-button type="subtle" class="m-r-8" :class="$prefixClass.btn + '-subtle-secondary'"><i class="far fa-file-import m-r-5"></i>{{ $t('products.import') }}</a-button>
            <a-button type="subtle" class="m-r-8" :class="$prefixClass.btn + '-subtle-secondary'"><i class="far fa-file-export m-r-5"></i>{{ $t('products.export') }}</a-button>
            <a-dropdown :prefixCls="$prefixClass.dropdown" :trigger="['click']">
                <a-button type="subtle" class="m-r-40" :class="$prefixClass.btn + '-subtle-secondary'">{{ $t('orders.more_action') }}<i class="fas fa-chevron-down m-l-3"></i></a-button>
                <a-menu :prefixCls="$prefixClass.menu" slot="overlay">
                    <a-menu-item key="1">Action 1</a-menu-item>
                    <a-menu-item key="2">Action 2</a-menu-item>
                    <a-menu-item key="3">Action 3</a-menu-item>
                    <a-menu-item key="4">Action 4</a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        <template v-if="statusLoading == 'first_time'">
            <vue-loading :loading="true" />
        </template>
        <template v-else-if="statusLoading == 'no_data'">
            <vue-list-no-data
                :textBtn="$t('products.buttons.add_product')"
                v-bind:onClick="onClickCreateProduct"
            >
                <template slot="title">{{$t('products.no_data.title')}}</template>
                <template slot="description">{{$t('products.no_data.desc')}}</template>
            </vue-list-no-data>
        </template>
        <template v-else>
            <div :class="[$prefixClass.listProducts]">
                <a-tabs :prefixCls="$prefixClass.tabs" defaultActiveKey="1" :class="$prefixClass.tabs + '-border'">
                    <a-tab-pane tab="All" key="1">
                        <a-table 
                            :prefixCls="$prefixClass.table"
                            :columns="columns"
                            :dataSource="listProducts"
                            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, columnWidth: '5%'}"
                            :showHeader="(selectedRowKeys.length > 0) ? false : true"
                            :rowKey="record => record.id"
                            :pagination="false"
                            :loading="isLoading"
                            :rowClassName="() => { return $prefixClass.rowProduct}"
                            :class="[$prefixClass.listProduct, totalPage > 1 ? '' : 'm-table-border-bottom-none']"
                        >
                            <template slot="image" slot-scope="text"> 
                                <img class="a-product-thumbnail a-product-thumbnail-md" :src="text || imageDefault()" alt="" />
                            </template>
                            <template slot="name" slot-scope="text, record">
                                <router-link :to="{name: $routerName.UPDATE_PRODUCT, params: {product_id: record.id}}"
                                >{{record.title}}</router-link>
                            </template>
                            <template slot="instock" slot-scope="text, record">
                                {{ $t('products.instock_for_variants', {instock: getInstock(record.variants), variants: record.variants.length}) }}
                            </template>
                            <template slot="type" slot-scope="text, record">
                                {{ getTypes(record.collections) }}
                            </template>
                            <template slot="store">
                                {{store.name}}
                            </template>
                            <template slot="title">
                                <search-custom-products
                                    :keyword="customSearch.keyword"
                                    @input="onKeyword"
                                >
                                </search-custom-products>
                                <div class="bulk-actions" v-if="selectedRowKeys.length > 0">
                                    <span class="m-r-24">
                                        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onChangeChecked">
                                        </a-checkbox>
                                        <span>{{ $t('products.count_selected', {number: selectedRowKeys.length}) }}</span>
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
                                <vue-table-empty v-if="listProducts.length <= 0">
                                    <template slot="description">
                                        {{$t('products.not_find')}}
                                    </template>
                                    <template slot="info">
                                        {{$t('products.info_empty')}}
                                    </template>
                                </vue-table-empty>
                                <vue-pagination :pageRange="3" v-model="customSearch.page" :total="totalPage"></vue-pagination>
                            </template>
                        </a-table>
                    </a-tab-pane>
                </a-tabs>
            </div>
        </template>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import sizeLodash from 'lodash/size'
import SearchCustomProducts from './../components/SearchCustom'

export default {
    name: 'ProductsList',
    metaInfo: {
		title: 'Products'
    },
    components:{
        SearchCustomProducts
    },
    data(){
        return {
            columns:[
                {
                    title: this.$t('products.title.orders'),
                    dataIndex: 'image',
                    scopedSlots: { customRender: 'image' },
                    width: '8%',
                    align: 'center'
                },
                {
                    title: '',
                    dataIndex: 'title',
                    scopedSlots: { customRender: 'name' },
                    width: '40%'
                },
                {
                    title: this.$t('products.title.inventory'),
                    dataIndex: 'instock',
                    scopedSlots: { customRender: 'instock' },
                    width: '20%'
                },
                {
                    title: this.$t('products.title.type'),
                    dataIndex: 'type',
                    scopedSlots: { customRender: 'type' },
                    width: '15%'
                },
                {
                    title: this.$t('products.title.vendor'),
                    dataIndex: 'store',
                    scopedSlots: { customRender: 'store' },
                    width: '15%'
                }
            ],
            isLoading: false,
            customSearch: {
				keyword: '',
                page: 1
			},
            listProducts: [],
            totalPage: 0,
            numberSelected: 0,
            statusLoading: 'first_time',
            indeterminate: false,
            checkAll: false,
            selectedRowKeys: [],
            listRowKeys: []
        }
    },
    computed:{
        ...mapGetters({
			'store' : 'auth/getStore'
		})
    },
    async created(){
        let query = this.$route.query
        await this.getList(query)
        if(sizeLodash(query) > 0 || this.listProducts.length > 0){
			this.statusLoading = 'exist_data'
		}else{
			this.statusLoading = 'no_data'
		}
    },
    mounted(){
    },
    async beforeRouteUpdate(to, from, next) {
		try {
			await this.getList(to.query);
		} catch (e) {
			
		} finally {
			next();
		}
	},
    methods:{
        ...mapActions({
            'getProducts':  'products/getProducts'
        }),
        async getList(route){
            this.isLoading = true
            if( !route ){
				route = this.$route
            }
            let query = this.getQuery(route)
            let { 
				page = 1, 
				keyword = '', 
			} = query
            this.customSearch.keyword = keyword
            this.customSearch.page = page
            await this.getProducts({page, keyword}).then(res => {
                let { status = false, data = [] } = res.data
                this.resetSelected()
				if( status){
                    this.listProducts = data.data
                    this.customSearch.page = data.current_page
                    this.totalPage = data.last_page
                    let listRowKeys = []
                    this.listProducts.length > 0 && this.listProducts.forEach(function(product){
                        listRowKeys.push(product.id)
                    })
                    this.listRowKeys = listRowKeys
                }else{
                    this.listProducts = []
                }
                this.isLoading = false
			}).catch((e) => {
                console.log(e)
            }) 
        },
        getTypes(collections){
            let types = []
            collections.length && collections.forEach(function(product){
                types.push((product.title) ? product.title: '');
            })
            return types.join(', ')
        },
        getInstock(variants){
            let instock = 0
            variants.length && variants.forEach(function(product){
                instock += Number(product.inventory_quantity) ? Number(product.inventory_quantity) : 0
            })
            return instock
        },
        getQuery(query){
            let result = {}
			if (query.page && this.$helper.isNumeric(query.page)) {
				result['page'] = query.page
			}
			if (query.keyword) {
				result['keyword'] = query.keyword
			}
			return result
        },
        setQuery(query) {
			this.pushRouterLinkDefault({
				name: this.$routerName.LIST_PRODUCTS,
				query: query
			});
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
        },
        onClickCreateProduct(){
            this.$router.push({ name: this.$routerName.ADD_PRODUCT })
		}
    }
}
</script>

<style lang="scss">
    .#{$organism}-list-products{
        min-width: 960px;
        background-color: $white-color;
        border-radius: $border-radius;
        &__title{
            display: flex;
            justify-content: space-between;
        }
        .#{$table}{
            &-tbody {
                border-top: 1px solid $line-color;
                > tr > td {
                    padding-top: 12px;
                    padding-bottom: 12px;
                }
                > tr > td:nth-child(3){
                    a{
                        margin-right: 70px;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                   
                }
               
            }
            &-title{
                display: block;
            }
        }
        .#{$pagination}{
            margin: 30px auto;
        }
        .bulk-actions{
            padding-left: 24px;
            padding-right: 24px;
            margin-top: 24px;
        }
    }
</style>