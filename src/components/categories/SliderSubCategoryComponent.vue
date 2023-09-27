<template>
    <div class="subcategories">
        <v-container fluid>
            <swiper :modules="modules" v-bind="options" class="mySwiper" v-if="subCategories.length > 0">
                <swiper-slide v-for="(subCategory , index) in subCategories" :key="index">
                    <img
                        :src="subCategory.cover"
                        :lazy-src="subCategory.cover"
                        class="borderCssImage"
                    />
                    <br>
                    <p class="text-center">{{ subCategory.name_en }}</p>
                </swiper-slide>
            </swiper>
            <div v-else>
                <h3 class="text-center">No Sub Categories</h3>
            </div>
        </v-container>
    </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

export default{
    mounted(){
        this.checkID();
        this.getSubCategories();
    },
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
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    767: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },

                    991: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1200:{
                        slidesPerView:4,
                        spaceBetween:10
                    },
                    1500:{
                        slidesPerView:5,
                        spaceBetween:10
                    }
                },
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
            subCategories:[],
            category_id:null
            
        }
    },
    methods:{
        async checkID(){
            if (this.$route.params.id) {
                this.category_id = this.$route.params.id
            } else if (this.$route.query.id) {
                this.category_id = this.$route.query.id
            }
        },
        async getSubCategories(){
            try{
                if(this.$route.params.id){
                    const response = await globalAxios.get(`client/categories/${this.$route.params.id}`);
                    this.subCategories = response.data.items.childrens;
                }
            }catch(e){
                console.log(e);
            }
            
        },
    },
    watch: {
        '$route.params.id' (newVal,oldVal) {
            if(newVal != oldVal){
            this.getSubCategories();
            }
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
        padding: 0px 25px;
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
    .swiper-button-next:after{
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
    .swiper-button-prev:after{
        font-size:18px !important;
        content: 'prev';
        color: #000;
        border: 1px solid #000;
        border-radius: 50%;
        padding-right: 8px;
        padding-left: 8px;
        padding-top: 6px;
        padding-bottom: 6px;
    }
    .swiper-slide img {
        display: block;
        width: 200px;
        height: 200px;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: 50%;
        margin: auto;
    }
</style>