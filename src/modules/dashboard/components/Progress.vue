<template>
    <div :class="['m-progress', $prefixClass.card + '-stroke']">
        <div class="m-progress__header">
            <strong class="fz-16 f-w-600">{{ $t('dashboard.components.products_imported_reviews') }}</strong>
            <div class="m-progress__number">
                <span class="fz-14">800/10,000</span>
            </div>
        </div>
        <vue-progress-bar :percent="50">
            <template slot="titleOuter">
                {{ $t('dashboard.components.title_inner') }}
			</template>
			<template slot="titleInner">
				50%
			</template>
        </vue-progress-bar>
    </div>
</template>

<script>

export default {
    name: 'DashboardProgressItem',
    props: [
    ],
	data(){
		return {
			
		}
	}
}
</script>

<style lang="scss">
    .m-progress{
        padding: 32px 24px;
        display: block;
        &__header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        &__number{
            color: $text-color-secondary;
        }
    }
</style>