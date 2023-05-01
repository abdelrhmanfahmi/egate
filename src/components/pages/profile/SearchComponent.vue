<template>
    <div class="search-holder">
        <div class="input-holder">
            <form @submit.prevent="supplierAllCorrespondenceSearch">
                <span class="remove-search" role="button" v-if="messageSearchText"
                    @click="messageSearchText = null ; supplierAllCorrespondenceSearch()">x</span>
                <!-- coupon input  -->

                <input type="text" :placeholder=" $t('cart.search') " class="my-2 h-100 p-3 w-100 itemInput"
                    v-model=" messageSearchText " />
                <b-button type="submit" class="login-button my-2 py-3 px-4 w-auto">
                    <!-- <span>{{ $t("cart.couponDiscount") }}</span> -->
                    <span>{{ $t("cart.search") }}</span>
                </b-button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.input-holder {
    position: relative;

    button {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        border-radius: 5px;
    }
}

.remove-search {
    position: absolute;
}

.en {
    .input-holder {
        button {
            right: 0;
            left: auto;
        }

        .remove-search {
            right: auto;
            left: 0;
            left: -17px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 22px;

        }
    }
}

.ar {
    .input-holder {
        button {
            left: 0;
            right: auto;
        }

        .remove-search {

            left: auto;
            right: 17px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 22px;

        }
    }
}
</style>