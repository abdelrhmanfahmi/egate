<template>
    <div class="container newsletter-popup-container" id="newsletter-popup-form">
        <div class="row justify-content-center">
            <div class="col-12">
                <!-- <div class="row no-gutters bg-white newsletter-popup-content"> -->
                <div class="row justify-content-center align-items-center newsletter-popup-content">
                    <div class="col-12">
                        <b-img-lazy :src="supplierAds.image_path" height="420" class="newsletter-img" width="800"
                            alt="newsletter"></b-img-lazy>
                    </div>
                </div>
            </div>
        </div>
        <button title="Close (Esc)" type="button" class="mfp-close" @click="closeModal">
            <!-- <span>×</span> -->
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </button>
        <div class="viewProduct" v-if="supplierAds.model_type === 'product'">
            <router-link :to="{ path: 'details', query: { id: supplierAds.model_id } }" class="">
                <b><span>{{ $t("profile.viewDetails") }}
                        <font-awesome-icon icon="fa-solid fa-store" />
                    </span></b>
            </router-link>
        </div>
        <div class="viewProduct" v-if="supplierAds.model_type === 'category'">
            <router-link :to="`categories/${supplierAds.model_id}`" class="">
                <b><span>{{ $t("profile.viewDetails") }}
                        <font-awesome-icon icon="fa-solid fa-store" />
                    </span></b>
            </router-link>
        </div>
        <div class="viewProduct" v-if="supplierAds.model_type === 'supplier'">
            <router-link :to="`suppliers/${supplierAds.model_id}`" class="">
                <b><span>{{ $t("profile.viewDetails") }}
                        <font-awesome-icon icon="fa-solid fa-store" />
                    </span></b>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapMutations } from "vuex";
import auth from "@/services/auth";
export default {
    data: function () {
        return {
            checkState: false,
        };
    },
    watch: {
        $route: function () {
            this.$emit("close");
        },
    },
    methods: {
        ...mapMutations("demo", { hideNewsletter: "HIDE_NEWSLETTER" }),
        changeCheck: function () {
            this.checkState = !this.checkState;
        },
        closeModal: function () {
            if (this.checkState) {
                this.hideNewsletter();
            }

            this.$emit("close");
            this.postSupplierShowenAd()
        },
        postSupplierShowenAd(add) {
            auth.postSupplierShowenAd(add).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    props: ["supplierAds"],
};
</script>
  