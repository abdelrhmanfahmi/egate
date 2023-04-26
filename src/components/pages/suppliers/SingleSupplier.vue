<template>
  <!-- single supplier component  -->
  <div class="single-supplier bg-white position-relative">
    <div class="supplier-data">
      <div class="thumb">
        <router-link
          :to="`/suppliers/${supplier.id}`"
          class="d-block text-center"
        >
          <img :src="supplier.image_path" alt="supplier image" v-if="supplier.image_path" />
          <img :src="logoEnv" class="img-fluid" alt="logo" v-else />
        </router-link>
        <p class="supplier-name text-center mt-3 text-capitalize">
          {{ supplier.company_name }}
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
  /**
   * props
   *  supplier data sent as prop
   */
  props: {
    supplier: {
      // supplier prop
      type: Object,
      required: false,
    },
  },
};
</script>
<style lang="scss" scoped>
/**
      *  component style 
  */
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
          // width: 100% !important;
          // height: 273px;

          width: 100% !important;
          height: 222px;
          object-fit: contain;
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
