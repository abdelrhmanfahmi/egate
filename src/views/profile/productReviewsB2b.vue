<template>
  <div class="product-reviews">
    <h4 class="main-header my-4">{{ $t("profile.productReviews") }}</h4>
    <b-table hover :items="items" :fields="fields" stacked="lg">
      <template #cell(created_at)="data">
        <span>
          {{data.value | formatDate}}
        </span>
      </template>
      <template #cell(productName)="data">
        <router-link to="/">{{ data.value }} </router-link>
      </template>
      <template #cell(evaluation)="data">
        <b>{{ data.value }}</b>
      </template>
      <template #cell(review)>
        <Rate @changeTitle="ChangeQ($event)" />
      </template>
      <template #cell(actions)>
        <b-button class="login-button" @click="rate">
          {{ $t("profile.review") }}
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import Rate from "@/components/global/rate.vue"
import profile from "@/services/profile";
export default {
  data() {
    return {
      fields: [
        {
          key: "created_at",
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
        { key: "actions", label: this.$t("profile.actions") },
      ],
      items: [
        // {
        //   age: "07/24/2021",
        //   productName: "فيجيتا شوربة الدجاج والنود لز 60جم",
        //   evaluation: "test",
        //   review: 3,
        // },
      ],
      myRate:null
    };
  },
  methods: {
    rate() {
      alert("rate");
    },
    getProductRate() {
      profile
        .getProductRate()
        .then((res) => {
          console.log(res);
          this.items = res.data.items
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ChangeQ(myRate) {
      this.myRate = myRate;
      console.log(myRate);
    },
  },
  mounted(){
    this.getProductRate()
  },
  components:{
    Rate
  }
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
