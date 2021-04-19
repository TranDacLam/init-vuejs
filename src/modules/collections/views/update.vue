<template>
	<div class="update-collection-wrapper">
		<div class="update-collection">
            <router-link :to="{name: $routerName.LIST_COLLECTIONS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left"></i>Back to Collection list</router-link>
            <h5 class="m-b-16">{{ $t('collections.update_collection') }}</h5>
            <div class="update-collection__content">
                <template v-if="isLoading">
                    <vue-loading :loading="true" />
                </template>
                <template v-else>
                    <transition name="fade-in" mode="out-in">
                        <form-collection
                            v-model="form"
                            mode="update"
                            :is-modify.sync="isModify"
                        >
                        </form-collection>
                    </transition>
                </template>
            </div>
	    </div>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import FormCollection from './../components/Form'

export default {
    name: 'UpdateCollection',
    metaInfo: {
		title: 'Update Collection',
	},
	data(){
		return {
            form: {
                id: '',
				title: '',
                body_html:'',
                image: [],
                collection_type : '',
			},
            isModify: false,
            isLoading: true
		}
    },
    components: {
        FormCollection
    },
    beforeRouteLeave (to, from, next) {
		if( this.isModify ){
			this.confirmBeforeRouteLeave({next})
		}else{
			next()
		}
    },
    async created(){
        let id = this.$route.params && this.$route.params.id ? this.$route.params.id : ''
		try {
            let res = await this.getCollection(id)
            let { status, data } = res.data
            if(status){
                this.convertData(data)
            }
		} catch (err) {
			console.log(err)
		} finally{
            this.isLoading = false
        }
    },
    methods: {
        ...mapActions({
            getCollection: 'collections/getCollection'
        }),
        convertData(data){
			let _this = this
			let {
                id = '',
                title = '',
                body_html ='',
                image = '',
                collection_type = '',
            } = data
            _this.form.id = id
            _this.form.title = title
            if(image){
                _this.form.image.push({src: image})
            }
            _this.form.body_html = body_html
            _this.form.collection_type  = collection_type
		},
    }
}
</script>

<style lang="scss">
    .update-collection{
        max-width: 720px;
        margin: auto;
        &__overview{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__address{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__notes{
            padding: 24px 40px;
            margin-bottom: 24px;
        }
        &__tags{
            padding: 24px 40px;
        }
    }
</style>