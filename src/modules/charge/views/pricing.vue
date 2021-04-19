<template>
    <div class="pricing-app">
        <charge></charge>
    </div>
</template>

<script>
import Charge from "./../components/charge";
import { mapGetters } from "vuex";

export default {
    name: "Pricing",
    metaInfo: {
        title: "Pricing",
        style: [
            {
                cssText: `.app-layout__content { padding-top: 0 !important; } .app-layout__body { overflow-y: auto; }`,
                type: "text/css",
            },
        ],
    },
    components: {
        Charge,
    },
    computed: {
        ...mapGetters({
            store: 'auth/getStore',
        }),
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            let label = localStorage.getItem("old-plan");
            console.log(label)
            if (label !== null && to.query.type === "3") {
                console.log('hello')
                label =
                    label === "free"
                        ? "Upgrade"
                        : vm.store.app_plan === "essential"
                        ? "Upgrade"
                        : "Downgrade";
                localStorage.removeItem("old-plan");
            }
        });
    },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style lang="scss">
.pricing-app {
    .card-plan {
        background-color: $background-color;
        border-radius: 8px;
        margin-bottom: 42px;
        &--free {
            margin-bottom: 88px;
            margin-top: 24px;
            padding: 8px 24px;
            display: flex;
            justify-content: space-between;
        }
        &--starter {
            padding: 16px 24px;
            > div {
                display: flex;
                justify-content: space-between;
            }
        }
        &--essential {
            padding: 16px 24px;
            > div {
                display: flex;
                justify-content: space-between;
            }
        }
        &.active {
            background-color: $white-color;
            b {
                color: $primary-color;
            }
        }
    }
}
</style>