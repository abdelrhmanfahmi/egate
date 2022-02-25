<template>
  <div>
    <b-table hover :items="items" :fields="fields" stacked="lg"></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        {
          key: "age",
          label: this.$t("profile.totalPrice"),
        },
        {
          key: "first_name",
          label: this.$t("profile.quantity"),
        },
        {
          key: "last_name",
          label: this.$t("profile.price"),
        },
        {
          key: "product",
          label: this.$t("profile.product"),
        },
      ],
      items: [
        {
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
          product: "Macdonald",
        },
        {
          age: 21,
          first_name: "Larsen",
          last_name: "Shaw",
          product: "Macdonald",
        },
        {
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          product: "Macdonald",
        },
        {
          age: 38,
          first_name: "Jami",
          last_name: "Carney",
          product: "Macdonald",
        },
      ],
    };
  },
};
</script>
<style>
</style>