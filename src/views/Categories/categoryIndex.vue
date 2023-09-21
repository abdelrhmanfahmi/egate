<template>
    <div class="categories">
        <div class="container">
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-icon size="small" icon="mdi-home"></v-icon>
                    &nbsp;
                </template>
                <template v-slot:divider>
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
            </v-breadcrumbs>
            <div class="row p-0 m-0 mb-3">
                <div class="col-md-12">
                    <h3>All Categories</h3>
                </div>
            </div>
                    
            <div class="row d-flex justify-content-start p-0 m-0">
                <div class="col-md-3 mb-4" v-for="(category,idx) in categories" :key="idx">
                    <router-link :to="'/categoryPage/'+ category.id" >
                        <div class="card">
                            <div class="card-title h-50">
                                <img :src="category.cover" class="card-img-top styleImage">
                            </div>
                            <div class="card-body styleCardBody">
                                <p class="card-title styleParagraph">{{ category.name_en }}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import home from '@/services/home';

export default {
    data(){
        return {
            items:[
                {
                    title: "All Categories",
                    disabled: false,
                    href: "breadcrumbs_dashboard",
                },
            ],
            categories:[]
        }
    },

    mounted(){
        this.getCategories();
    },

    methods:{
        async getCategories(){
            const response = await home.getCategories();
            this.categories = response.data.items.data;
        },
    }
}
</script>

<style scoped lang="scss">
    .styleColorHere{
        color:#a3a3a1;
    }
    .styleImage{
        width: 100%;
        height: 170%;
    }
    .styleCardBody{
        padding: 40px;
    }
    .styleParagraph{
        font-weight: bold;
        font-size:18px;
    }
    .card{
        border: 1px solid #fff;
    }
</style>