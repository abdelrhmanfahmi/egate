<template>
  <div class="documentsB2b" :class="$i18n.locale">
    <div class="all-documents">
      <div class="header d-flex justify-content-between">
        <h5>{{ $t("profile.companyDocuments") }}</h5>
        <!-- <a href="#">
          {{ $t("profile.saveData") }}
          <span class="save-icon">
            <b-icon-arrow-right></b-icon-arrow-right>
          </span>
        </a> -->
      </div>
      <!-- buissnessinfoUpload -->
      <form class="buissnessinfo mb-5" @submit.prevent="buissnessinfoUpload">
        <div class="form-input mb-4">
          <label for="CommercialLicense">
            {{ $t("profile.commercialLicense") }} 
            <span class="text-danger">*</span>
          </label>
          <div
            class="row justify-content-center align-content-center"
            v-if="buisnessData"
          >
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  id="CommercialLicense"
                  @change="CommercialLicense"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-items-center"
                v-if="buisnessData"
              >
                <div
                  class=""
                  v-if="ccl_pathType === 'image' && ccl_pathType !== null"
                >
                  <img
                    v-b-modal.ccl_path
                    :src="buisnessData.ccl_path"
                    alt="moa-image"
                    v-if="buisnessData.ccl_path"
                  />

                  <b-modal
                    id="ccl_path"
                    :title="$t('profile.commercialLicense')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.commercialLicense") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="buisnessData.ccl_path"
                        alt="moa-image"
                        v-if="buisnessData.ccl_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            buisnessData.ccl_path,
                            (extension = buisnessData.ccl_path
                              .split('.')
                              .pop()),
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
                  class=""
                  v-else-if="
                    ccl_pathType === 'document' && ccl_pathType !== null
                  "
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        buisnessData.ccl_path,
                        (extension = buisnessData.ccl_path.split('.').pop()),
                        $t('profile.commercialLicense')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.ccl"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="signatureAccreditation">
            {{ $t("profile.signatureAccreditation") }}
            <span class="text-danger">*</span>
          </label>

          <div class="row justify-content-center align-content-center">
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  id="CommissionerCard"
                  size="lg"
                  @change="signatureAccreditation"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div
                  class=""
                  v-if="
                    auth_civil_copyType === 'image' &&
                    auth_civil_copyType !== null
                  "
                >
                  <img
                    v-b-modal.auth_civil_copy_path
                    :src="buisnessData.auth_civil_copy_path"
                    alt="moa-image"
                    v-if="buisnessData.auth_civil_copy_path"
                  />

                  <b-modal
                    id="auth_civil_copy_path"
                    :title="$t('profile.signatureAccreditation')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.signatureAccreditation") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="buisnessData.auth_civil_copy_path"
                        alt="moa-image"
                        v-if="buisnessData.auth_civil_copy_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            buisnessData.auth_civil_copy_path,
                            (extension = buisnessData.auth_civil_copy_path
                              .split('.')
                              .pop()),
                            $t('profile.signatureAccreditation')
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
                  class=""
                  v-else-if="
                    auth_civil_copyType === 'document' &&
                    auth_civil_copyType !== null
                  "
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        buisnessData.auth_civil_copy_path,
                        (extension = buisnessData.auth_civil_copy_path
                          .split('.')
                          .pop()),
                        $t('profile.signatureAccreditation')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.auth_civil_copy"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="commissionerCard">
            {{ $t("profile.commissionerCard") }}
            <span class="text-danger">*</span>
          </label>

          <div class="row justify-content-center align-content-center">
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  @change="commissionerCard"
                  id="SignatureAccreditation"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div class="" v-if="ccsType === 'image' && ccsType !== null">
                  <img
                    v-b-modal.ccs_path
                    :src="buisnessData.ccs_path"
                    alt="moa-image"
                    v-if="buisnessData.ccs_path"
                  />

                  <b-modal
                    id="ccs_path"
                    :title="$t('profile.commissionerCard')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.commissionerCard") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="buisnessData.ccs_path"
                        alt="moa-image"
                        v-if="buisnessData.ccs_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            buisnessData.ccs_path,
                            (extension = buisnessData.ccs_path
                              .split('.')
                              .pop()),
                            $t('profile.commissionerCard')
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
                  class=""
                  v-else-if="ccsType === 'document' && ccsType !== null"
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        buisnessData.ccs_path,
                        (extension = buisnessData.ccs_path.split('.').pop()),
                        $t('profile.commissionerCard')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.ccs_path"
            :key="index"
          >
            {{ error }}
          </div>
        </div>

        <div class="form-input mb-4">
          <label for="certificateAdministration">
            {{ $t("profile.certificateAdministration") }}
          </label>

          <div class="row justify-content-center align-content-center">
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  @change="certificateAdministration"
                  id="certificateAdministration"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div class="" v-if="rmcmType === 'image' && rmcmType !== null">
                  <img
                    v-b-modal.rmcm_path
                    :src="buisnessData.rmcm_path"
                    alt="moa-image"
                    v-if="buisnessData.rmcm_path"
                  />

                  <b-modal
                    id="rmcm_path"
                    :title="$t('profile.certificateAdministration')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.certificateAdministration") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="buisnessData.rmcm_path"
                        alt="moa-image"
                        v-if="buisnessData.rmcm_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            buisnessData.rmcm_path,
                            (extension = buisnessData.rmcm_path
                              .split('.')
                              .pop()),
                            $t('profile.certificateAdministration')
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
                  class=""
                  v-else-if="rmcmType === 'document' && rmcmType !== null"
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        buisnessData.rmcm_path,
                        (extension = buisnessData.rmcm_path.split('.').pop()),
                        $t('profile.certificateAdministration')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.rmcm"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="outline-danger"
          class="saveBtn btn-block py-3"
          :disabled="btn1Disabled"
        >
          <i class="fa fa-upload"></i> {{ $t("profile.save") }}
          <span class="loader" v-if="buissnessinfoUploadLoading"></span>
        </b-button>
      </form>

      <!-- suppDocUpload -->

      <form class="suppDoc mb-5" @submit.prevent="suppDocUploadForm">
        <div class="form-input mb-4">
          <label for="establishmentContract">
            {{ $t("profile.establishmentContract") }}
          </label>

          <div
            class="row justify-content-center align-content-center"
            v-if="suppData"
          >
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  @change="suppDocUploadMoa"
                  id="establishmentContract"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div class="" v-if="moaType === 'image' && moaType !== null">
                  <img
                    v-b-modal.moaModal
                    :src="suppData.moa_path"
                    alt="moa-image"
                    v-if="suppData.moa_path"
                  />

                  <b-modal
                    id="moaModal"
                    :title="$t('profile.establishmentContract')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.establishmentContract") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="suppData.moa_path"
                        alt="moa-image"
                        v-if="suppData.moa_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            suppData.moa_path,
                            (extension = suppData.moa_path.split('.').pop())
                          ),
                            $t('profile.establishmentContract')
                        "
                      >
                        <i class="fa fa-download"></i>
                        {{ $t("profile.download") }}
                      </b-button>
                    </template>
                  </b-modal>
                </div>
                <div
                  class=""
                  v-else-if="moaType === 'document' && moaType !== null"
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        suppData.moa_path,
                        (extension = suppData.moa_path.split('.').pop()),
                        $t('profile.establishmentContract')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.moa"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <div class="form-input mb-4">
          <label for="IbanCertificate">
            {{ $t("profile.letterAuthorization") }}
          </label>

          <div
            class="row justify-content-center align-content-center"
            v-if="buisnessData"
          >
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  @change="suppDocUploadSad"
                  id="CertificateAdministration"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div class="" v-if="sadType === 'image'">
                  <img
                    v-b-modal.sadModal
                    :src="suppData.sad_path"
                    alt="moa-image"
                    v-if="suppData.sad_path"
                  />

                  <b-modal
                    id="sadModal"
                    :title="$t('profile.letterAuthorization')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.letterAuthorization") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="suppData.sad_path"
                        alt="moa-image"
                        v-if="suppData.sad_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            downloadItem.sad_path,
                            (extension = downloadItem.sad_path
                              .split('.')
                              .pop()),
                            $t('profile.letterAuthorization')
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
                  class=""
                  v-else-if="sadType === 'document' && sadType !== null"
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        suppData.sad_path,
                        (extension = suppData.sad_path.split('.').pop()),
                        $t('profile.letterAuthorization')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>

          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.sad"
            :key="index"
          >
            {{ error }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="outline-danger"
          class="saveBtn btn-block py-3"
          :disabled="btn2Disabled"
        >
          <i class="fa fa-upload"></i> {{ $t("profile.save") }}
          <span class="loader" v-if="suppDataLoading"></span>
        </b-button>
      </form>

      <!-- bank iban  -->

      <form lass="suppDoc" @submit.prevent="ibanUpload">
        <div class="form-input mb-4">
          <label for="LetterAuthorization">
            {{ $t("profile.ibanCertificate") }}
            <span class="text-danger">*</span>
          </label>
          <div
            class="row justify-content-center align-content-center"
            v-if="suppData"
          >
            <div class="col-md-8 col-sm-12 mb-3">
              <b-form-group>
                <b-form-file
                  size="lg"
                  @change="bankIbanUpload"
                  id="LetterAuthorization"
                  :placeholder="$t('profile.filePlaceHolder')"
                  drop-placeholder="Drop file here..."
                ></b-form-file>
              </b-form-group>
            </div>
            <div class="col-md-4 col-sm-12 mb-3">
              <div
                class="d-flex justify-content-center align-content-center"
                v-if="buisnessData"
              >
                <div class="" v-if="ibanType === 'image' && ibanType !== null">
                  <img
                    v-b-modal.ibanModal
                    :src="ibanData.iban_number_certificate_path"
                    alt="moa-image"
                    v-if="ibanData.iban_number_certificate_path"
                  />

                  <b-modal
                    id="ibanModal"
                    :title="$t('profile.ibanCertificate')"
                  >
                    <template #modal-header="{ close }">
                      <!-- Emulate built in modal header close button action -->
                      <h5>
                        {{ $t("profile.ibanCertificate") }}
                      </h5>

                      <b-button
                        size="sm"
                        variant="outline-danger"
                        @click="close()"
                      >
                        x
                      </b-button>
                    </template>

                    <template>
                      <img
                        :src="ibanData.iban_number_certificate_path"
                        alt="moa-image"
                        v-if="ibanData.iban_number_certificate_path"
                        class="img-fluid w-100"
                      />
                    </template>

                    <template #modal-footer>
                      <!-- Emulate built in modal footer ok and cancel button actions -->
                      <b-button
                        class="btn-block"
                        variant="outline-success"
                        @click="
                          downloadImage(
                            ibanData.iban_number_certificate_path,
                            (extension = ibanData.iban_number_certificate_path
                              .split('.')
                              .pop()),
                            $t('profile.ibanCertificate')
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
                  class=""
                  v-else-if="ibanType !== 'image' && ibanType !== null"
                >
                  <b-button
                    variant="outline-success"
                    @click="
                      downloadItem(
                        ibanData.iban_number_certificate_path,
                        (extension = ibanData.iban_number_certificate_path
                          .split('.')
                          .pop()),
                        $t('profile.ibanCertificate')
                      )
                    "
                  >
                    <i class="fa fa-download"></i> {{ $t("profile.download") }}
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="error text-start"
            v-for="(error, index) in uploadErrors.iban_code"
            :key="index"
          >
            {{ error }}
          </div>
          <div class="error text-start" v-if="unOuthMesssage">
            {{ unOuthMesssage }}
          </div>
        </div>
        <b-button
          type="submit"
          variant="outline-danger"
          class="saveBtn btn-block py-3"
          :disabled="btn3Disabled"
        >
          <i class="fa fa-upload"></i> {{ $t("profile.save") }}

          <span class="loader" v-if="ibanUploadLoading"></span>
        </b-button>

        <!-- <img src="" alt="" /> -->
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import profile from "@/services/profile";
export default {
  components: {
    // BIconArrowRight,
  },
  data() {
    return {
      uploadErrors: {},
      errors: {},
      buissnessinfoUploadLoading: false,
      suppDataLoading: false,
      ibanUploadLoading: false,
      btn1Disabled: false,
      btn2Disabled: false,
      btn3Disabled: false,
      buissnessinfo: {
        ccl: null,
        auth_civil_copy: null,
        ccs: null,
        rmcm: null,
      },
      suppDocUploadInfo: {
        moa: null,
        sad: null,
      },
      bankIban: {
        iban: null,
      },
      // represent data
      suppData: null,
      buisnessData: null,
      ibanData: null,
      unOuthMesssage: null,

      ccl_pathType: null,
      auth_civil_copyType: null,
      ccsType: null,
      rmcmType: null,

      moaType: null,
      sadType: null,

      ibanType: null,
    };
  },
  mounted() {
    profile.getSuppDocUploadData().then((res) => {
      // console.log("second", res.data);
      this.suppData = res.data.items;
      let url1 = res.data.items.moa_path;
      let url2 = res.data.items.sad_path;
      if (url1.match(/.(jpeg|jpg|gif|png)$/)) {
        this.moaType = "image";
      } else {
        this.moaType = "document";
      }

      if (url2.match(/.(jpeg|jpg|gif|png)$/)) {
        this.sadType = "image";
      } else {
        this.sadType = "document";
      }
    });
    profile.getBuissnessinfodata().then((res) => {
      this.buisnessData = res.data.items;
      // console.log("first", res.data.items);
      let url1 = res.data.items.ccl_path;
      let url2 = res.data.items.auth_civil_copy_path;
      let url3 = res.data.items.ccs_path;
      let url4 = res.data.items.rmcm_path;
      if (url1.match(/.(jpeg|jpg|gif|png)$/)) {
        this.ccl_pathType = "image";
      } else {
        this.ccl_pathType = "document";
      }

      if (url2.match(/.(jpeg|jpg|gif|png)$/)) {
        this.auth_civil_copyType = "image";
      } else {
        this.auth_civil_copyType = "document";
      }

      if (url3.match(/.(jpeg|jpg|gif|png)$/)) {
        this.ccsType = "image";
      } else {
        this.ccsType = "document";
      }

      if (url4.match(/.(jpeg|jpg|gif|png)$/)) {
        this.rmcmType = "image";
      } else {
        this.rmcmType = "document";
      }
    });
    profile.getibanUploadData().then((res) => {
      console.log("third", res.data.items);
      this.ibanData = res.data.items;
      let url = res.data.items.iban_number_certificate_path;
      if (url.match(/.(jpeg|jpg|gif|png)$/)) {
        this.ibanType = "image";
      } else if (!url.match(/.(jpeg|jpg|gif|png)$/)) {
        this.ibanType = "document";
      }
    });
  },
  methods: {
    downloadImage(url, extension, label) {
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${extension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    downloadItem(url, extension, label) {
      console.log(url);
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${extension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    uploadPicture(e) {
      // e.target.nextElementSibling.style.display = "flex";
      // e.target.nextElementSibling.src = URL.createObjectURL(e.target.files[0]);
      let formData = new FormData();

      console.log(e.target.files[0].type);
      if (e.target.files[0].type.split("/")[0] === "image") {
        formData.append("file", e);
      } else if (e.target.files[0].type.split("/")[0] === "application") {
        formData.append("file", e);
      } else {
        console.log("other format");
        // return false
      }
    },
    async suppDocUpload() {
      let formData = "";
      await profile
        .suppDocUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // buisness info change functions
    CommercialLicense(e) {
      this.buissnessinfo.ccl = e.target.files[0];
      // this.buissnessinfo.ccl.value = e.target.files[0];
      // if (e.target.files[0].type.split("/")[0] === "image") {
      //   this.buissnessinfo.ccl.image = true;
      //   this.buissnessinfo.ccl.document = false;

      //   setTimeout(() => {
      //     e.target.nextElementSibling.style.display = "flex";
      //     e.target.nextElementSibling.src = URL.createObjectURL(
      //       e.target.files[0]
      //     );
      //   }, 300);

      //   console.log("image");
      // } else if (e.target.files[0].type.split("/")[0] === "application") {
      //   this.buissnessinfo.ccl.image = false;
      //   this.buissnessinfo.ccl.document = true;
      //   this.buissnessinfo.ccl.url = e.target.files[0].ccl;
      // }
      // this.checkBtn1();
    },
    signatureAccreditation(e) {
      this.buissnessinfo.auth_civil_copy = e.target.files[0];
      // this.checkBtn1();
    },
    commissionerCard(e) {
      this.buissnessinfo.ccs = e.target.files[0];
      // this.checkBtn1();
    },
    certificateAdministration(e) {
      this.buissnessinfo.rmcm = e.target.files[0];
      // this.checkBtn1();
    },

    // buisness info upload function
    async buissnessinfoUpload() {
      this.buissnessinfoUploadLoading = true;
      this.btn1Disabled = true;
      const formData = new FormData();
      if (this.buissnessinfo.ccl !== null) {
        formData.append("ccl", this.buissnessinfo.ccl);
      }
      if (this.buissnessinfo.auth_civil_copy !== null) {
        formData.append("auth_civil_copy", this.buissnessinfo.auth_civil_copy);
      }
      if (this.buissnessinfo.ccs !== null) {
        formData.append("ccs", this.buissnessinfo.ccs);
      }
      if (this.buissnessinfo.rmcm !== null) {
        formData.append("rmcm", this.buissnessinfo.rmcm);
      }
      // console.log(this.userData.type);

      formData.append("portal", "buyer");

      await profile
        .buissnessinfoUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.suppData = [];
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
          console.log(res);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.buissnessinfoUploadLoading = false;
          this.btn1Disabled = false;
          console.log("formData", formData);
        });
    },

    // buisness info get data function
    async getBuissnessinfodata() {
      await profile
        .getBuissnessinfodata()
        .then((res) => {
          this.sucessMsg(res.data.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // suppDocUpload change functions
    suppDocUploadMoa(event) {
      this.suppDocUploadInfo.moa = event.target.files[0];
      // this.checkBtn2();
    },
    suppDocUploadSad(event) {
      this.suppDocUploadInfo.sad = event.target.files[0];
      // this.checkBtn2();
    },

    // suppDocUpload upload function

    async suppDocUploadForm() {
      this.suppDataLoading = true;
      this.btn2Disabled = true;
      const formData = new FormData();

      if (this.suppDocUploadInfo.moa !== null) {
        formData.append("moa", this.suppDocUploadInfo.moa);
      }
      if (this.suppDocUploadInfo.sad !== null) {
        formData.append("sad", this.suppDocUploadInfo.sad);
      }

      formData.append("portal", "buyer");

      await profile
        .suppDocUpload(formData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.suppData = res.data.items;
          this.getSuppDocUploadData();
          if (res.status == 200) {
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          this.suppDataLoading = false;
          this.btn2Disabled = false;
          location.reload();
        });
      console.log(formData);
    },

    // suppDocUpload get data function
    async getSuppDocUploadData() {
      await profile
        .getSuppDocUploadData()
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },

    // bankIbanUpload change function
    bankIbanUpload(event) {
      this.bankIban.iban = event.target.files[0];
      // this.checkBtn3();
    },

    // bankIbanUpload upload function
    async ibanUpload() {
      this.ibanUploadLoading = true;
      this.btn3Disabled = true;
      const formData = new FormData();
      if (this.bankIban.iban !== null) {
        formData.append("iban_number_certificate", this.bankIban.iban);
      }

      formData.append("portal", "buyer");
      await profile
        .ibanUpload(formData)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            this.getibanUploadData();
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
          if (error.response.status == 401) {
            this.unOuthMesssage = error.response.data.message;
            setTimeout(() => {
              localStorage.clear();
              window.location.push("/");
            }, 1500);
          }
          console.log("ibanUpload", err);
        })
        .finally(() => {
          this.ibanUploadLoading = false;
          this.btn3Disabled = false;
          location.reload(); //
        });
    },

    // buisness info get data function
    async getibanUploadData() {
      await profile
        .getibanUploadData()
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.uploadErrors = err.items;
          this.errMsg(err.message);
        });
    },
    //btn 1 check
    // checkBtn1() {
    //   if (
    //     this.buissnessinfo.ccc !== null &&
    //     this.buissnessinfo.auth_civil_copy !== null &&
    //     this.buissnessinfo.ccs !== null &&
    //     this.buissnessinfo.rmcm !== null
    //   ) {
    //     this.btn1Disabled = false;
    //   }
    // },
    // //btn 2 check
    // checkBtn2() {
    //   if (
    //     this.suppDocUploadInfo.moa !== null &&
    //     this.suppDocUploadInfo.sad !== null
    //   ) {
    //     this.btn2Disabled = false;
    //   }
    // },
    // //btn 3 check
    // checkBtn3() {
    //   if (this.bankIban.iban !== null) {
    //     this.btn3Disabled = false;
    //   }
    // },

    // checkURL(url) {
    //   return url.match(/.(jpeg|jpg|gif|png)$/) != null;
    // },

    // suppDocUpload change functionsF
  },
  created() {
    if (this.userInfo === "b2c") {
      this.$router.push("/");
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo.item.type;
    },
  },
};
</script>
<style lang="scss" scoped>
.documentsB2b {
  .all-documents {
    .header {
      h5 {
        font-size: 16pt;
        margin-bottom: 1rem;
      }
      a {
        color: #312620;
        &:hover {
          color: #ed2124;
        }
      }
    }
    form {
      .form-input {
        label {
          text-align: start;
          display: block;
          font-size: 10pt;
          color: #565656;
          margin-bottom: 0.7rem;
        }
        input {
          width: 100%;
          border: 1px solid #dcdcdc;
          padding: 1.25rem;
          margin-inline-end: 1rem;
        }
        img {
          width: 20rem;
          // display: none;
        }
        .input-img {
          height: 4.5rem;
        }
      }
    }
  }
}
html:lang(ar) {
  .save-icon {
    transform: rotateZ(180deg);
  }
}
.loader {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid blue;
  border-bottom: 4px solid blue;
  width: 20px;
  height: 20px;
  margin: -4px 4px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
button:disabled {
  cursor: no-drop;
}

.savebtn {
  background-color: DodgerBlue;
  border: none;
  color: white;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 20px;
}

/* Darker background on mouse-over */
.savebtn:hover {
  background-color: RoyalBlue;
}
</style>
