<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 col-lg-3 col-xl-3 d-flex align-items-start mb-3">
                <div class="sidebar-filter-overlay" @click="showSideMenu"></div>
                <div class="filtersHiddenSideBar">
                    <span class="toggleSideFilter" role="button" @click="showSideMenu"></span>
                    <sideFilters @updateProducts="onUpdateProducts($event)" />
                </div>
            </div>
            <div class="col-md-12 col-lg-9 col-xl-9">
                <CategoryProducts :categoryProducts="categoryProducts" :countCategoryRecords="countCategoryRecords"
                    @updateProducts="onUpdateProducts($event)" @updateCategoryProducts="onUpdateShowingResult($event)" />
                <Paginate v-if="layout == 'grid' && totalPages > 1" :total-pages="totalPages" :per-page="totalPages"
                    :current-page="page" @pageChanged="onPageChange" />
            </div>
        </div>
    </div>
</template>

<script>
import sideFilters from './sideBar.vue';
import Paginate from "@/components/shared/Paginate.vue";
import CategoryProducts from './CategoryProducts.vue';
import globalAxios from '@/services/global-axios';
export default {
    data() {
        return {
            category_id: null,
            categoryProducts: [],
            totalPages: 1,
            totalRecords: 0,
            layout: 'grid',
            perPage: 5,
            total: 0,
            currentPage: 1,

            page: 1,
            totalPages: 1,
            totalRecords: 0,
            recordsPerPage: 3,
            enterPageNo: "",
            countCategoryRecords: 0
        }
    },
    mounted() {
        this.checkID();
        this.getCategoryProducts();
    },
    components: {
        sideFilters,
        CategoryProducts,
        Paginate
    },
    watch: {
        '$route.params.id'(newVal, oldVal) {
            if (newVal != oldVal) {
                this.getCategoryProducts();
            }
        }
    },
    methods: {
        checkID() {
            if (this.$route.params.id) {
                this.category_id = this.$route.params.id
            } else if (this.$route.query.id) {
                this.category_id = this.$route.query.id
            }
        },

        async getCategoryProducts() {
            try {
                const response = await globalAxios.get('client/products/relational/products', { params: { category_id: this.$route.params.id, count: this.recordsPerPage, page: this.page } });
                this.categoryProducts = response.data.items.data;
                console.log(response.data.items.data.length);
                this.countCategoryRecords = response.data.items.data.length;
                this.totalPages = Math.ceil(
                    response.data.items.meta?.total / response.data.items.meta?.per_page
                );
                this.totalRecords = response.data.items?.meta?.total;
            } catch (e) {
                console.log(e);
            }
        },

        async onUpdateProducts(newProducts) {
            this.page = newProducts.page;
            if (newProducts.hasOwnProperty('sort_field')) {
                await globalAxios.get('client/products/relational/products', { params: { category_id: newProducts.subCategory, count: this.recordsPerPage, page: this.page, sort_field: 'id' } }).then((response) => {
                    this.categoryProducts = response.data.items.data;
                    this.totalPages = Math.ceil(
                        response.data.items.meta?.total / response.data.items.meta?.per_page
                    );
                    this.totalRecords = response.data.items?.meta?.total;
                });
            } else {
                await globalAxios.get('client/products/relational/products', { params: { category_id: newProducts.subCategory, count: this.recordsPerPage, page: this.page } }).then((response) => {
                    this.categoryProducts = response.data.items.data;
                    this.totalPages = Math.ceil(
                        response.data.items.meta?.total / response.data.items.meta?.per_page
                    );
                    this.totalRecords = response.data.items?.meta?.total;
                });
            }
        },

        async onUpdateShowingResult(selected) {
            try {
                const response = await globalAxios.get('client/products/relational/products', { params: { category_id: this.$route.params.id, count: selected, page: this.page } });
                this.categoryProducts = response.data.items.data;
            } catch (e) {
                console.log(e);
            }
        },

        onPageChange(page) {
            this.page = page;
            this.getCategoryProducts(this.page);
        },

        onChangeRecordsPerPage() {
            this.page = page;
            this.getCategoryProducts(this.page);
        },

        gotoPage() {
            if (!isNaN(parseInt(this.enterPageNo))) {
                this.page = parseInt(this.enterPageNo);
                this.getCategoryProducts(this.page);
            }
        },

        showSideMenu() {
            document.querySelector(".filtersHiddenSideBar").classList.toggle("showSide");
            document.querySelector(".sidebar-filter-overlay").classList.toggle("active");
        },
    }
}
</script>

<style scoped lang="scss">
// @media (min-width:768px) and (max-width:1000px) {
//     .row {
//         height: 100%;
//     }

//     .align-items-start {
//         height: 100%;
//     }
// }

// @media screen and (min-width: 1024px) {
//     .row {
//         height: 100%;
//     }

//     .align-items-start {
//         height: 100%;
//     }
// }

@media screen and (min-width: 1400px) {
    .row {
        height: 100%;
    }

    .align-items-start {
        height: 100%;
    }
}

@media screen and (min-width: 1600px) {
    .row {
        height: 100%;
    }

    .align-items-start {
        height: 100%;
    }
}

@media screen and (min-width: 1900px) {
    .row {
        height: 100%;
    }

    .align-items-start {
        height: 100%;
    }
}
</style>