<template>
  <div>
    <div class="newForm-holder" v-if="dynamicInputsLength > 0">
      <div v-for="(input, index) in dynamicInputs" :key="index" class="newForm">
        <b-form-group>
          <div v-if="input.type == 'text'">
            <label :for="input.uuid">{{
              $i18n.locale == "en" ? input.title_en : input.title_ar
            }}</label>
            <span class="requried tetx-danger" v-if="input.required">*</span>
            <b-form-input
              type="text"
              :id="input.uuid"
              v-model="form[input.uuid]"
              :class="{ 'dynamic-input': cartPage }"
            />
            <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
              {{ error }}
            </div>
          </div>

          <div v-if="input.type == 'checkbox'">
            <b-form-checkbox
              v-model="form[input.uuid]"
              :value="true"
              :unchecked-value="false"
              :class="{ 'dynamic-input': cartPage }"
            >
              <span>{{ $i18n.locale == "en" ? input.title_en : input.title_ar }}</span>
              <span class="requried tetx-danger" v-if="input.required">*</span>
            </b-form-checkbox>
            <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
              {{ error }}
            </div>
          </div>

          <div v-if="input.type == 'select'">
            <label :for="input.uuid">{{
              $i18n.locale == "en" ? input.title_en : input.title_ar
            }}</label>
            <span class="requried tetx-danger" v-if="input.required">*</span>
            <b-form-select
              v-model="form[input.uuid]"
              :class="{ 'dynamic-input': cartPage }"
            >
              <b-form-select-option value="null" disabled>{{
                $t("payment.selectExist")
              }}</b-form-select-option>
              <b-form-select-option
                v-for="(inputValue, index) in input.values"
                :key="index"
                :value="inputValue.en"
                :class="{ 'dynamic-input': cartPage }"
              >
                {{ $i18n.locale == "en" ? inputValue.en : inputValue.ar }}
              </b-form-select-option>
            </b-form-select>
            <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
              {{ error }}
            </div>
          </div>

          <div v-if="input.type == 'file'">
            <div class="row justify-content-center align-items-center">
              <div
                :class="{
                  'col-md-8 col-sm-12': imagesPaths[input.uuid],
                  'col-12': !imagesPaths[input.uuid],
                }"
              >
                <label :for="imagesPaths[input.uuid]">{{
                  $i18n.locale == "en" ? input.title_en : input.title_ar
                }}</label>
                <span class="requried tetx-danger" v-if="input.required">*</span>
                <b-form-group>
                  <b-form-file
                    size="lg"
                    v-model="form[input.uuid]"
                    :class="{ 'dynamic-input': cartPage }"
                    :placeholder="$t('profile.filePlaceHolder')"
                  ></b-form-file>
                </b-form-group>
              </div>

              <div
                :class="{
                  'col-md-4 col-sm-12': imagesPaths[input.uuid],
                  'col-12': !imagesPaths[input.uuid],
                }"
              >
                <div class="" v-if="imagesPaths[input.uuid]">
                  <div
                    class=""
                    v-if="
                      imagesPaths[input.uuid].includes('jpeg') ||
                      imagesPaths[input.uuid].includes('jpg') ||
                      imagesPaths[input.uuid].includes('gif') ||
                      imagesPaths[input.uuid].includes('png')
                    "
                  >
                    <img
                      v-b-modal.dynamicFile
                      :src="imagesPaths[input.uuid]"
                      alt="dynamic-file-image"
                      v-if="imagesPaths[input.uuid]"
                    />

                    <b-modal id="dynamicFile" title="image">
                      <template #modal-header="{ close }">
                        <h5>
                          {{ $t("profile.commercialLicense") }}
                        </h5>

                        <b-button size="sm" variant="outline-danger" @click="close()">
                          x
                        </b-button>
                      </template>

                      <template>
                        <img
                          :src="imagesPaths[input.uuid]"
                          alt="moa-image"
                          v-if="imagesPaths[input.uuid]"
                          class="img-fluid w-100"
                        />
                      </template>

                      <template #modal-footer>
                        <b-button
                          class="btn-block"
                          variant="outline-success"
                          @click="
                            downloadImage(
                              imagesPaths[input.uuid],
                              (extension = imagesPaths[input.uuid].split('.').pop()),
                              $t('profile.commercialLicense')
                            )
                          "
                        >
                          <i class="fa fa-download"></i>
                          {{ $t("profile.download") }}
                        </b-button>
                      </template>
                    </b-modal>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center flex-column"
                    v-else-if="
                      !imagesPaths[input.uuid].includes('jpeg') ||
                      !imagesPaths[input.uuid].includes('jpg') ||
                      !imagesPaths[input.uuid].includes('gif') ||
                      !imagesPaths[input.uuid].includes('png')
                    "
                  >
                    <!-- <a :href="imagesPaths[input.uuid]" target="_blank">
                                            <canvas :id="imagesPaths[input.uuid]" class="custom-canvas"></canvas>
                                        </a> -->
                                        <b-button variant="outline-success" @click="
                                            downloadItem(
                                                imagesPaths[input.uuid],
                                                (extension = imagesPaths[input.uuid].split('.').pop()),
                                                'dynamic form file'
                                            )
                                        ">
                                            <i class="fa fa-download"></i> {{ $t("profile.download") }}
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>



                </b-form-group>
            </div>
            <b-button v-if="dynamicInputsLength > 0" type="submit" variant="outline-danger" class="saveBtn btn-block py-3" :disabled="dynamicBtnDisabled"
                @click="uploadDunamicInputsData">
                <i class="fa fa-upload"></i> {{ $t("profile.save") }}
                <span class="loader" v-if="buttonClickedEffect"></span>
            </b-button>
        </div>
    </div>
