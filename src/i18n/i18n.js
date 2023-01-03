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

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") || "en", // set default locale
  messages: locales,
});


import globalAxios from "../services/global-axios"

const loadedLanguages = [] // our default language that is preloaded

function setI18nLanguage(lang) {
  console.log("locales" ,locales);
  i18n.locale = lang
  globalAxios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

function jsonParser(txt) {
  if (!txt) {
    return null
  }

  let parsed = JSON.parse(txt);
  if (typeof parsed === 'string') parsed = this.jsonParser(parsed);
  return parsed;
}

export async function loadLanguageAsync(lang) {
  // If the same language
  // if (i18n.locale === lang) {
  //   console.log('test 1');
  //   return Promise.resolve(setI18nLanguage(lang))
  // }

  lang = lang || 'en'

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  try {
    let data = await globalAxios.get('get-translation-by-type-and-lang', {
      params: {
        type: 'buyer',
        lang: lang
      }
    });
    let messages = jsonParser(data?.data?.items?.translation?.data);


    if (messages != null) {
      // console.log('messages', messages);
      i18n.setLocaleMessage(lang, messages)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }

  } catch (e) {
    i18n.setLocaleMessage(lang, locales[lang] || locales['en'])
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  }
}


export default i18n;