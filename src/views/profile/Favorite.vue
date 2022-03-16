<template>
  <div>
    <b-table hover :items="items" :fields="fields" stacked="lg">
      <template #cell(price)="data">
        <p>{{ data.value }} KD</p>
      </template>
      <template #cell(quantity)="data">
        <Counter
          class="justify-content-center"
          :quantity="data.value"
        ></Counter>
      </template>
      <template #cell(totalPrice)="data">
        <p>{{ data.value }} KD</p>
      </template>
    </b-table>
  </div>
</template>

<script>
import Counter from "../../components/global/Counter.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "quantity",
          label: this.$t("profile.quantity"),
        },
        {
          key: "totalPrice",
          label: this.$t("profile.totalPrice"),
        },
      ],
      items: [
        {
          product: "Silicone Parch. 16.3x24.3",
          price: 27.4,
          quantity: 1,
          totalPrice: 27.4,
        },
        {
          product: "Beer - Tetleys",
          price: 6.4,
          quantity: 9,
          totalPrice: 57.6,
        },
        {
          product: "Icecream - Dibs",
          price: 9.4,
          quantity: 7,
          totalPrice: 65.8,
        },
        {
          product: "Water - Perrier",
          price: 14.3,
          quantity: 6,
          totalPrice: 85.8,
        },
        {
          product: "Wine - Sauvignon Blanc",
          price: 9.9,
          quantity: 6,
          totalPrice: 59.4,
        },
        {
          product: "Baking Soda",
          price: 15.7,
          quantity: 10,
          totalPrice: 157.0,
        },
        {
          product: "Mince Meat - Filling",
          price: 13.2,
          quantity: 5,
          totalPrice: 66.0,
        },
        {
          product: "Potatoes - Instant, Mashed",
          price: 5.8,
          quantity: 9,
          totalPrice: 52.2,
        },
        {
          product: "Sprouts - Brussel",
          price: 17.4,
          quantity: 1,
          totalPrice: 17.4,
        },
        {
          product: "Soup - Knorr, Ministrone",
          price: 21.6,
          quantity: 6,
          totalPrice: 129.6,
        },
      ],
    };
  },
  components: {
    Counter,
  },
};
</script>
<style></style>
