<template>
    <div class="search-custom-customers d-flex justify-content-between w-100 p-l-24 p-r-24">
        <div :class="$prefixClass.search+'-custom__filter'">    
            <div :class="[$prefixClass.inputPrependSelect]">
                <a-select :prefixCls="$prefixClass.select" defaultValue="Filter">
                    <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                    <a-menu-item :key="1" value="1">Filter 1</a-menu-item>
                    <a-menu-item :key="2" value="2">Filter 2</a-menu-item>
                    <a-menu-item :key="3" value="3">Filter 3</a-menu-item>
                </a-select>
                <vue-search :value="keyword" @input="onSearch"></vue-search>
            </div>
        </div>
        <div>
            <span class="fw-600 m-r-8">{{ $t('collections.filter.sort_by') }}</span>
            <a-select :prefixCls="$prefixClass.select" :value="orderType" style="width: 120px" @change="onSort">
                <i class="fas fa-chevron-down" slot="suffixIcon"></i>
                <a-select-option value="desc">A-Z</a-select-option>
                <a-select-option value="asc" >Z-A</a-select-option>
            </a-select>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SearchCustomCustomers',
    props:{
        keyword: String,
        orderType: String
    },
    methods:{
        onSearch(event){
            this.$emit('input', event)
        },
        onSort(value){
            this.$emit('onSort', value)
        }
    }
}
</script>

<style lang="scss">
    .search-custom-customers{
        .#{$atom}-search{
            input {
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
            }
        }
    }

</style>