import Vue from "vue";
Vue.filter('fixedCurrency' , function(el){
  return el.toFixed(3)
})