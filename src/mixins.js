import { useToast } from 'vue-toastification'
const toast = useToast()
export const myMixin = {
  computed: {
    getDir() {
      return document.documentElement.dir;
    },
    // is we have user
    isLoggined() {
      if (localStorage.getItem("EGate-userInfo")) {
        return true;
      } else {
        return false;
      }
    },
    mainDoamin() {
      return process.env.VUE_APP_AXSIOS_LINK;
    },

    currentLang() {
      return localStorage.getItem("lang");
    },
    currency(){
      return localStorage.getItem('currency') ? localStorage.getItem('currency') : 'EG'
    }
  },
  methods: {
    sucessMsg(text, icon = "success") {
      toast(text,
        {
          title: text,
          type: icon,
          position: 'top-right',
          transition: 'slide',
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
          pauseOnHover: true,
        }
      )

    },
    errMsg(text, icon = "error") {
      toast(text,
        {
          title: text,
          type: icon,
          position: 'top-right',
          transition: 'slide',
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true
        }
      )
    },
  },
};
