import Vue from "vue";
import moment from 'moment'
Vue.filter("fixedCurrency", function (el) {
  return Number(el).toFixed(3)
});

Vue.filter("formatDate", function (value) {
  if (value) {

    return moment(String(value)).format('MM/DD/YYYY  -  hh:mm')
    // toLocaleString();
  }
});
