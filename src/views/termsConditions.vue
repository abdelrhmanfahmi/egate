<template>
  <!-- termas and conditions page  -->
  <div>
    <div class="container">
      <div class="text-center mt-3" v-if="terms">
        <h1 v-if="terms.title">
          {{terms.title}}
        </h1>
        <p class="lead my-4" v-if="terms.description" v-html="terms.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  data() {
    return {
      terms: null,
    };
  },
  methods: {
    /**
     * @vuese
     * this function used to get termsAndCondations
     */
    termsAndCondations() {
      auth
        .termsAndCondations()
        .then((res) => {
          this.terms = res.data.items
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
  },
  mounted(){
    this.termsAndCondations()
  }
};
</script>

<style></style>
