<template>
  <!-- user addresses page  -->
  <div class="address-book" :class="$i18n.locale">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-6 col-sm-12">
        <h4 class="main-header">{{ $t("profile.addressBook") }}</h4>
      </div>
      <div class="col-md-6 col-sm-12">
        <div class="input-holder">
          <form @keyup.prevent="searchAddresses">
            <!-- coupon input  -->

            <input
              type="text"
              :placeholder="$t('profile.searchAddress')"
              class="my-2 h-100 p-3 w-100 itemInput"
              v-model="addressSearchText"
            />
            <b-button type="submit" class="login-button my-2 py-3 px-4 w-auto">
              <!-- <span>{{ $t("cart.couponDiscount") }}</span> -->
              <span>{{ $t("profile.search") }}</span>
            </b-button>
          </form>
        </div>
      </div>
    </div>
    <div class="addresses-holder mt-5 shopping-cart-page">
      <b-row v-if="loading" class="px-5">
        <b-col lg="3" sm="6" v-for="x in 10" :key="x">
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
      <!-- data comes from backend  -->

      <VueSlickCarousel
        v-bind="settings"
        v-if="adresses && adresses.length && !addressLoading"
      >
        <div
          v-for="(address, index) in adresses"
          :key="index"
          class="slider-data"
        >
          <div class="address-data">
            <div class="row mb-2">
              <div class="col-md-6 col-sm-12" v-if="address.country">
                <div>
                  {{ $t("profile.country") }} : {{ address.country.title }}
                </div>
              </div>
              <div class="col-md-6 col-sm-12" v-if="address.region">
                <div>
                  {{ $t("profile.region") }} : {{ address.region.title }}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6 col-sm-12" v-if="address.city">
                <div>{{ $t("profile.city") }} : {{ address.city.title }}</div>
              </div>
              <div class="col-md-6 col-sm-12" v-if="address.block">
                <div>
                  {{ $t("profile.block_number") }} : {{ address.block }}
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-md-6 col-sm-12" v-if="address.street">
                <div>
                  {{ $t("profile.newStreetNumber") }} : {{ address.street }}
                </div>
              </div>
              <div class="col-md-6 col-sm-12" v-if="address.floor">
                <div>{{ $t("profile.floor") }} : {{ address.floor }}</div>
              </div>
            </div>
          </div>
          <div class="edit-tools">
            <div class="row justify-content-center align-items-center">
              <div
                class="col-md-9 col-sm-12 d-flex align-items-center make-default"
                v-if="!address.is_default"
                @click="
                  showModal();
                  selectAddress(address);
                "
              >
                <span
                  ><font-awesome-icon icon="fa-regular fa-circle-check"
                /></span>
                <span class="mx-1">{{ $t("profile.makeDefaultAddress") }}</span>
              </div>
              <div class="col-md-3 col-sm-12 d-flex edit-delete">
                <div class="edit-address" @click="editSliderAdress(address)">
                  <font-awesome-icon icon="fa-solid fa-pen" />
                </div>
                <div
                  class="remove-address mx-2"
                  @click="
                    selectAddress(address);
                    showDeleteModal();
                  "
                >
                  <font-awesome-icon icon="fa-solid fa-trash" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
      <div class="" v-if="addressLoading">
        <div class="text-center">
          <b-spinner variant="danger" label="Spinning"></b-spinner>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="adresses.length <= 0"
      >
        <h4 v-if="!addressLoading">
          {{ $t("profile.quotationsRatingsEmpty") }}
        </h4>
      </div>
    </div>
    <div class="add-address" @click="showForm = !showForm">
      <div
        class="d-flex flex-column justify-content-center align-items-center text-gray"
      >
        <span>+ </span>
        <span>{{ $t("profile.newAddress") }}</span>
      </div>
    </div>
    <div class="add-new-holder" v-if="showForm">
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <form
            @submit.prevent="createAdress()"
            class="account-information-form"
          >
            <div class="hide-tab text-gray" @click="showForm = !showForm">
              <font-awesome-icon icon="fa-solid fa-times" />
            </div>
            <b-row class="">
              <!-- country  -->
              <b-col lg="12" v-if="form.country_id !== undefined">
                <b-form-group>
                  <label>{{ $t("profile.country") }}</label>
                  <span class="requried">*</span>
                  <b-form-select
                    v-model="form.country_id"
                    @input="getAllRegions"
                  >
                    <b-form-select-option
                      v-for="country in countries"
                      :key="country.id"
                      :value="country.id"
                      >{{ country.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.country_id"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- regions -->
              <b-col lg="6" v-if="form.region_id !== undefined">
                <b-form-group>
                  <label>{{ $t("profile.region") }}</label>
                  <span class="requried">*</span>
                  <b-form-select
                    v-model="form.region_id"
                    :disabled="!form.country_id"
                    @input="getAllCities"
                    @change="getAllCities"
                  >
                    <b-form-select-option
                      v-for="region in regions"
                      :key="region.id"
                      :value="region.id"
                      >{{ region.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.region_id"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- cities -->
              <b-col lg="6" v-if="form.city_id !== undefined">
                <b-form-group>
                  <label>{{ $t("profile.city") }}</label>
                  <span class="requried">*</span>
                  <b-form-select
                    v-model="form.city_id"
                    :disabled="!form.country_id || !form.region_id"
                  >
                    <b-form-select-option
                      v-for="city in cities"
                      :key="city.id"
                      :value="city.id"
                      >{{ city.title }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.city_id"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- name in english (new add)-->
              <b-col
                lg="6"
                v-if="$i18n.locale == 'en' && form.name !== undefined"
              >
                <b-form-group v-if="buyerUserData.type == 'buyer'">
                  <label>{{ $t("profile.name") }}</label>
                  <b-form-select v-model="form.name">
                    <b-form-select-option value="null" disabled
                      >{{ $t("profile.name") }}
                      <span class="requried text-danger">*</span>
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="(formName, index) in en_B2B_formNames"
                      :key="index"
                      :value="formName"
                      >{{ formName }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.name"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
                <b-form-group v-else>
                  <label>{{ $t("profile.name") }}</label>
                  <span class="requried">*</span>
                  <b-form-select v-model="form.name">
                    <b-form-select-option
                      v-for="(formName, index) in en_formNames"
                      :key="index"
                      :value="formName"
                      >{{ formName }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.name"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- name in arabic (new add)-->
              <b-col
                lg="6"
                v-else-if="$i18n.locale == 'ar' && form.name !== undefined"
              >
                <b-form-group
                  v-if="
                    buyerUserData.type == 'buyer' && arabicAvailable !== 'no'
                  "
                >
                  <label>{{ $t("profile.name") }}</label>
                  <b-form-select v-model="form.name">
                    <b-form-select-option value="null" disabled
                      >{{ $t("profile.name") }}
                      <span class="requried text-danger">*</span>
                    </b-form-select-option>
                    <b-form-select-option
                      v-for="(formName, index) in ar_B2B_formNames"
                      :key="index"
                      :value="formName"
                      >{{ formName }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.name"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
                <b-form-group v-else>
                  <label>{{ $t("profile.name") }}</label>
                  <span class="requried">*</span>
                  <b-form-select v-model="form.name">
                    <b-form-select-option
                      v-for="(formName, index) in ar_formNames"
                      :key="index"
                      :value="formName"
                      >{{ formName }}
                    </b-form-select-option>
                  </b-form-select>
                  <div
                    class="error"
                    v-for="(error, index) in errors.name"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- address number -->
              <b-col lg="6" v-if="form.address_line_1 !== undefined">
                <b-form-group>
                  <label for="streetNumber">{{
                    $t("contactUs.address")
                  }}</label>
                  <span class="requried">*</span>
                  <b-form-input
                    id="streetNumber"
                    v-model="form.address_line_1"
                  />
                  <div
                    class="error"
                    v-for="(error, index) in errors.address_line_1"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- block  -->
              <b-col lg="6" v-if="form.block !== undefined">
                <b-form-group>
                  <label for="floor">{{ $t("profile.blockNumber") }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="floor" v-model="form.block" />
                  <div
                    class="error"
                    v-for="(error, index) in errors.block"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- street  (new add)-->
              <b-col lg="6" v-if="form.street !== undefined">
                <b-form-group>
                  <label for="street">{{
                    $t("profile.newStreetNumber")
                  }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="street" v-model="form.street" />
                  <div
                    class="error"
                    v-for="(error, index) in errors.street"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- avenue (new add)  -->
              <b-col lg="6" v-if="form.avenue !== undefined">
                <b-form-group>
                  <label for="floor">{{ $t("profile.avenue") }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="floor" v-model="form.avenue" />
                  <div
                    class="error"
                    v-for="(error, index) in errors.avenue"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- home number  -->
              <b-col lg="6" v-if="form.building_number !== undefined">
                <b-form-group>
                  <label for="homeNumber">{{ $t("profile.homeNumber") }}</label>
                  <!-- <span class="requried">*</span> -->
                  <b-form-input
                    id="homeNumber"
                    v-model="form.building_number"
                  />
                  <div
                    class="error"
                    v-for="(error, index) in errors.building_number"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>

              <!-- floor   -->
              <b-col lg="6" v-if="form.floor !== undefined">
                <b-form-group>
                  <label for="floor">{{ $t("profile.floor") }}</label>
                  <!-- <span class="requried">*</span> -->
                  <b-form-input id="floor" v-model="form.floor" />
                  <div
                    class="error"
                    v-for="(error, index) in errors.floor"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <!-- old block number   -->
              <!-- <b-col lg="6">
            <b-form-group>
              <label for="blockNumber">{{ $t("profile.blockNumber") }}</label>
              <span class="requried">*</span>
              <b-form-input id="blockNumber" v-model="form.apartment" />
              <div
                class="error"
                v-for="(error, index) in errors.apartment"
                :key="index"
              >
                {{ error }}
              </div>
            </b-form-group>
          </b-col> -->
              <!-- post code  -->
              <b-col lg="6" v-if="form.pin_code !== undefined">
                <b-form-group>
                  <label for="postCode">{{ $t("profile.zipCode") }}</label>
                  <span class="requried">*</span>
                  <b-form-input id="postCode" v-model="form.pin_code" />
                  <div
                    class="error"
                    v-for="(error, index) in errors.pin_code"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
              <b-col lg="12" v-if="dynamicInputs">
                <dynamicComponent
                  :dynamicInputs="dynamicInputs"
                  :form="form"
                  :errors="errors"
                />
              </b-col>
              <!-- note  -->
              <b-col lg="12" v-if="form.notes !== undefined">
                <b-form-group>
                  <label for="textarea">{{ $t("profile.note") }}</label>
                  <b-form-textarea
                    id="textarea"
                    size="lg"
                    v-model="form.notes"
                  ></b-form-textarea>
                  <div
                    class="error"
                    v-for="(error, index) in errors.notes"
                    :key="index"
                  >
                    {{ error }}
                  </div>
                </b-form-group>
              </b-col>
            </b-row>

            <b-button type="submit" class="login-button">
              {{ $t("register.submit") }}
            </b-button>
          </form>
        </div>
      </div>
    </div>
    <div class="confirm-default-address">
      <b-modal id="default-modal" hide-footer ref="default-modal">
        <div class="d-block text-center">
          <h3>{{ $t("profile.makeDefaultAddress") }}</h3>
        </div>
        <b-button
          class="mt-3 bg-main"
          block
          @click="
            hideModal();
            makeDefaultSliderAddress();
          "
        >
          {{ $t("cart.submit") }}
        </b-button>
      </b-modal>
      <b-modal id="delete-modal" hide-footer ref="delete-modal">
        <div class="d-block text-center">
          <h3>{{ $t("items.sureDelete") }}</h3>
        </div>
        <b-button
          class="mt-3 bg-main"
          block
          @click="
            hideDeleteModal();
            deleteSliderAdress();
          "
        >
          {{ $t("register.save") }}
        </b-button>
      </b-modal>
    </div>
    <!-- <b-table
      hover
      :items="adresses"
      :fields="fields"
      stacked="lg"
      show-empty
      :empty-text="$t('profile.quotationsRatingsEmpty')"
      class="my-4"
    >
      <template #cell(actions)="row">
        <div class="actions">
          <b-button v-b-tooltip.hover :title="$t('items.edit')" @click="editAdress(row)">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </b-button>
          <b-button
            v-b-tooltip.hover
            :title="$t('profile.delete')"
            @click="deleteAdress(row)"
          >
            <font-awesome-icon icon="fa-solid fa-trash-can" />
          </b-button>

          <b-button
            v-if="!row.item.is_default"
            v-b-tooltip.hover
            :title="$t('profile.makeDefaultAddress')"
            @click="makeDefaultAddress(row)"
          >
            <font-awesome-icon icon="fa-solid fa-address-book" />
          </b-button>
        </div>
      </template>
    </b-table> -->
  </div>
</template>

<script>
// user addresses page
import auth from "@/services/auth";
import profile from "@/services/profile";
import dynamicComponent from "@/components/global/dynamicComponent";
import { createdFormData } from "@/services/helpers.js";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  data() {
    return {
      form: {
        country_id: null,
        region_id: null,
        city_id: null,
        building_number: null,
        floor: null,
        apartment: null,
        pin_code: null,
        notes: null,
        name: null,
        block: null,
        street: null,
        avenue: null,
      },
      countries: [],
      cities: [],
      regions: [],
      errors: {},
      showForm: false,
      loading: false,
      fields: [
        {
          key: "apartment",
          label: this.$t("profile.apartment"),
        },
        {
          key: "building_number",
          label: this.$t("profile.block_number"),
        },
        {
          key: "floor",
          label: this.$t("profile.floor"),
        },
        {
          key: "apartment",
          label: this.$t("profile.apartment"),
        },
        {
          key: "address_line_1",
          label: this.$t("profile.streetNumber"),
        },
        {
          key: "city.title",
          label: this.$t("profile.city"),
        },
        {
          key: "region.title",
          label: this.$t("profile.region"),
        },
        {
          key: "country.title",
          label: this.$t("profile.country"),
        },
        {
          key: "pin_code",
          label: this.$t("profile.zipCode"),
        },
        {
          key: "actions",
          label: "",
        },
      ],
      adresses: [],
      en_formNames: ["Office", "Home"],
      ar_formNames: ["المنزل", "المكتب"],
      en_B2B_formNames: ["Head office", "Ware house", "Retail shop"],
      ar_B2B_formNames: ["مدير المكتب", "مستودع", "محل بيع بالتجزئه"],
      dynamicInputs: null,
      addressSearchText: "",
      // slider settings
      settings: {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        centerMode: false,
        clickable: true,
        accessibility: true,
        draggable: true,
        focusOnSelect: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
      selectedAddress: null,
      addressLoading: false,
    };
  },
  mounted() {
    this.getAllCountires();
    this.getAllAdresses();

    this.checkDynamicInputs();
  },
  methods: {
    // selectMe(address) {
    //   console.log("address", address);
    // },
    selectAddress(address) {
      this.selectedAddress = address;
    },
    hideModal() {
      this.$refs["default-modal"].hide();
    },
    showModal() {
      this.$refs["default-modal"].show();
    },
    hideDeleteModal() {
      this.$refs["delete-modal"].hide();
    },
    showDeleteModal() {
      this.$refs["delete-modal"].show();
    },
    /**
     * get All Adresses function
     * @vuese
     */
    getAllAdresses() {
      profile.getAllAdresses().then((res) => {
        this.adresses = res.data.items;
        console.log(res);
      });
    },
    // Countires

    /**
     * get All Countires function
     * @vuese
     */
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
        })
        .then(() => {
          this.getAllRegions();
        });
    },
    // getAllRegions

    /**
     * get All Regions function
     * @vuese
     */
    getAllRegions() {
      profile
        .getAllRegions(this.form.country_id)
        .then((res) => {
          this.regions = res.data.items;
          this.form.region_id = null;
          this.form.city_id = null;
        })
        .then(() => {
          this.checkAddressesForm();
        });
    },
    // Cities

    /**
     * get All Cities function
     * @vuese
     */
    getAllCities() {
      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = null;
      });
    },

    /**
     * @vuese
     *  checkAddressesForm
     */
    checkAddressesForm() {
      profile
        .checkAddressesForm()
        .then((res) => {
          let formControl = res.data.items;
          formControl.map((element) => {
            if (element.status !== 1) {
              this.form[element.input_key] = undefined;
            } else {
              this.form[element.input_key] = null;
            }
            if (element.input_key == "country_id" && element.status == 1) {
              this.form.country_id = JSON.parse(this.selectedCountry).id;
            }
            if (element.input_key == "region_id" && element.status !== 1) {
              this.form.region_id = undefined;
            }

            if (element.input_key == "city_id" && element.status !== 1) {
              this.form.city_id = undefined;
            }
          });
        })
        .then(() => {
          profile.getAllRegions(this.form.country_id).then((res) => {
            this.regions = res.data.items;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // createAddress

    /**
     * create Address function
     * @vuese
     */
    createAdress() {
      (this.form.is_sale_point = false),
        profile
          .createAdress(createdFormData(this.form))
          .then((res) => {
            this.sucessMsg(res.data.message);
            this.errors = {};
            this.getAllAdresses();
            this.showForm = false;
            this.form = {};
            if (res.status == 200) {
              setTimeout(() => {
                // this.$router.replace('/profile/documents')
                this.$router.replace("/profile/documents");
              }, 500);
            }
          })
          .catch((error) => {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          });
    },

    // deleteAdress
    /**
     * delete Address function
     * @vuese
     */

    deleteAdress(row) {
      profile
        .deleteAdress(row.item.uuid)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getAllAdresses();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
    deleteSliderAdress() {
      profile
        .deleteAdress(this.selectedAddress.uuid)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getAllAdresses();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
    // deleteSliderAdress(row) {
    //   profile
    //     .deleteAdress(row.uuid)
    //     .then((res) => {
    //       this.sucessMsg(res.data.message);
    //       this.getAllAdresses();
    //     })
    //     .catch((error) => {
    //       const err = Object.values(error)[2].data;
    //       this.errMsg(err.message);
    //     });
    // },
    /**
     * edit Address function
     * @vuese
     */

    editAdress(row) {
      this.showForm = true;
      this.form.country_id = row.item.country.id;

      this.form = { ...row.item };

      profile.getAllRegions(this.form.country_id).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = row.item.region.id;
      });

      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = row.item.city.id;
      });
    },
    editSliderAdress(row) {
      console.log("row", row);
      this.showForm = true;
      this.form.country_id = row.country_id;

      this.form = { ...row };

      profile.getAllRegions(this.form.country_id).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = row.region.id;
      });

      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = row.city.id;
      });
    },

    /**
     * make Default Address function
     * @vuese
     */

    makeDefaultAddress(row) {
      profile
        .makeDefaultAddress(row.item.uuid)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getAllAdresses();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
    makeDefaultSliderAddress() {
      profile
        .makeDefaultAddress(this.selectedAddress.uuid)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getAllAdresses();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
    /**
     * check Dynamic Inputs
     * @vuese
     */
    checkDynamicInputs() {
      auth
        .dynamicInputs("user-address")
        .then((res) => {
          this.dynamicInputs = res.data.items;
          this.dynamicInputs.map((input) => {
            this.form[input.uuid] = null;
            if (input.type == "checkbox") {
              this.form[input.uuid] = false;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  components: {
    dynamicComponent,
    VueSlickCarousel,
  },
};
</script>

<style lang="scss" scoped>
.address-book {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
  .add-address {
    font-size: 17px;
    color: #312620;
    margin: 15px 0;
    transition: all 0.5s ease-in-out;
    //new style
    padding: 20px;
    border: 2px solid #e2e2e2;
    border-radius: 5px;
    min-height: 250px;
    min-width: 335px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      color: $main-color;
    }
    span {
      font-size: 23px;
      font-weight: 600;
    }
  }
  .account-information-form {
    padding: 20px 0;
    .login-button {
      margin: 30px 0px;
      width: 20%;
    }
  }
  .actions {
    text-align: center;
    button {
      color: #000 !important;
      background-color: transparent !important;
      border: 0 !important;
    }
    svg {
      font-size: 1.2rem;
      margin: 0 5px;
      cursor: pointer;
    }
  }
}

html:lang(ar) {
  .address-book {
    text-align: right;
  }
}

// new style
.input-holder {
  position: relative;
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
}
.ar {
  .input-holder {
    button {
      left: 0;
      right: auto;
    }
  }
}
.en {
  .input-holder {
    button {
      right: 0;
      left: auto;
    }
  }
}
.slider-data {
  position: relative;
  @media (max-width: 992px) {
    position: static;
  }
  .edit-tools {
    color: $main-color;
    cursor: pointer;
    font-size: 17px;
  }
  .edit-delete {
    position: absolute;
    right: 10px;
    bottom: 10px;
    @media (max-width: 992px) {
      position: static;
      left: auto;
      bottom: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0 0 0;
    }
  }
  .make-default {
    position: absolute;
    left: 10px;
    bottom: 10px;
    @media (max-width: 992px) {
      position: static;
      left: auto;
      bottom: auto;
      margin: 0;
      padding: 0;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.add-new-holder {
  .account-information-form {
    padding: 20px;
    border: 2px solid #ced4da !important;
    border-radius: 5px !important;
    position: relative;
    .hide-tab {
      position: absolute;
      top: 5px;
      right: 5px;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      cursor: pointer;
      display: inline-block;
      font-size: 20px;
      border: 3px solid #b9b9b9;
      line-height: 23px;
      text-align: center;
      font-weight: bold;
      color: #b9b9b9 !important;
    }
  }
}
</style>
