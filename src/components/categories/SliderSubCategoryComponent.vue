<template>
    <div class="subcategories">
        <v-container>
            <swiper :modules="modules" v-bind="options" class="mySwiper">
                <swiper-slide v-for="(subCategory , index) in subCategories" :key="index">
                    <img
                        :src="subCategory.image"
                        :lazy-src="subCategory.image"
                        class="borderCssImage"
                    />
                    <br>
                    <p class="text-center">{{ subCategory.title }}</p>
                </swiper-slide>
            </swiper>
        </v-container>
    </div>
</template>

<script>
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

export default{
    setup() {
        return {
            modules: [Navigation, Autoplay],
        };
    },
    data(){
        return {
            modules: [ Navigation ],
            options: {
                slidesPerView: 6,
                spaceBetween: 50,
                activeIndex:1,
                navigation: true,
                loop: true,
                pagination: {
                    clickable: true,
                },
                centeredSlides: true,
                speed: 300,
                direction: "horizontal",
                zoom: true,
                autoplay: {
                    delay: 5000,
                },
                fadeEffect: {
                    crossFade: true,
                },
            },
            subCategories:[
                {
                    image: 'https://drive.google.com/uc?id=1-qzpXz-6SaqM3IPlQl_d9YXaPaBPw1xi',
                    title: 'Frozen Food'
                },
                {
                    image: 'https://drive.google.com/uc?id=1GyPJxF36hlp2JS7SeYrnW0Bmuc9KJyBq',
                    title: 'Beverages'
                },
                {
                    image: 'https://drive.google.com/uc?id=1MIbogRkUdngQXnaXT8Mufup-7CScTNRj',
                    title: 'Bakery'
                },
                {
                    image: 'https://drive.google.com/uc?id=1a_w8OcDV-IA5UMz7usKtO_lXf0YSee3u',
                    title: 'Food Cupboard'
                },
                {
                    image: 'https://drive.google.com/uc?id=1gLp3gryMbGYpgAfAtnDGccME1lCzEyUU',
                    title: 'Cleaning'
                },
                {
                    image: 'https://drive.google.com/uc?id=1MIbogRkUdngQXnaXT8Mufup-7CScTNRj',
                    title: 'Fresh Food'
                },
                {
                    image: 'https://drive.google.com/uc?id=1-qzpXz-6SaqM3IPlQl_d9YXaPaBPw1xi',
                    title: 'Spare Parts'
                },
                {
                    image: 'https://drive.google.com/uc?id=1a_w8OcDV-IA5UMz7usKtO_lXf0YSee3u',
                    title: 'Bakery'
                },
                {
                    image: 'https://drive.google.com/uc?id=1GyPJxF36hlp2JS7SeYrnW0Bmuc9KJyBq',
                    title: 'Beverages'
                },
                {
                    image: 'https://drive.google.com/uc?id=1GyPJxF36hlp2JS7SeYrnW0Bmuc9KJyBq',
                    title: 'Beverages'
                },
                {
                    image: 'https://drive.google.com/uc?id=1GyPJxF36hlp2JS7SeYrnW0Bmuc9KJyBq',
                    title: 'Beverages'
                },
                {
                    image: 'https://drive.google.com/uc?id=1GyPJxF36hlp2JS7SeYrnW0Bmuc9KJyBq',
                    title: 'Beverages'
                },
            ]
        }
    },
    components:{
        Swiper,
        SwiperSlide
    },
}
</script>

<style lang="scss">
    .subcategories{
        background-color: #D9E0EDC6;
    }
    .borderCssImage{
        border-radius: 50%;
    }
    .swiper{
        min-height: 240px;
    }
    .swiper-slide{
        background: none;
    }
    .swiper-button-next, .swiper-button-prev{
        top:40%;
    }
    .swiper-button-next:after, .swiper-button-prev:after{
        font-size:18px !important;
        content: 'next';
        color: #000;
        border: 1px solid #000;
        border-radius: 50%;
        padding-right: 8px;
        padding-left: 8px;
        padding-top: 6px;
        padding-bottom: 6px;
    }
</style>