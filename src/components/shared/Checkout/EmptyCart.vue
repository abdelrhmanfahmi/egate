<template>
    <div>
        <div class="p-3 my-3  text-center">
            <img class="empty-cart-img" :src="require('@/assets/images/checkout/empty-cart@2x.png')" />
            <div class="mt-8">
                <h4>Your Cart Is Empty</h4>
                <p class="text-gray">Looks Like You Have Not Added Anything To Your Cart. Go Ahead & Explore Top Categories
                </p>
            </div>
            <div class="col-md-12 d-flex justify-content-center">
                <v-btn class="bg-light text-gray d-flex shadow-0" block to="/cart" @click.prevent="closeSideVisible">View
                    Cart</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['sideVisible'],
    methods: {
        closeSideVisible() {
            this.$emit('onUpdateSideVisible', false);
        }
    }
}
</script>

<style></style>