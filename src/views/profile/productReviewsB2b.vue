<template>
  <div class="product-reviews">
    <h4 class="main-header my-4">{{ $t("profile.productReviews") }}</h4>
    <b-table hover :items="items" :fields="fields" stacked="lg">
      <template #cell(productName)="data">
        <router-link to="/">{{ data.value }} </router-link>
      </template>
      <template #cell(evaluation)="data">
        <b-form-rating
          id="rating-inline"
          inline
          :value="data.value"
          disabled
          color="#000"
        ></b-form-rating>
      </template>
      <template #cell(review)="data">
        <b>{{ data.value }}</b>
      </template>
      <template #cell(actions)>
        <b-button class="login-button">
          {{ $t("profile.viewDetails") }}
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "age",
          label: this.$t("profile.construction"),
        },
        {
          key: "productName",
          label: this.$t("profile.productName"),
        },
        {
          key: "evaluation",
          label: this.$t("profile.evaluation"),
        },
        {
          key: "review",
          label: this.$t("profile.review"),
        },
        {
          key: "review",
          label: this.$t("profile.review"),
        },
        { key: "actions", label: this.$t("profile.actions") },
      ],
      items: [
        {
          age: "07/24/2021",
          productName: "فيجيتا شوربة الدجاج والنود لز 60جم",
          evaluation: 2,
          review: 2,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.product-reviews {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
}
html:lang(ar) {
  .product-reviews {
    text-align: right;
  }
}
</style>
