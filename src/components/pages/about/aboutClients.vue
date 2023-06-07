<template>
  <!-- clients page  -->
  <div class="suppliers-body suppliers clients px-3 py-5 text-center">
    <div class="suppliers py-4">
      <div class="container">
        <b-row v-if="loading">
          <b-col class="mb-2" lg="2" sm="6" v-for="x in 10" :key="x">
            <b-skeleton-img></b-skeleton-img>
            <b-card>
              <b-skeleton
                animation="fade"
                width="60%"
                class="border-none"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                width="85%"
                class="border-none"
              ></b-skeleton>
            </b-card>
          </b-col>
        </b-row>
        <div class="row suppliers-data justify-content-center" v-else>
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-2 mx-2 supplier-content"
            v-for="(client, index) in clients"
            :key="index"
          >
            <SingleClient :supplier="client"></SingleClient>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
// clients page
import suppliers from "@/services/suppliers";
import SingleClient from "@/components/pages/suppliers/SingleClient.vue";
export default {
  components: {
    SingleClient,
  },
  methods: {
    /**
     * @vuese
     * get Clients function
     */
    getClients() {
      this.loading = true;
      suppliers
        .getClients(this.page)
        .then((resp) => {
          this.clients = resp.data.items.suppliers.data.slice(0 , 20);
          this.clientsLength = resp.data.items.suppliers.data.length;

          this.total = resp.data.items.suppliers.meta.total;
          this.totalPages = Math.ceil(
            resp.data.items.suppliers.meta.total /
              resp.data.items.suppliers.meta.per_page
          ); // Calculate total records

          this.totalRecords = resp.data.items.suppliers.meta.total;
          this.loading = false;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    /**
     * @vuese
     * this function used for pagination
     */
    onPageChange(page) {
      this.page = page;
      this.getClients();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    onChangeRecordsPerPage() {
      this.getClients();
    },
    /**
     * @vuese
     * this function used for pagination
     */
    gotoPage() {
      if (!isNaN(parseInt(this.enterpageno))) {
        this.page = parseInt(this.enterpageno);
        this.getClients();
      }
    },
    /**
     * @vuese
     * this function used to go to Client Page
     */
    goClientPage(client) {
      this.$router.push({
        path: `/suppliers/${client.id}`,
      });
    },
  },
  mounted() {
    this.getClients();
  },
  data() {
    return {
      clients: [],
      clientsLength: null,
      perPage: 5,
      total: 0,
      currentPage: 1,

      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      loading: false,
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.notifications {
  .new-message-box {
    margin: 15px 0;
    padding-left: 20px;
    margin-bottom: 25px !important;
  }

  .new-message-box p {
    font-size: 1.15em;
    font-weight: 600;
  }

  .info-tab {
    width: 40px;
    height: 40px;
    display: inline-block;
    position: relative;
    top: 8px;
  }

  .info-tab {
    float: left;
    margin-left: -23px;
  }

  .info-tab i::before {
    width: 24px;
    height: 24px;
    box-shadow: inset 12px 0 13px rgba(0, 0, 0, 0.5);
  }

  .info-tab i::after {
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #fff;
    border-left-color: #fff;
    bottom: -18px;
  }

  .info-tab i::before,
  .info-tab i::after {
    content: "";
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: -17px;
    transform: rotateX(60deg);
  }

  .note-box,
  .warning-box,
  .tip-box-success,
  .tip-box-danger,
  .tip-box-warning,
  .tip-box-info,
  .tip-box-alert {
    padding: 12px 8px 3px 26px;
  }

  /***Success****/

  .new-message-box-success {
    background: #eeeeeeb3;
    padding: 3px;
    margin: 0;
  }

  .tip-icon-success {
    background: #8bc34a; //500
  }

  .tip-box-success {
    color: #33691e; //900
    background: #dcedc8; //100
  }

  .tip-icon-success::before {
    font-size: 25px;
    content: "\f00c";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-success i::before {
    background: #8bc34a; //500
  }

  /*******Danger*******/
  .new-message-box-danger {
    background: #eeeeeeb3;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-icon-danger {
    background: #f44336; //500
  }

  .tip-box-danger {
    color: #b71c1c; //900
    background: #ffccbc; //100
  }

  .tip-icon-danger::before {
    font-size: 25px;
    content: "\f00d";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-danger i::before {
    background: #f44336; //500
  }

  /*******warning*******/
  .new-message-box-warning {
    background: #eeeeeeb3;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-icon-warning {
    background: #ffeb3b; //500
  }

  .tip-box-warning {
    color: #212121; //900
    background: #fff9c4; //100
  }

  .tip-icon-warning::before {
    font-size: 25px;
    content: "\f071";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: #212121;
  }

  .tip-icon-warning i::before {
    background: #ffeb3b; //500
  }

  /*******info*******/
  .new-message-box-info {
    background: #eeeeeeb3;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-box-info {
    color: #01579b; //900
    background: #b3e5fc; //100
  }

  .tip-icon-info {
    background: #03a9f4; //500
  }

  .tip-icon-info::before {
    font-size: 25px;
    content: "\f129";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-info i::before {
    background: #03a9f4; //500
  }

  /*******info*******/
  .new-message-box-alert {
    background: #ff6f00;
    padding: 3px;
    margin: 10px 0;
  }

  .tip-box-alert {
    color: #212121; //900
    background: #fff8e1; //100
  }

  .tip-icon-alert {
    background: #ff6f00; //500
  }

  .tip-icon-alert::before {
    font-size: 25px;
    content: "\f06a";
    top: 8px;
    left: 11px;
    font-family: FontAwesome;
    position: absolute;
    color: white;
  }

  .tip-icon-alert i::before {
    background: #ff6f00; //500
  }

  /*************************/

  body {
    background-color: #ffffff;
  }

  .data-holder {
    width: 100%;
    margin: auto;
  }
}

.btn:focus,
.btn.focus {
  box-shadow: none !important;
}

.readed {
  background: #f4f4f4 !important;
}

.unreaded {
  background: #8bc34a !important;
}
.media {
  display: flex;
  justify-content: center;
  align-items: center;
}
.client_image {
  width: 80px;
  height: 50px;
  object-fit: contain;
}

.supplier-content {
  padding: 0.6rem;
}
</style>
  