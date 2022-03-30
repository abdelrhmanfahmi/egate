<template>
  <div class="specs">
    <div class="content">
      <h5 class="header d-inline-block font-weight-bold mb-3">
        {{ $t("singleProduct.ratingHeader") }} (0):
      </h5>
      <p class="description">{{ $t("singleProduct.ratingDescription") }}.</p>
      <!-- <p class="hint">{{ $t("singleProduct.ratingHint") }}</p> -->
      <div class="product-rate">
        <form class="review-form row">
          <div class="form-group mb-4 col-12">
            <label for="rating">{{ $t("singleProduct.ratingLabel") }}</label>
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
        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  props:['myProduct']
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
</style>
