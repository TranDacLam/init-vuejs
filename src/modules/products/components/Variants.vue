<template>
    <div :class="$prefixClass.variants">
        <div :class="$prefixClass.variants+'__content'">
            <template v-if="tags.length > 0">
                <div :class="[$prefixClass.variants+'__tag', 'm-r-4']" v-for="(tag, index) in tags" :key="index">
                    <span class="m-r-8">{{tag}}</span>
                    <i class="far fa-times" @click="removeTag(tag)"></i>
                </div>
            </template>
            <a-input :class="tags.length > 0 ? 'active' : ''" v-model="tagName" @keyup.enter="createTags" :placeholder=" (tags.length > 0) ? '' : 'Separate options with a comma'"/>
        </div>
        <transition name="fade-in" mode="out-in">
            <div v-if="error.isError" class="form-error">
                {{ $t('errors.invalid_option', {option: error.option}) }}
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'AVariants',
    props: {
        value: {
            type: Array,
            default: () => []
        }
    },
    data(){
        return {
            error: {
                isError: false,
                option: ''
            },
            tagName: ''
        }
    },
    computed:{
        tags: {
            get(){
                return this.value
            },
            set(value){
                this.$emit('input', value)
            }
        }
    },
    methods: {
        createTags($event){
            this.error = {isError: false, option: ''}
            let tag = this.tags.filter(item => item == this.tagName)
            if ( tag.length > 0 ) {
                this.error.isError = true
                this.error.option = this.tagName
            } else {
                this.tags.push(this.tagName) 
                this.$emit('onGenerateVariants', '')
                this.tagName = ''
            }  
        },
        removeTag(value){
            this.tags =  this.tags.filter(item => item != value)
            this.$emit('onGenerateVariants', '')
        }
    }
}
</script>
<style lang="scss">
    .#{$variants} {
        &__content{
            padding: 4px;
            border-radius: $border-radius;
            border: 1px solid $line-color;
            flex-flow: row wrap;
            display: flex;
            input {
                width: 100%;
                height: 22px;
                outline: none;
                border: 0;
                &.active {
                    padding: 0;
                }
            }
        }
        &__tag{
            padding: 2px 8px;
            margin-bottom: 5px;
            color: $white-color;
            background-color: $text-color-secondary;
            display: flex;
            border-radius: $border-radius;
            align-items: center;
            height: 22px;
            span {
                font-size: 11px;
                font-weight: 600;
            }
            .fa-times {
                font-size: 14px;
                font-weight: 300;
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

</style>