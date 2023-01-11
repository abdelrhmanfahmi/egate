<template>
    <div class="product-silder specialOffers">
        <!-- if no data  -->
        <div class="container">
            <div class="bestDeals">
                <span class="product-info">
                    <h4 class="top-header">{{ $t("home.monthlyOffers") }}</h4>
                </span>
                <div class="tabs-holder">
                    <b-tabs content-class="mt-3">
                        <b-tab title="buy 1 get 1 deal" active>
                            <div class="d-flex justify-content-end">
                                <router-link to="/monthly-offers" class="showAllLink">
                                    {{ $t('home.showAll') }}
                                </router-link>
                            </div>
                            <VueSlickCarousel v-bind="settings" class="my-5">
                                <div v-for="(x, index) in 6" :key="index">
                                    <div class="logo-holder">
                                        <img src="@/assets/images/logo.png" alt="logo" />
                                    </div>
                                </div>
                            </VueSlickCarousel>
                        </b-tab>
                        <b-tab title="daily offers">
                            <div class="d-flex justify-content-end">
                                <router-link to="/monthly-offers" class="showAllLink">
                                    {{ $t('home.showAll') }}
                                </router-link>
                            </div>
                            <VueSlickCarousel v-bind="settings" class="my-5">
                                <div v-for="(x, index) in 6" :key="index">
                                    <div class="logo-holder">
                                        <img src="@/assets/images/logo.png" alt="logo" />
                                    </div>
                                </div>
                            </VueSlickCarousel>
                        </b-tab>
                        <b-tab title="monthly offers">
                            <div class="d-flex justify-content-end">
                                <router-link to="/monthly-offers" class="showAllLink">
                                    {{ $t('home.showAll') }}
                                </router-link>
                            </div>
                            <VueSlickCarousel v-bind="settings" class="my-5">
                                <div v-for="(x, index) in 6" :key="index">
                                    <div class="logo-holder">
                                        <img src="@/assets/images/logo.png" alt="logo" />
                                    </div>
                                </div>
                            </VueSlickCarousel>
                        </b-tab>
                        <b-tab title="basket deals">
                            <div class="d-flex justify-content-end">
                                <router-link to="/monthly-offers" class="showAllLink">
                                    {{ $t('home.showAll') }}
                                </router-link>
                            </div>
                            <VueSlickCarousel v-bind="settings" class="my-5">
                                <div v-for="(x, index) in 6" :key="index">
                                    <div class="logo-holder">
                                        <img src="@/assets/images/logo.png" alt="logo" />
                                    </div>
                                </div>
                            </VueSlickCarousel>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
export default {
    components: {
        VueSlickCarousel,
    },
    data() {
        return {
            settings: {
                dots: true,
                infinite: true,
                arrows: true,
                speed: 500,
                slidesToShow: 6,
                slidesToScroll: 1,
                swipeToSlide: true,
                autoplay: true,

                responsive: [
                    {
                        breakpoint: 1191,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            arrows: true,
                        },
                    },
                    {
                        breakpoint: 820,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: true,
                            dots: true,
                        },
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: true,
                            dots: true,
                        },
                    },
                ],
            },
        };
    },
    methods: {
        /**
         * @vuese
         *  get Suppliers
         */
    },
    created() {

    },
    mounted() {

    },
    computed: {
        /**
         *  check if slider has data
         */

    },
};
</script>

<style lang="scss" scoped>
.specialOffers {
    text-align: center;

    .tabs {
        padding: 20px 0;

        .nav-tabs {
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
}
</style>
