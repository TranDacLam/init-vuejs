<template>
    <div class="charge">
        <div class="d-flex justify-content-center" v-if="plans">
            <t-pricing-plan
                v-if="!isLoading"
                :stickyPosition="stickyPosition"
                :collapsedScrollPosition="0"
                :plans="plans"
                :container="getContainer"
                @lets-chat="onLetsChat()"
            >
                <template slot="header">
                    <div v-if="isChoosePlan">
                        <h4>Choose your plan</h4>
                        <!-- <span class="badge-header a-badge a-badge-outline" style="background-color: rgb(220, 229, 244);">You'll get a 30-day free trial</span> -->
                    </div>
                    <div v-else class="text-left">
                        <h4>Pricing</h4>
                    </div>
                </template>

                <img slot="image__free" width="56" src="./../assets/free.svg" />
                <img slot="image__starter" src="./../assets/starter.svg" class="icon-starter" />
                <img slot="image__essential" src="./../assets/essential.svg" class="icon-starter" />

                <div slot="below_title__free" class="badge-trial-day-free"></div>
                <a-badge
                    slot="below_title__starter"
                    :class="[$prefixClass.badge + '-outline', listFeatures.starter.is_hightlighted ? 'active' : '' , 'badge-trial-day']"
                >{{trial && trial.trial_days || 0}}-day free</a-badge>
                <a-badge
                    slot="below_title__essential"
                    :class="[$prefixClass.badge + '-outline', listFeatures.essential.is_hightlighted ? 'active' : '', 'badge-trial-day' ]"
                >{{trial && trial.trial_days || 0}}-day free</a-badge>

                <template slot="i_have_voucher__free">
                    <div></div>
                </template>
                <template slot="i_have_voucher__starter">
                    <div></div>
                    <!-- <div v-if="store.app_plan == 'starter'"></div>
                    <a class="btn-add-discount-code a-link" v-else>I have a voucher</a>-->
                </template>
                <template slot="i_have_voucher__essential">
                    <div></div>
                    <!-- <div v-if="store.app_plan == 'essential'"></div>
                    <a class="btn-add-discount-code a-link" v-else>I have a voucher</a>-->
                </template>

                <form slot="submit_button__free">
                    <a-button
                        v-if="store.app_plan == 'free'"
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                    >You are here</a-button>
                    <a-button
                        v-else
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                        @click="onCharge('free', true)"
                    >Let's Go</a-button>
                </form>
                <form slot="submit_button__starter">
                    <a-button
                        v-if="store.app_plan == 'starter'"
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                    >You are here</a-button>
                    <a-button
                        v-else
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                        @click="onCharge('starter', false)"
                    >Let's Go</a-button>
                </form>
                <form slot="submit_button__essential">
                    <a-button
                        v-if="store.app_plan == 'essential'"
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                    >You are here</a-button>
                    <a-button
                        v-else
                        type="primary"
                        size="large"
                        ghost
                        class="submit-button"
                        @click="onCharge('essential', false)"
                    >Let's Go</a-button>
                </form>

                <div slot="list_func__free">
                    <!-- <div
                        :class="['card-plan card-plan--free', plans.free.is_hightlighted ? 'active' : '']"
                    >
                        <span>Start credits</span>
                        <b class="fw-600">${{plans.free.start_credit}}</b>
                    </div> -->
                    <section class="custom_css_pricing_section">
                        <pricing-plan-features :features="listFeatures.free.list_title" />
                    </section>
                </div>
                <div slot="list_func__starter">
                    <!-- <div
                        :class="['card-plan card-plan--starter', listFeatures.starter.is_hightlighted ? 'active' : '']"
                    >
                        <div class="m-b-16">
                            <span>Start credits</span>
                            <b class="fw-600">${{plans.starter.start_credit}}</b>
                        </div>
                        <div>
                            <span>Bonus credits on top-up</span>
                            <b class="fw-600">{{plans.starter.bonus_credit_purchase}}%</b>
                        </div>
                    </div> -->
                    <section class="custom_css_pricing_section">
                        <pricing-plan-features
                            everything_in_plan="FREE PLAN"
                            :features="listFeatures.starter.list_title"
                        />
                    </section>
                </div>
                <div slot="list_func__essential">
                    <!-- <div
                        :class="['card-plan card-plan--essential', listFeatures.essential.is_hightlighted ? 'active' : '']"
                    >
                        <div class="m-b-16">
                            <span>Start credits</span>
                            <b class="fw-600">${{plans.essential.start_credit}}</b>
                        </div>
                        <div>
                            <span>Bonus credits on top-up</span>
                            <b class="fw-600">{{plans.essential.bonus_credit_purchase}}%</b>
                        </div>
                    </div>
                    <section class="custom_css_pricing_section"> -->
                        <pricing-plan-features
                            everything_in_plan="STARTER PLAN"
                            upcoming_tools="More upcoming tools"
                            :features="listFeatures.essential.list_title"
                        />
                    </section>
                </div>
            </t-pricing-plan>
        </div>

        <vue-modal v-model="chargeModal.isVisible" :header="false" :footer="false" width="auto">
            <t-pricing-plan-modal
                v-if="chargeModal.type == 'trial'"
                type="trial_end"
                title="Speed up your business"
                :features="listFeaturesTrial"
                get_essential_plan_text="Get Starter Plan"
                continue_starter_plan_text="Continue with Free Plan"
                @onPlan="onCharge('starter', true)"
                @onContinue="onCharge('free', true)"
            >
                <a-badge
                    slot="badge"
                    :class="$prefixClass.badge + '-outline'"
                    style="background: #f0f4f8; border-color:#d9e2ec;color:#829ab1;"
                >Free trial has ended</a-badge>
                <p slot="description">
                    For just
                    <strong>$10</strong> more you'll unlock:
                </p>
            </t-pricing-plan-modal>

            <t-pricing-plan-modal
                v-else
                type="upgrade"
                title="Full speed ahead"
                :features="listFeaturesUpgrade"
                get_essential_plan_text="Get Essential Plan"
                continue_starter_plan_text="Continue with Starter Plan"
                @onPlan="onCharge('essential', true)"
                @onContinue="onCharge('starter', true)"
            >
                <a-badge
                    slot="badge"
                    :class="$prefixClass.badge + '-outline'"
                    style="background:#dce5f4;"
                >30-day free trial</a-badge>
                <p slot="description">
                    For just
                    <strong>$10</strong> more you'll unlock:
                </p>
            </t-pricing-plan-modal>
        </vue-modal>

        <vue-modal
            v-model="confirm.isVisible"
            :header="false"
            :footer="false"
            :closable="true"
            @on-hide="onConfirmL"
        >
            <div class="confirm-downgrade-modal">
                <div class="confirm-downgrade-modal__content">
                    <i class="fad fa-exclamation-circle"></i>
                    <h4>Downgrade to Free Plan?</h4>
                </div>
                <div class="confirm-downgrade-modal__footer">
                    <a-button type="secondary" class="m-r-8" @click="onConfirmL">Cancel</a-button>
                    <a-button type="danger" @click="onConfirmR">Downgrade</a-button>
                </div>
            </div>
        </vue-modal>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

