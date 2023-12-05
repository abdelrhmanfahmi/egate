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
                <div class="col-md-3 mb-5" v-for="(category,idx) in categories" :key="idx">
                    <router-link :to="'/categoryPage/'+ category.id" >
                        <div class="card">
                            <img :src="category.cover" alt="Avatar" style="width:90%;height: 75%;">
                            <div class="containersCss">
                                <p style="color: #000;"><b>{{ category.name_en }}</b></p>
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

.card img{
    margin-bottom: 1rem;
}
.card {
    box-shadow: 0 4px 8px 0 rgba(255, 255, 255, 0);
    transition: 0.3s;
    border: 1px solid #fff;
    border-radius: 5%;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.containersCss {
    padding: 2px 16px;
}
</style>