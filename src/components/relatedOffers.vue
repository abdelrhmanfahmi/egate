<template>
  <div>test</div>
</template>
<script>
import suppliers from "@/services/suppliers";
export default {
  data() {
    return {
      offers: null,
    };
  },
  methods: {
    getRelatedOffers() {
      suppliers
        .getRelatedOffers(this.$route.query.id)
        .then((res) => {
          console.log("res offers", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted(){
    this.getRelatedOffers()
  }
};
</script>