const SMS_CHARGE_MODAL = "origin_charge_modal";

export default {
    name: "Charge",
    props: {
        elementScroll: {
            type: String,
            default: ".app-layout__body"
        },
        stickyPosition: {
            type: Number,
            default: 64
        },
        isChoosePlan: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            chargeModal: {
                isVisible: false,
                type: "trial"
            },
            confirm: {
                isVisible: false
            },
            listFeaturesTrial: [
                { text: "Advanced automated campaign settings" },
                { text: "Extensive message and delivery options" },
                { text: "Lorem ipsum dolor sit amet" }
            ],
            listFeaturesUpgrade: [
                { text: "Tag/untag contacts in automated campaigns" },
                { text: "Mark contacts as followers in automated campaigns" }
            ],
            listFeatures: {
                free: {
                    order_number: 1,
                    is_hightlighted: false,
                    list_title: {
                        standard_campaigns: {
                            name: "Standard campaigns",
                            description:
                                "Schedule a one-time text message to a target audience"
                            // "image": "processed.jpeg",
                        },
                        automated_campaigns: {
                            name: "Automated campaigns",
                            description:
                                "Set up automation flows to send text messages based on triggers and conditions"
                        },
                        automation_library: {
                            name: "Automation library",
                            description:
                                "A list of handy automated campaign templates to help you get started quickly"
                        },
                        campaign_management: {
                            name: "Campaign management",
                            description:
                                "All your text marketing campaigns in one place for easy management"
                        },
                        statistics_and_reports: {
                            name: "Statistics and reports",
                            description:
                                "Track campaign performance, cost, and revenue"
                        }
                    }
                },
                starter: {
                    order_number: 2,
                    is_hightlighted: true,
                    list_title: {
                        "more_automated _campaigns_triggers": {
                            name: "More automated campaigns triggers",
                            description:
                                "Engage more customers with additional automated campaign triggers"
                            // "image": "/images/no-img-product.png",
                        },
                        larger_automation_library: {
                            name: "Larger automation library",
                            description:
                                "Product interest follow-up, review request message, disengaging followers detection, audience filtering, and many more to come"
                        },
                        extensive_audience_targeting: {
                            name: "Extensive audience targeting",
                            description:
                                "Filter, target, and retarget specific customers with advanced behaviors and attributes"
                        },
                        advanced_shortcodes: {
                            name: "Advanced shortcodes",
                            description:
                                "Include dynamic order information, abandoned cart links, and abandoned checkout links in your messages"
                        },
                        advanced_campaign_actions: {
                            name: "Advanced campaign actions",
                            description:
                                "Use If/Else or Split Test for more complex automated campaign flows"
                        },
                        additional_message_properties: {
                            name: "Additional message properties",
                            description:
                                "Attach images, shorten links, add discount code, add UTM tags for Google Analytics, and measure your message strength"
                        },
                        smart_message_delivery_options: {
                            name: "Smart message delivery options",
                            description:
                                "Include brand name and use message break for more compelling campaigns"
                        },
                        campaign_comparison: {
                            name: "Campaign comparison",
                            description:
                                "Side-by-side comparison of revenue, cost, and overall performance between multiple campaigns"
                        }
                    }
                },
                essential: {
                    order_number: 3,
                    is_hightlighted: false,
                    list_title: {
                        automated_contact_tagging: {
                            name: "Automated contact tagging",
                            description:
                                "Tag and untag contacts in your automated campaigns for filtering and tracking"
                            // "image": "processed.jpeg",
                        },
                        automated_contact_follow_unfollow: {
                            name: "Automated contact follow/unfollow",
                            description:
                                "Mark contacts as followers or non-followers in your automated campaigns"
                            // "image": "processed.jpeg",
                        }
                    }
                }
            },
            isLoading: false,
            htmlElement: null,
            isDisable: false
        };
    },
    computed: {
        ...mapGetters({
            plans : 'charge/getPlans',
			store: 'auth/getStore',
			trial: 'charge/getTrial',
        }),
        hanldeDiscountType() {
            if (this.voucher.discountType == "amount") {
                return "$";
            }
            return "%";
        }
    },
    created() {
        this.getTrial();
        if (!this.plans) {
            this.getPlans().then(res => {
                let { status = false, data = {} } = res.data;
                if (status) {
                    this.setPropertyPlan();
                }
            });
        } else {
            this.setPropertyPlan();
        }
    },
    methods: {
        ...mapActions({
            toggleIntercom: 'auth/toggleIntercom',
            getStore: 'auth/getStore',
            getPlans : 'charge/getPlans',
            getTrial: 'charge/getTrial',
            checkDiscount: 'charge/checkDiscount',
            created: 'charge/createDiscount',
            handleChargePlan: 'charge/handleChargePlan',
        }),
        setPropertyPlan() {
            this.$set(this.plans.free, "order_number", 1);
            this.$set(this.plans.free, "is_hightlighted", false);
            this.$set(this.plans.starter, "order_number", 2);
            this.$set(this.plans.starter, "is_hightlighted", true);
            this.$set(this.plans.essential, "order_number", 3);
            this.$set(this.plans.essential, "is_hightlighted", false);
        },
        getContainer() {
            return document.querySelector(this.elementScroll);
        },
        onCharge(plan, isModal) {
            this.isDisable = true;
            localStorage.setItem("old-plan", this.store.app_plan);
            
            if (
                this.planNotAllowMinxin({isTest: this.store.is_test, shopifyPlan: this.store.shopify_plan}) &&
                (plan == "starter" || plan == "essential")
            ) {
                this.toastWarning({
                    title: "Warning",
                    message: "Upgrade to Shopify paid plan to get this plan"
                });
                this.isDisable = false;
                return;
            }
            if (isModal && !this.isChoosePlan && plan == "free") {
                this.confirm.isVisible = true;
                return;
            }
            // if(!isModal && !sessionStorage.getItem(SMS_CHARGE_MODAL)){
            //     sessionStorage.setItem(SMS_CHARGE_MODAL, true)
            //     this.chargeModal.type = plan == 'free' ? 'trial' : 'upgrade'
            //     this.chargeModal.isVisible = true
            //     return
            // }
            this.handleChargePlan({ "plan-name": plan }).then(res => {
                let { status = false, data = null } = res.data;
                if (status) {
                    if (data) {
                        window.location.href = data.redirect_url;
                    } else {
                        if (this.isChoosePlan) {
                            this.$router.push({
                                name: this.$routerName.DASHBOARD
                            });
                            return;
                        }
                        this.getStore();
                    }
                }
                this.isDisable = false;
            });
        },
        onLetsChat() {
            this.toggleIntercom();
        },
        onContinueModal() {
            this.chargeModal.isVisible = false;
        },
        onConfirmR() {
            this.onCharge("free", false);
            this.confirm.isVisible = false;
        },
        onConfirmL() {
            this.confirm.isVisible = false;
            this.isDisable = false;
        }
    }
};
</script>

<style lang="scss">
.charge {
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
    .#{$modal} {
        &-body {
            padding: 0;
        }
    }
    .confirm-downgrade-modal {
        padding: 24px;
        &__content {
            text-align: center;
            margin-top: 8px;
            i {
                font-size: 48px;
                color: $warning-color;
                opacity: 0.5;
            }
            h4 {
                margin-top: 16px;
                margin-bottom: 24px;
            }
        }
        &__footer {
            padding-top: 32px;
            margin-bottom: 8px;
            text-align: center;
        }
    }
    .pricing-plan {
        &__header {
            padding-top: 32px;
        }
    }
    .badge-trial-day {
        margin-bottom: 16px;
        &:not(.active) {
            background-color: $primary-light !important;
        }
        &.active {
            background-color: transparent !important;
            color: #fff;
            border-color: #fff;
        }
        &-free {
            height: 38px;
        }
    }
}
</style>