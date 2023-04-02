<template>
    <div class="new-home-slider slider-wrapper mb-5">
        <!-- data comes from backend  -->
        <VueSlickCarousel v-bind="settings" v-if="images && images.length">
            <div v-for="(image, index) in images" :key="index" class="slider-holder">
                <!-- <router-link :to="`/`" class=""> -->
                    <div class="" v-if="image">
                        <b-img :src="image" class="slider-image" alt="slider image">
                        </b-img>
                    </div>
                <!-- </router-link> -->
            </div>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
    components: {
        VueSlickCarousel,
        // Countdown,
    },
    data() {
        return {
            settings: {
                dots: true,
                dotsClass: "slick-dots custom-dot-class",
                edgeFriction: 0.35,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                arrows:false
            },
            images: [
                'https://images.unsplash.com/photo-1590595978583-3967cf17d2ea?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
                'https://images.unsplash.com/photo-1588807308097-fb6e5047df8c?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
                'https://images.unsplash.com/photo-1589808710416-24cf7ac026f2?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',
                'https://images.unsplash.com/photo-1588796388882-a4d533c47e5e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ',

            ]
        };
    },
}
</script>

<style lang="scss" scoped>

.slider-holder {
    min-height: 500px;
    width: 100%;
    margin-bottom: 10px;

    img {
        height: 500px;
        width: 100%;
    }
}

</style>