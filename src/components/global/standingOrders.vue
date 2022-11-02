<template>
    <div>
        <p class="add-address" @click="showForm = !showForm">
            <span>+ </span>{{ $t('items.addNew') }}
        </p>
        <form @submit.prevent="addNewStandingOrder()" class="account-information-form" v-if="showForm">
            <b-row class="mb-3">
                <b-col lg="5">
                    <label for="">{{$t('cart.standQuantity')}}</label>
                    <b-form-input id="name" v-model="standingOrder.qty" />
                </b-col>
            </b-row>
            <b-row class="justify-content-center align-items-center">
                <!-- country  -->
                <b-col lg="5" class="mb-3">
                    <label>name</label>
                    <span class="requried">*</span>
                    <b-form-input id="name" v-model="standingOrder.name" />
                </b-col>
                <b-col lg="5">
                    <b-form-group>
                        <label>time</label>
                        <span class="requried">*</span>
                        <b-form-select v-model="standingOrder.time">
                            <b-form-select-option :value="null">Please select an option</b-form-select-option>
                            <b-form-select-option value="a">Option A</b-form-select-option>
                            <b-form-select-option value="b">Option B</b-form-select-option>
                            <b-form-select-option value="c">Option C</b-form-select-option>
                        </b-form-select>

                        <!-- <div class="mt-2">Selected: <strong>{{ standingOrder.time }}</strong></div> -->
                        <div class="error" v-for="(error, index) in errors.country_id" :key="index">
                            {{ error }}
                        </div>
                    </b-form-group>
                </b-col>
                <b-col lg="2">
                    <b-button type="submit" class="login-button ">
                        {{ $t("register.submit") }}
                    </b-button>
                </b-col>
                
            </b-row>
            


        </form>
        <div class="d-flex justify-content-center align-items-center">

            <hr class="w-75">
        </div>
        <div class="my-3">
            <p class="add-address">
                {{ $t('payment.selectExist') }}
            </p>
        </div>
        <div class="standing-orders">


            <div class="plans">
                <div class="row">
                    <div class="col-md-3 col-sm-12" v-for="(x, index) in 20" :key="index">
                        <label class="plan basic-plan">
                            <input type="radio" name="plan" :value="x" v-model="selectedPlan" />
                            <!-- <input type="radio" name="plan" :value="x" v-model="selectedPlan"
                                @input="planSelected(x)" /> -->
                            <div class="plan-content-holder">
                                <div class="plan-content">
                                    <!-- <router-link :to="{ path: '/SingleStandingOrder', query: { id: x } }"> -->
                                    <div class="b-box">
                                        <!-- <div class="icon"></div> -->
                                        <h4 class="title">
                                            <span>a - Maruszczak</span>
                                            <div class="row">
                                                <div class="col-12"><small>11 item(s)</small></div>
                                                <div class="col-12"><small>time</small></div>
                                            </div>
                                        </h4>
                                        <!-- <a href="#"></a> -->
                                    </div>
                                    <!-- </router-link> -->
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <div>
                    <b-button type="submit" class="login-button " @click="planSelected">
                        {{ $t("register.submit") }}
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import categories from "@/services/categories";
export default {
    data() {
        return {
            categories: null,
            showForm: false,
            standingOrder: {
                name: null,
                time: null,
                qty:1
            },
            errors: [],
            selectedPlan: null
        }
    },
    methods: {
        addNewStandingOrder() {
            console.log('clicked');
        },

        async getCategories() {
            await categories
                .getCategories("lists/categories")
                .then((resp) => {
                    this.categories = resp.data.items;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        planSelected() {
            setTimeout(() => {
                this.$router.push({
                    path: '/StandingOrder',
                    query: {
                        id: this.selectedPlan
                    }
                })
            }, 700);
        }
    },
    mounted() {
        this.getCategories();
    },
}
</script>

<style lang="scss" scoped>
.add-address {
    font-size: 17px;
    color: #312620;
    margin: 15px 0;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
        color: $main-color;
    }

    span {
        font-size: 23px;
        font-weight: 600;
    }
}

.login-button {
    margin: 0 !important;
    margin-top: 15px !important
}

.standing-orders {
    label {
        width: 100%
    }

    .b-box {
        margin-bottom: 10px;
        // width: 180px;
        background: #fff;
        border-radius: 4px;
        border: 1px solid #eee;
        padding: 20px;
        padding: 3rem 1rem 2rem;
        position: relative;
        border-radius: 6px;
        perspective: 600px;
        perspective-origin: center bottom;
        transition: 0.3s ease;

        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 6px;
            z-index: -1px;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0), 0 4px 4px rgba(0, 0, 0, 0), 0 8px 8px rgba(0, 0, 0, 0), 0 16px 16px rgba(0, 0, 0, 0), 0 32px 32px rgba(0, 0, 0, 0), 0 64px 64px rgba(0, 0, 0, 0), 0 128px 128px rgba(0, 0, 0, 0);
            transition: 0.7s ease;
            opacity: 0;
            pointer-events: none;
        }

        &:before {
            content: "";
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            height: 100%;
            background: #f3f4f7;
            transition: transform 0.7s cubic-bezier(0.18, 0.79, 0.25, 1) 0s, opacity 0.2s ease 0s;
            opacity: 0;
            transform-style: preserve-3d;
            border-radius: 6px;
            z-index: 1;
            transform-origin: 50% 50%;
            transform: scale(1, 0.7) rotateX(-20deg) translate3d(0, 30px, -85px);
            pointer-events: none;
        }

        a {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 3;
        }

        .icon {
            height: 60px;
            margin: 0 auto 1.5rem;
            position: relative;
            z-index: 2;
            transition: 0.3s ease;

            &:after {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background: #eee;
                border-radius: 50%;
                transition: 0.2s;
            }
        }

        .title {
            position: relative;
            z-index: 2;
            text-align: center;
            margin-bottom: 0;
            color: #555;
            line-height: 1.6;

            span {
                display: block;
                transition: transform 0.45s ease 0.2s, color 0.1s ease 0s;
            }

            small {
                display: block;
                opacity: 0.6;
                font-weight: normal;
                font-size: 0.7em;
                transition: transform 0.35s ease 0.1s, color 0.1s ease 0s;
            }
        }

        &:hover {
            transform: scale(1.08);

            &:after {
                box-shadow: 0 2px 2px rgba(50, 55, 60, 0.05), 0 4px 4px rgba(50, 55, 60, 0.05), 0 8px 8px rgba(50, 55, 60, 0.05), 0 16px 16px rgba(50, 55, 60, 0.05), 0 32px 32px rgba(50, 55, 60, 0.0375), 0 64px 64px rgba(50, 55, 60, 0.025), 0 128px 128px rgba(50, 55, 60, 0.025);
                opacity: 1;
            }

            &:before {
                transition: transform 0.45s cubic-bezier(0.18, 0.79, 0.25, 1) 0s, opacity 0.35s ease 0s;
                transform: scale(1, 1) rotateX(0deg) translate3d(0, 0, 0);
                opacity: 1;
            }

            .icon {
                transform: translateY(-10px) scale(1.12);

                &:after {
                    background: #ddd;
                }
            }

            .title {
                color: #0f6eca;

                span {
                    transform: translateY(-6px);
                }

                small {
                    transform: translateY(-10px);
                }
            }
        }
    }

    .plan-content {
        cursor: pointer;
    }

    .plans .plan input[type="radio"]:checked+.plan-content-holder>.plan-content>.b-box {

        border: 2px solid #216ee0;
        background: #eaf1fe;
        -webkit-transition: ease-in 0.1s;
        -o-transition: ease-in 0.1s;
        transition: ease-in 0.1s;


    }


    /* inspiration */
}

input[type="radio"],
input[type="checkbox"] {
    opacity: 0;
}
</style>
