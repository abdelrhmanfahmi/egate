<template>
  <div class="specs">
    <div class="content">
      <h5 class="header d-inline-block font-weight-bold mb-3">
        {{ $t("singleProduct.ratingHeader") }} ({{reviewsLength}}):
      </h5>
      <!-- <p class="description">{{ $t("singleProduct.ratingDescription") }}.</p> -->
      <!-- <p class="hint">{{ $t("singleProduct.ratingHint") }}</p> -->
      <div class="product-rate">
        <!-- <form class="review-form row">
          <div class="form-group mb-4 col-12">
            <label for="rating">{{ $t("singleProduct.ratingLabel") }}</label>
            <label for="rating"><span>{{ buyerUserData.first_name }}</span> {{ buyerUserData.last_name }}</label>
            <b-form-rating id="rating" style="color: #acacac"></b-form-rating>
          </div>
          <div class="form-group mb-4 col-12">
            <label for="review">{{ $t("singleProduct.reviewLabel") }}</label>
            <textarea
              id="review"
              name="review"
              rows="4"
              :placeholder="$t('singleProduct.reviewInput')"
            ></textarea>
          </div>
          <div class="form-group mb-4 col-12 col-md-6">
            <input type="text" :placeholder="$t('singleProduct.nameInput')" />
          </div>
          <div class="form-group mb-4 col-12 col-md-6">
            <input type="text" :placeholder="$t('singleProduct.emailInput')" />
          </div>
          <div class="col-12 custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customCheck1"
            />
            <label class="custom-control-label" for="customCheck1">
              {{ $t("singleProduct.checkInput") }}
            </label>
          </div>
          <div class="col-12 col-xl-2">
            <b-button type="submit" class="login-button">
              {{ $t("profile.save") }}
            </b-button>
          </div>
        </form> -->
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
                <!-- <b-form-rating id="rating-disabled" value="3" disabled></b-form-rating> -->
                <!-- <span>ratingValue : {{ ratingValue }}</span> -->
              </div>
            </label>
          </div>
        </div>
        <div class="" v-else>
          <h6>{{$t('singleProduct.noReviews')}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import suppliers from "@/services/suppliers";
export default {
  data() {
    return {
      count: 0,
      ratingValue: null,
      id: this.$route.query.id,
      reviews: null,
      reviewsLength: null,
    };
  },
  props: ["myProduct"],
  methods: {
    getProductReview() {
      suppliers
        .getProductReview(this.id)
        .then((res) => {
          // console.log("review" , res);
          this.reviews = res.data.items.data;
          this.reviewsLength = res.data.items.data.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProductReview();
  },
};
</script>
<style lang="scss" scoped>
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
