<template>
    <div>
        <div class="wrapper">
            <v-app >
                <div class="cssStyleHome">
                    <v-breadcrumbs :items="items">
                        <template v-slot:prepend>
                        <v-icon size="small" icon="mdi-home"></v-icon>
                        </template>
                        <template v-slot:divider>
                        <v-icon icon="mdi-chevron-right"></v-icon>
                        </template>
                    </v-breadcrumbs>
                </div>
                <SliderSubCategoryComponent :items="items"/>
                <ProductPage :product="product"/>
            </v-app>
        </div>
    </div>
</template>

<script>
import SliderSubCategoryComponent from "@/components/categories/SliderSubCategoryComponent.vue";
export default{
    data(){
        return {
            items: [
                {
                    title: "ELECTRONICS",
                    disabled: false,
                    href: "breadcrumbs_dashboard",
                },

                {
                    title: "COMPUTERS COMPONENTS & ACCESSORIES",
                    disabled: false,
                    href: "breadcrumbs_link_1",
                },
                {
                    title: "LAPTOPS & NOTEBOOKS",
                    disabled: true,
                    href: "breadcrumbs_link_2",
                },
            ],
        }
    },
    components:{
        SliderSubCategoryComponent
    }

}
</script>

<style scoped lang="scss">
    .cssStyleHome{
        background-color: #D9E0EDC6;
    }
</style>