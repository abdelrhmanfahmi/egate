import Vue from "vue";

Vue.filter("fixedCurrency", function (el) {
  return el.toFixed(3);
});

Vue.filter("formatDate", function (value) {
  if (value) {

    return new Date(value).toLocaleString();
  }
});
