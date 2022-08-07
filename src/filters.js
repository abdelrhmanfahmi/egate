import Vue from "vue";
import moment from "moment";
import i18n from "./i18n/i18n";
Vue.filter("fixedCurrency", function (el) {
  return Number(el).toFixed(3);
});

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY  -  hh:mm");
    // toLocaleString();
  }
});

Vue.filter("timeDefer", function (value) {
  // const date1 = new Date("08/05/2022 23:41:20");
  // const date2 = new Date();

  // const diff = date2.getTime() - date1.getTime();

  // let msec = diff;
  // const hh = Math.floor(msec / 1000 / 60 / 60);
  // msec -= hh * 1000 * 60 * 60;
  // const mm = Math.floor(msec / 1000 / 60);
  // msec -= mm * 1000 * 60;
  // const ss = Math.floor(msec / 1000);
  // msec -= ss * 1000;

  // console.log(`hh : ${hh} , mm : ${mm} , ss:${ss}`);

  if (value) {
    const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
    if (seconds < 29) return i18n.t("profile.justNow");
    const en_intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
    const ar_intervals = {
      سنه: 31536000,
      شهر: 2592000,
      اسبوع: 604800,
      يوم: 86400,
      ساعه: 3600,
      دقيقة: 60,
      ثانية: 1,
    };
    let en_counter;
    let ar_counter;

    if (i18n.locale == "en") {
      for (const i in en_intervals) {
        en_counter = Math.floor(seconds / en_intervals[i]);
        if (en_counter > 0) return ` ${en_counter} ${i}${en_counter > 1 ? "s" : ""} ago`;
      }
    }
    if (i18n.locale == "ar") {
      for (const i in ar_intervals) {
        ar_counter = Math.floor(seconds / ar_intervals[i]);
        if (ar_counter > 0 && ar_counter !== 2) return ` منذ ${ar_counter} ${i}${ar_counter > 1 ? "" : ""}`;
        if (ar_counter > 0 && ar_counter == 2) return ` منذ  ${i}${ar_counter == 2 ? "ان" : ""}`;
      }
    }
  }
  return value;
});