</template>

<script>
import profile from "@/services/profile";
import auth from "@/services/auth";
import Vue from "vue";
import axios from "axios";
export default {
    data() {
        return {
            buttonClickedEffect: false,
            cartPage: false,
            dynamicInputs: null,
            form: {},
            errors: {},
            dynamicBtnDisabled: false,
            imagesPaths: {},
            dynamicInputsLength:null
        }
    },
    mounted() {
        this.firstCheckDynamicInputs()
    },
    methods: {

        /**
         * @vuese
         *   check Dynamic Inputs availability
        */
        async firstCheckDynamicInputs() {
            await auth.dynamicInputs('user-b2b-document').then(res => {
                this.dynamicInputs = res.data.items;
                this.dynamicInputsLength = res.data.items.length;
                this.dynamicInputs.map((input) => {
                    if (input.type == 'checkbox') {
                        Vue.set(this.form, input.uuid, false)
                    } else {
                        Vue.set(this.form, input.uuid, null)
                    }
                })

                this.secondCheckDynamicInputs()

            })
        },

    /**
     * check Dynamic Inputs
     * @vuese
     */

    async secondCheckDynamicInputs() {
      await profile
        .getDynaimicInputsData()
        .then((res) => {
          res.data.items.map((input) => {
            if (this.form[input.dynamic_input.uuid] !== undefined) {
              if (
                input.dynamic_input.type !== "checkbox" &&
                input.dynamic_input.type !== "file"
              ) {
                this.form[input.dynamic_input.uuid] = input.value;
              } else if (input.dynamic_input.type === "file") {
                this.imagesPaths[input.dynamic_input.uuid] = input.value_path;
              } else if (input.dynamic_input.type === "checkbox") {
                this.form[input.dynamic_input.uuid] = input.value === "true";
              }
            }
          });
        })
    },
    /**
     * upload Dunamic Inputs Data
     * @vuese
     */

    async uploadDunamicInputsData() {
      this.dynamicBtnDisabled = true;
      this.buttonClickedEffect = true;
      await profile
        .dynaimicInputsDataUpload(this.form)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.dynamicBtnDisabled = false;
          this.buttonClickedEffect = false;
          this.secondCheckDynamicInputs();
          setTimeout(() => {
            location.reload();
          }, 300);
        });
    },
    downloadImage(url, extension, label) {
      let localeExtension = "";
      if (extension.includes("jpeg")) {
        localeExtension = "jpeg";
      } else if (extension.includes("jpg")) {
        localeExtension = "jpg";
      } else if (extension.includes("gif")) {
        localeExtension = "gif";
      } else if (extension.includes("png")) {
        localeExtension = "png";
      }
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${localeExtension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

    /**
     * download item function
     * @vuese
     */
    downloadItem(url, extension, label) {
      let localeExtension = "";
      if (extension.includes("pdf")) {
        localeExtension = "pdf";
      } else if (extension.includes("word")) {
        localeExtension = "word";
      } else if (extension.includes("pptx")) {
        localeExtension = "pptx";
      } else if (extension.includes("doc")) {
        localeExtension = "doc";
      } else if (extension.includes("docx")) {
        localeExtension = "docx";
      } else if (extension.includes("gif")) {
        localeExtension = "gif";
      } else if (extension.includes("xls")) {
        localeExtension = "xls";
      } else if (extension.includes("xlsm")) {
        localeExtension = "xlsm";
      } else if (extension.includes("xlsx")) {
        localeExtension = "xlsx";
      } else if (extension.includes("zip")) {
        localeExtension = "zip";
      }
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${localeExtension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dynamic-form-holder {
  .dynamic-input,
  .b-custom-control-lg .custom-file-label {
    border: none;
    outline: none;
    box-shadow: none;
    border-radius: 15px !important;

    &:focus {
      box-shadow: 0 0 0 0.1rem #6e6e6e;
    }
  }
}
</style>
