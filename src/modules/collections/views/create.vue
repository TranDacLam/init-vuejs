<template>
	<div class="add-collection-wrapper">
		<div class="add-collection">
            <router-link :to="{name: $routerName.LIST_COLLECTIONS}" :class="[$prefixClass.link + '-nav', 'd-block m-b-8']"><i class="fas fa-chevron-left"></i>Back to Collection list</router-link>
            <h5 class="m-b-16">{{ $t('collections.add_collection') }}</h5>
            <div class="add-collection__content">
                <form-collection
                    v-model="form"
                    mode="create"
                    :is-modify.sync="isModify"
                >
                </form-collection>
            </div>
	    </div>
	</div>
</template>

<script>
import FormCollection from './../components/Form'

export default {
    name: 'CreateCollection',
    metaInfo: {
		title: 'Add Collection',
	},
	data(){
		return {
            form: {
				title: '',
                body_html: '',
                image: [],
                collection_type : '',
			},
            isModify: false
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
    }
}
</script>

<style lang="scss">
    .add-collection{
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