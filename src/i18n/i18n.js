/*=========================================================================================
  File Name: i18n.js
  Description: i18n configuration file. Imports i18n data.
  ----------------------------------------------------------------------------------------
 
==========================================================================================*/

// import axios from "axios";
import Vue from "vue";
import VueI18n from "vue-i18n";
import locales from "./locales/";

Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem("lang") || "en", // set default locale
  messages: locales,
});


// export async function loadLanguageAsync(lang) {
//   // If the same language
//   if (i18n.locale === lang) {
//       return Promise.resolve(setI18nLanguage(lang))
//   }

//   // If the language was already loaded
//   if (loadedLanguages.includes(lang)) {
//       return Promise.resolve(setI18nLanguage(lang))
//   }

//   // If the language hasn't been loaded yet
//   try {
//     let data = await axios.get();
//     let messages = JSON.parse(data.data);
    
//     if (messages != null) {
//         i18n.setLocaleMessage(lang, messages.default)
//         loadedLanguages.push(lang)
//         return setI18nLanguage(lang)
//     }

//   } catch(e) {
//       i18n.setLocaleMessage(lang, locales.default)
//       loadedLanguages.push(lang)
//       return setI18nLanguage(lang)
//   }
// }