<template>
  <!-- rate product component  -->
  <div class="specs">
    <div class="content">
      <h5 class="header d-inline-block font-weight-bold mb-3">
        {{ $t("singleProduct.ratingHeader") }} ({{ reviewsLength }}):
      </h5>
      <div class="product-rate">
        <div class="my-3" v-if="reviewsLength > 0">
          <!-- <hr /> -->
          <div
            class="form-group mb-3 col-12"
            v-for="(review, index) in reviews"
            :key="index"
          >
            <label for="rating" class="d-flex align-items-center">
              <div class="mr-3">
                <span>{{ review.client.first_name }}</span>
                <span class="mx-1">{{ review.client.last_name }}</span>
              </div>

              <div>
                <b-form-rating
                  id="rating-disabled"
                  style="color: #acacac"
                  :value="review.rate"
                ></b-form-rating>
              </div>
            </label>
          </div>
        </div>
        <div class="" v-else>
          <h6>{{ $t("singleProduct.noReviews") }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import suppliers from "@/services/suppliers";
export default {
  data() {
    return {
      count: 0,
      ratingValue: null,
      id: this.$route.query.id,
      reviews: null,
      reviewsLength: 0,
    };
  },
  /**
   * @vuese
   *  pass product data as prop
   */

  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
    },
  },
  methods: {
    /**
     * @vuese
     *  get product reviews
     */
    settingReviews() {
      this.reviews = this.myProduct.data;
      if(this.reviews){

        this.reviewsLength = this.myProduct.data.length;
      }else{
        this.reviewsLength = 0
      }
    },
  },
  mounted() {
    this.settingReviews();
  },
};
</script>
<style lang="scss" scoped>
/**
  *  component style
*/
.specs {
  .content {
    .header {
      font-size: 11pt;
      border-bottom: 1px solid #696969;
      color: #312620;
    }
    .description {
      font-size: 11pt;
      color: #676565;
    }
    .hint {
      color: #312620;
    }
    .product-rate {
      .review-form {
        label {
          text-align: start;
          color: #312620;
          display: block;
          margin-bottom: 10px;
          font-size: 11pt;
        }
        input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: none;
          background: #fff;
          color: #6c6c6c;
          font-size: 14px;
        }
        textarea {
          width: 100%;
          padding: 1.25rem;
          border: none;
          background: #fff;
          font-size: 11pt;
          color: #6c6c6c;
          resize: none;
        }
      }
    }
  }
}
.b-rating.disabled {
  background: transparent;
}
</style>
