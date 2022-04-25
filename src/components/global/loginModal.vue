<template>
  <div
    id="modal-center"
    centered
    class="modal-dialog modal-dialog-centered modal-dialog-scrollable text-center"
  >
    <div class="modal-content">
      <div class="header-holder">
        <!-- <div class="modal-header">Header</div> -->
        <!-- <span>{{ $t("login.actionComplete") }}</span> -->
        <div class="cls-button">
          <button class="btn" @click="handleClose">x</button>
        </div>
      </div>
      <div
        class="modal-body d-flex justify-content-center align-items-center flex-column"
      >
        <h2 class="mt-3">
          {{ $t("login.log1") }}
        </h2>
        <h5 class="mt-3">
          {{ $t("login.log2") }}
        </h5>
      </div>
      <div
        class="modal-footer d-flex justify-content-center align-items-center"
      >
        <router-link to="/b2b-register" class="text-white">
          <button
            class="login-button m-0 mt-4 py-3 px-2 mx-2 text-white text-center w-auto btn-secondary"
          >
            {{ $t("login.logBtn1") }}
          </button>
        </router-link>
        <router-link to="/order-shipping" class="text-white">
          <button
            class="login-button dark m-0 mt-4 py-3 px-2 mx-2 text-white text-center w-auto"
            @click="handleClose"
          >
            {{ $t("login.logBtn2") }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data: function () {
    return {
      dataObj: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    handleSave() {
      //   console.log(this.dataObj);
      this.handleClose();
    },
    handleClose() {
      this.$emit("close");
    },
  },
  //   props: ["product"],
};
</script>
<style lang="scss" scoped>
.header-holder {
  position: relative;
  background: #6e6e6e;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: #414141 !important;
  padding: 20px;
  font-size: 19px;
  .cls-button {
    position: absolute;
    right: 4px;
    padding: 0 5px !important;
    button {
      background: #fff;
      padding: 1px 10px;
    }
  }
  .btn-outline-danger:hover {
    color: #414141;
  }
}
.event-btn {
  background: #414141;
  color: #fff;
  padding: 5px 10px;
  text-transform: capitalize;

  a {
    color: inherit;
    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }
}
button {
  font-size: 16px;
}
.dark {
  background: #909090 !important;
}
</style>
