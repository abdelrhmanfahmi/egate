<template>
  <div class="single-supplier bg-white position-relative">
    <div class="supplier-data">
      <div class="thumb">

        <router-link :to="{ path: '/details', query: { id: `${deal.id}` } }" class="d-block text-center">
          <img
            :src="deal.image_path"
            alt="supplier image"
          />
        </router-link>
        <p class="supplier-name text-center mt-3 text-capitalize">
          {{ deal.product.title }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["deal"],
};
</script>
<style lang="scss" scoped>
.single-supplier {
  padding: 1rem;
  .supplier-data {
    .thumb {
      color: #000;
      a {
        display: block;
        text-align: center;
        img {
          color: #000;
          width: 100% !important;
          height: 273px;
        }
      }
      .supplier-name {
        transition: all 0.3s ease 0s;
        margin: 0;
      }
    }
    &::before {
      background: rgba(255, 255, 255, 0.3);
      bottom: 50%;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      pointer-events: none;
      top: 50%;
      opacity: 1;
      width: 0;
      -webkit-transition: all 900ms linear;
      -o-transition: all 900ms linear;
      transition: all 900ms linear;
    }
    &:hover {
      &::before {
        top: 0;
        bottom: 0;
        opacity: 0;
        width: auto;
        -webkit-transition: all 900ms linear;
        -o-transition: all 900ms linear;
        transition: all 900ms linear;
      }
    }
  }
}
</style>
