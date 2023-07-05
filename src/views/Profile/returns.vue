<template>
  <div class="profile">
    <div class="returns-page">
      <div class="page-title">
        <h2 class="profile-title">My Returns</h2>
      </div>
      <section class="my-2">
        <div class="returned-orders">
          <div class="mb-10 py-5" v-for="(x, index) in 2" :key="index">
            <h2 class="text-gray h1">Order #012346778</h2>
            <div class="d-flex">
              <div>
                <div class="product-img">
                  <img
                    src="https://drive.google.com/uc?id=1-qzpXz-6SaqM3IPlQl_d9YXaPaBPw1xi"
                    alt=""
                  />
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
              <p class="text-gray">Tracking ID: 6893838</p>
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
import ProductTrack from "@/components/Profile/ProductTrack.vue";
export default {
  components: {
    ProductTrack,
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
