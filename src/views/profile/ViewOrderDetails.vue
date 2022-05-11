<template>
  <div class="my-5">
    <div class="container">
      <div
        class="data-holder serial-holder d-flex justify-content-between align-items-center"
      >
        <div class="serial">
          <h6 class="m-0">#serial</h6>
        </div>
        <div class="print">
          <font-awesome-icon icon="fa-solid fa-print" />
          <span class="mx-2">
            {{ $t("profile.printIno") }}
          </span>
        </div>
      </div>
      <section class="account-address-info">
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.accountInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.addressInfo") }}
              <sub> ( {{ $t("profile.billingAddress") }} ) </sub>
            </h4>
            <div class="pl-2">
              <div class="">
                <h5 class="font-weight-bold h4">
                  {{ $t("userName") }}
                </h5>
                <p>data</p>
                <p>data</p>
                <p>data</p>
                <p>country</p>
                <p><font-awesome-icon icon="fa-solid fa-phone" /> phone</p>
                <p><font-awesome-icon icon="fa-solid fa-envelope" /> email</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="payment">
        <section
          class="data-holder serial-holder d-flex justify-content-between align-items-center"
        >
          <div class="serial">
            <h6 class="m-0">payment</h6>
          </div>
        </section>
        <div class="row">
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.paymentInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 mb-2">
            <h4 class="data-holder">
              {{ $t("profile.shoppingInfo") }}
            </h4>
            <div class="">
              <div class="info">
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerName") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data">
                  <div class="col-6">
                    {{ $t("profile.customerEmail") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
                <div class="row info-data info-colored">
                  <div class="col-6">
                    {{ $t("profile.customerPlacedId") }}
                  </div>
                  <div class="col-6">data</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.data-holder {
  padding: 20px;
  background: #f7f7f7;
}
.serial-holder {
  font-size: 20px;
}
h4 {
  background: #f7f7f7;
  margin-bottom: 2%;
}
section {
  margin: 2% 0;
}

.info {
  font-size: 20px;
  padding: 10px 0;
  margin: 0 15px;
}
.info-data {
  padding: 10px 0;
}
.info-colored {
  background: #f7f7f7;
}
</style>
