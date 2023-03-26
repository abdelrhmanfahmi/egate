<template>
    <div class="tabs-holder home-categories-tabs">
        <div class="container">
            <b-tabs content-class="mt-3">
                <!-- product specifications tab  -->
                <b-tab :title="$t('profile.categories')" active>
                    <div class="">
                        <CatrgoriesHome />
                    </div>
                </b-tab>
                <!-- product rating tab  -->
                <b-tab :title="$t('home.suppliers')">
                    <div class="tab-data-holder">
                        <b-row v-if="loading">
                            <b-col class="mb-2" lg="2" sm="6" v-for="x in 10" :key="x">
                                <b-skeleton-img></b-skeleton-img>
                                <b-card>
                                    <b-skeleton animation="fade" width="60%" class="border-none"></b-skeleton>
                                    <b-skeleton animation="fade" width="85%" class="border-none"></b-skeleton>
                                </b-card>
                            </b-col>
                        </b-row>
                        <div class="row suppliers-data justify-content-center" v-else>
                            <div class="col-12 col-sm-6 col-md-4 col-lg-2 mx-2 supplier-content"
                                v-for="supplier in suppliers" :key="supplier.id">
                                <SingleSupplier :supplier="supplier"></SingleSupplier>
                            </div>
                        </div>
                        <div class="text-center d-flex justify-content-center align-items-center my-5">
                            
                                <router-link to="/suppliers" class="border-main w-25">{{ $t('cart.viewAll') }}</router-link>
                            
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import CatrgoriesHome from "@/components/pages/home/CatrgoriesHome";

// suppliers page
import SingleSupplier from "@/components/pages/suppliers/SingleSupplier.vue";
import suppliers from "@/services/suppliers";

export default {
    components: {
        CatrgoriesHome,
        SingleSupplier,
    },
    data() {
        return {
            items: [
                {
                    text: this.$t("supplier.home"),
                    href: "/humhum-user",
                },
                {
                    text: this.$t("supplier.suppliers"),
                    href: "#",
                    active: true,
                },
            ],
            suppliers: null,
            loading: false,
            perPage: 5,
            total: 0,
            currentPage: 1,

            page: 1,
            totalPages: 0,
            totalRecords: 0,
            recordsPerPage: 10,
            enterpageno: "",
        };
    },
    methods: {
        /**
         * @vuese
         * this function used get Suppliers
         */
        getSuppliers() {
            this.loading = true;
            suppliers
                .getSuppliers(this.page)
                .then((resp) => {
                    console.log(resp);
                    this.suppliers = resp.data.items.data;
                    this.total = resp.data.items.total;
                    this.totalPages = Math.ceil(
                        resp.data.items.total / resp.data.items.per_page
                    ); // Calculate total records

                    this.totalRecords = resp.data.items.total;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        /**
         * @vuese
         * this function used for pagination
         */
        onPageChange(page) {
            this.page = page;
            this.getSuppliers();
        },

        /**
         * @vuese
         * this function used for pagination
         */
        onChangeRecordsPerPage() {
            this.getSuppliers();
        },

        /**
         * @vuese
         * this function used for pagination
         */
        gotoPage() {
            if (!isNaN(parseInt(this.enterpageno))) {
                this.page = parseInt(this.enterpageno);
                this.getSuppliers();
            }
        },
    },
    mounted() {
        this.getSuppliers();
    },
    computed: {
        rows() {
            return this.suppliers.length;
        },
    },
}
</script>

<style lang="scss" scoped>
.suppliers {
    background-color: #f9f8f5;

    .suppliers-data {
        color: #000;

        .supplier-content {
            padding: 0.6rem;
        }
    }
}
.tab-data-holder{
    min-height: 70vh;
}
.border-main{
    padding: 20px;
    border: 2px solid $main-color;
    outline: none;
    box-shadow: none;
    border-radius: 10px;
    color: $main-color;
    font-size: 18px;
    background: transparent;
    text-transform: capitalize;
    @media(max-width:992px){
        width:95% !important
    }
}
</style>