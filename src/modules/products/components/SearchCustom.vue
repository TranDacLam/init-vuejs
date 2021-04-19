<template>
    <div class="search-custom-products p-l-25 p-r-25">
        <div class="search-custom-products__filter">    
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
    </div>
</template>
<script>
export default {
    name: 'SearchCustomProducts',
    props:{
        keyword: String
    },
    methods:{
        onSearch(event){
            this.$emit('input', event)
        }
    }
}
</script>
<style lang="scss">
    .search-custom-products{
        .#{$atom}-search{
            input {
                border-bottom-left-radius: 0;
                border-top-left-radius: 0;
            }
        }
    }

</style>