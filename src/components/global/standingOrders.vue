<template>
    <div>
        <p class="add-address" @click="showForm = !showForm">
            <span>+ </span>{{ $t('items.addNew') }}
        </p>
        <form @submit.prevent="addNewStandingOrder()" class="account-information-form" v-if="showForm">
            <b-row class="justify-content-center align-items-center">
                <!-- country  -->
                <b-col lg="5" class="mb-3">
                    <label>name</label>
                    <span class="requried">*</span>
                    <b-form-input id="name" v-model="standingOrder.name" />
                </b-col>
                <b-col lg="5">
                    <b-form-group>
                        <label>time</label>
                        <span class="requried">*</span>
                        <b-form-select v-model="standingOrder.time">
                            <b-form-select-option :value="null">Please select an option</b-form-select-option>
                            <b-form-select-option value="a">Option A</b-form-select-option>
                            <b-form-select-option value="b">Option B</b-form-select-option>
                            <b-form-select-option value="c">Option C</b-form-select-option>
                        </b-form-select>

                        <!-- <div class="mt-2">Selected: <strong>{{ standingOrder.time }}</strong></div> -->
                        <div class="error" v-for="(error, index) in errors.country_id" :key="index">
                            {{ error }}
                        </div>
                    </b-form-group>
                </b-col>
                <b-col lg="2">
                    <b-button type="submit" class="login-button ">
                        {{ $t("register.submit") }}
                    </b-button>
                </b-col>
            </b-row>


        </form>
        <div class="d-flex justify-content-center align-items-center">

            <hr class="w-75">
        </div>
        <div class="my-3">
            <p class="add-address">
                {{ $t('payment.selectExist') }}
            </p>
        </div>
        <div class="row">
            <b-col v-for="category in categories" :key="category.id" lg="3" sm="6" class=" custum-padding">
                <router-link :to="`/categories/${category.id}`">
                    <CategoryCard :card="{ type: category.title }" :image="category.image_path"
                        class="homecategories" />
                </router-link>
            </b-col>
        </div>
    </div>
</template>

<script>
import CategoryCard from "@/components/global/CategoryCard.vue";
import categories from "@/services/categories";
export default {
    data() {
        return {
            categories: null,
            showForm: false,
            standingOrder: {
                name: null,
                time: null
            },
            errors: [],
        }
    },
    components: {
        CategoryCard
    },
    methods: {
        addNewStandingOrder() {
            console.log('clicked');
        },

        async getCategories() {
            await categories
                .getCategories("lists/categories")
                .then((resp) => {
                    this.categories = resp.data.items;
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted() {
        this.getCategories();
    },
}
</script>

<style lang="scss" scoped>
.add-address {
    font-size: 17px;
    color: #312620;
    margin: 15px 0;
    transition: all 0.5s ease-in-out;
    cursor: pointer;

    &:hover {
        color: $main-color;
    }

    span {
        font-size: 23px;
        font-weight: 600;
    }
}

.login-button {
    margin: 0 !important;
    margin-top: 15px !important
}
</style>>
