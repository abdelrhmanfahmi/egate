<template>
  <div class="datePicker-holder">
    <div class="row">
      <div class="col-12">
        <div class="from">
          <b-form-datepicker
            id="example-datepicker-from"
            v-model="fromValue"
            class="mb-2"
            :placeholder="$t('profile.dateFrom')"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="col-12">
        <div class="to">
          <b-form-datepicker
            id="example-datepicker-to"
            v-model="toValue"
            class="mb-2"
            :placeholder="$t('profile.dateTo')"
          ></b-form-datepicker>
        </div>
      </div>
      <div class="col-12">
        <div class="row justify-content-center align-content-center">
          <div class="col-md-6 col-sm-12">
            <button class="bg-main btn p-2 text-white w-100" @click="filterWithDate">
              {{ $t("cart.submit") }}
            </button>
          </div>
          <div class="col-md-6 col-sm-12">
            <button class="border-main btn p-2 w-100" @click="cancelDateFilter">
              {{ $t("cart.cancel") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fromValue: "",
      toValue: "",
    };
  },
  methods: {
    filterWithDate() {
      let data = {
        from: this.fromValue,
        to: this.toValue,
      };
      this.$emit("filterWithDate", data);
    },
    cancelDateFilter() {
      this.$emit("cancelDateFilter");
    },
  },
};
</script>
