<template>
  <!-- user addresses page  -->
  <div class="address-book">
    <h4 class="main-header">{{ $t("profile.addressBook") }}</h4>
    <p class="add-address" @click="showForm = !showForm">
      <span>+ </span>{{ $t("profile.newAddress") }}
    </p>
    <form
      @submit.prevent="createAdress()"
      class="account-information-form"
      v-if="showForm"
    >
      <b-row class="justify-content-center">
        <!-- country  -->
        <b-col lg="12">
          <b-form-group>
            <label>{{ $t("profile.country") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="form.country_id" @input="getAllRegions">
              <b-form-select-option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
                >{{ country.title }}
              </b-form-select-option>
            </b-form-select>
            <div class="error" v-for="(error, index) in errors.country_id" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- regions -->
        <b-col lg="6">
          <b-form-group>
            <label>{{ $t("profile.region") }}</label>
            <span class="requried">*</span>
            <b-form-select
              v-model="form.region_id"
              :disabled="!form.country_id"
              @input="getAllCities"
            >
              <b-form-select-option
                v-for="region in regions"
                :key="region.id"
                :value="region.id"
                >{{ region.title }}
              </b-form-select-option>
            </b-form-select>
            <div class="error" v-for="(error, index) in errors.region_id" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- cities -->
        <b-col lg="6">
          <b-form-group>
            <label>{{ $t("profile.city") }}</label>
            <span class="requried">*</span>
            <b-form-select
              v-model="form.city_id"
              :disabled="!form.country_id || !form.region_id"
            >
              <b-form-select-option v-for="city in cities" :key="city.id" :value="city.id"
                >{{ city.title }}
              </b-form-select-option>
            </b-form-select>
            <div class="error" v-for="(error, index) in errors.city_id" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- name in english (new add)-->
        <b-col lg="6" v-if="$i18n.locale == 'en'">
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
            <div class="error" v-for="(error, index) in errors.name" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- name in arabic (new add)-->
        <b-col lg="6" v-else>
          <b-form-group v-if="buyerUserData.type == 'buyer' && arabicAvailable !== 'no'">
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
            <div class="error" v-for="(error, index) in errors.name" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- address number -->
        <b-col lg="6">
          <b-form-group>
            <label for="streetNumber">{{ $t("contactUs.address") }}</label>
            <span class="requried">*</span>
            <b-form-input id="streetNumber" v-model="form.address_line_1" />
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
        <b-col lg="6">
          <b-form-group>
            <label for="floor">{{ $t("profile.blockNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="floor" v-model="form.block" />
            <div class="error" v-for="(error, index) in errors.block" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- street  (new add)-->
        <b-col lg="6">
          <b-form-group>
            <label for="street">{{ $t("profile.newStreetNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="street" v-model="form.street" />
            <div class="error" v-for="(error, index) in errors.street" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- avenue (new add)  -->
        <b-col lg="6">
          <b-form-group>
            <label for="floor">{{ $t("profile.avenue") }}</label>
            <span class="requried">*</span>
            <b-form-input id="floor" v-model="form.avenue" />
            <div class="error" v-for="(error, index) in errors.avenue" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- home number  -->
        <b-col lg="6">
          <b-form-group>
            <label for="homeNumber">{{ $t("profile.homeNumber") }}</label>
            <!-- <span class="requried">*</span> -->
            <b-form-input id="homeNumber" v-model="form.building_number" />
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
        <b-col lg="6">
          <b-form-group>
            <label for="floor">{{ $t("profile.floor") }}</label>
            <!-- <span class="requried">*</span> -->
            <b-form-input id="floor" v-model="form.floor" />
            <div class="error" v-for="(error, index) in errors.floor" :key="index">
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
        <b-col lg="6">
          <b-form-group>
            <label for="postCode">{{ $t("profile.zipCode") }}</label>
            <span class="requried">*</span>
            <b-form-input id="postCode" v-model="form.pin_code" />
            <div class="error" v-for="(error, index) in errors.pin_code" :key="index">
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
        <b-col lg="12">
          <b-form-group>
            <label for="textarea">{{ $t("profile.note") }}</label>
            <b-form-textarea
              id="textarea"
              size="lg"
              v-model="form.notes"
            ></b-form-textarea>
            <div class="error" v-for="(error, index) in errors.notes" :key="index">
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button type="submit" class="login-button">
        {{ $t("register.submit") }}
      </b-button>
    </form>
    <b-table
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
          <b-button
            v-b-tooltip.hover
            :title="$t('profile.edit')"
            @click="editAdress(row)"
          >
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
    </b-table>
  </div>
</template>

<script>
// user addresses page
import auth from "@/services/auth";
import profile from "@/services/profile";
import dynamicComponent from "@/components/global/dynamicComponent";
import { createdFormData } from "@/services/helpers.js";
export default {
  data() {
    return {
      form: {
        country_id: "",
        region_id: "",
        city_id: "",
        building_number: "",
        floor: "",
        apartment: "",
        pin_code: "",
        notes: "",
        name: "",
        block: "",
        street: "",
        avenue: "",
      },
      countries: [],
      cities: [],
      regions: [],
      errors: {},
      showForm: false,
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
    };
  },
  mounted() {
    this.getAllCountires();
    this.getAllAdresses();
    this.form.country_id = JSON.parse(this.selectedCountry).id;
    if (this.form.country_id) {
      this.getAllRegions();
    }
    this.checkDynamicInputs();
  },
  methods: {
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
      auth.getAllCountires().then((res) => {
        this.countries = res.data.items;
      });
    },
    // getAllRegions

    /**
     * get All Regions function
     * @vuese
     */
    getAllRegions() {
      profile.getAllRegions(this.form.country_id).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = null;
        this.form.city_id = null;
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
    /**
     * edit Address function
     * @vuese
     */

    editAdress(row) {
      console.log(row);
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
</style>
