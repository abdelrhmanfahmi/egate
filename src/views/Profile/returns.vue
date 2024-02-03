<template>
  <div class="profile">
    <div class="returns-page">
      <div class="page-title">
        <h2 class="profile-title">My Returns</h2>
      </div>
      <section class="my-2">
        <div class="returned-orders">
          <div class="mb-10 py-5" v-for="(returnOrder, index) in returnedOrders" :key="index">
            <h2 class="text-gray h1">Order #{{returnOrder.id}}</h2>
            <div class="d-flex">
              <div>
                <div class="product-img" v-if="returnOrder.image != null">
                  <img :src="returnOrder.image" alt="" />
                </div>
                <div class="product-img" v-else>
                  <img :src="require('@/assets/images/product/Image15.png')" alt="" />
                </div>
              </div>
              <div>
                <div class="product-title">
                  <h3>
                    <b>
                      Ultitec 2000 Disposable Coverall Protect Against Liquid
                    </b>
                  </h3>
                </div>
              </div>
            </div>
            <div class="d-flex justify-end">
              <p class="text-gray">Tracking ID: {{returnOrder.id}}</p>
            </div>
            <ProductTrack />
            <hr class="divider my-2" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { useMeta } from "vue-meta";
import order from '@/services/order';
import ProductTrack from "@/components/Profile/ProductTrack.vue";
export default {
  components: {
    ProductTrack,
  },
  mounted(){
    this.getOrdersReturned();
  },
  data(){
    return {
      returnedOrders:[]
    }
  },
  methods:{
    async getOrdersReturned(){
      const res = await order.getReturnedOrders();
      this.returnedOrders = res.data.items.data;
    }
  },
  setup() {
    useMeta({
      title: "Profile Returns",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>

<style lang="scss" scoped>
.product-img {
  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-right: 20px;
  }
}
</style>
