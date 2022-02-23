/*=========================================================================================
  File Name: i18n.js
  Description: i18n configuration file. Imports i18n data.
  ----------------------------------------------------------------------------------------
 
==========================================================================================*/

import Vue from "vue";
import VueI18n from "vue-i18n";
import locales from "./locales/";

Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem("lang") || "en", // set default locale
  messages: locales,
});
