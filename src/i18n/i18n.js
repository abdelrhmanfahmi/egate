/*=========================================================================================
  File Name: i18n.js
  Description: i18n configuration file. Imports i18n data.
  ----------------------------------------------------------------------------------------
 
==========================================================================================*/

// import axios from "axios";
import { createI18n } from 'vue-i18n'
import locales from "./locales/";


const i18n = new createI18n({
  locale: localStorage.getItem("lang") || "en", // set default locale
  messages: locales,
});

export default i18n;