<template>
    <div>
        <div class="wrapper">
            <v-app >
                <div class="cssStyleHome">
                    <v-breadcrumbs :items="items">
                        <template v-slot:prepend>
                            <v-icon size="small" class="mx-1" icon="mdi-home"></v-icon>
                        </template>
                        <template v-slot:divider>
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </template>
                    </v-breadcrumbs>
                </div>
                
                <SliderSubCategoryComponent :items="items"/>

                <!-- offers per category -->
                <OffersComponentPerCategory />

                <!-- sidebar categories -->
                <SidebarCategoryFilter />
            </v-app>
        </div>
    </div>
</template>

<script>
import SliderSubCategoryComponent from "@/components/categories/SliderSubCategoryComponent.vue";
import OffersComponentPerCategory from "@/components/categories/OffersComponentPerCategory.vue";
import SidebarCategoryFilter from "@/components/categories/SidebarCategoryFilter.vue";
import globalAxios from '@/services/global-axios';

export default{
    mounted(){
        this.getCategoryName();
    },
    data(){
        return {
            categoryChossen:null,
            // items: [
            //     {
            //         title: "ELECTRONICS",
            //         disabled: false,
            //         href: "breadcrumbs_dashboard",
            //     },

            //     {
            //         title: "COMPUTERS COMPONENTS & ACCESSORIES",
            //         disabled: false,
            //         href: "breadcrumbs_link_1",
            //     },
            //     {
            //         title: "LAPTOPS & NOTEBOOKS",
            //         disabled: true,
            //         href: "breadcrumbs_link_2",
            //     },
            // ],

            items:[
                {
                    title: "",
                    disabled: false,
                    href: "",
                },
            ]
        }
    },
    methods:{
        async getCategoryName(){
            const response = await globalAxios.get(`client/categories/${this.$route.params.id}`);
            this.items[0].title = response.data.items.name_en;
            this.items[0].disabled = false;
            this.items[0].href = "/categoryPage/"+response.data.items.id;
        }
    },
    components:{
        SliderSubCategoryComponent,
        OffersComponentPerCategory,
        SidebarCategoryFilter
    }

}
</script>

<style scoped lang="scss">
    .cssStyleHome{
        background-color: #D9E0EDC6;
    }
    .v-breadcrumbs-item{
        color:#000;
    }
</style>