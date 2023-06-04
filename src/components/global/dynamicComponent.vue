<template>
    <div :class="{'dynamic-form-holder':cartPage}">
        <div class=" newForm-holder">
            <div v-for="(input, index) in dynamicInputs" :key="index" class="newForm">
                <b-form-group>

                    <div v-if="input.type == 'checkbox'">
                        <b-form-checkbox v-model="form[input.uuid]" :value="true" :unchecked-value="false"
                            :class="{'dynamic-input':cartPage}">
                            <span>{{ $i18n.locale == 'en' ? input.title_en : input.title_ar }}</span> <span
                                class="requried tetx-danger" v-if="input.required">*</span>
                        </b-form-checkbox>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>
                    <div v-if="input.type == 'text'">
                        <label :for="input.uuid">{{ $i18n.locale == 'en' ? input.title_en : input.title_ar }}</label>
                        <span class="requried tetx-danger" v-if="input.required">*</span>
                        <b-form-input :type="input.type" :id="input.uuid" v-model="form[input.uuid]"
                            :class="{'dynamic-input':cartPage}" />
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>
                    <div v-if="input.type == 'file'">
                        <div class="row">
                            <div :class="{ 'col-md-6 col-sm-12': input.values, 'col-12': !input.values }">
                                <label :for="input.uuid">{{ $i18n.locale == 'en' ? input.title_en : input.title_ar
                                }}</label>
                                <span class="requried tetx-danger" v-if="input.required">*</span>
                                <b-form-group>
                                    <b-form-file size="lg" v-model="form[input.uuid]" :class="{'dynamic-input':cartPage}"
                                        :placeholder="$t('profile.filePlaceHolder')"></b-form-file>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>

                    <div v-if="input.type == 'select'">
                        <label :for="input.uuid">{{ $i18n.locale == 'en' ? input.title_en : input.title_ar }}</label>
                        <span class="requried tetx-danger" v-if="input.required">*</span>
                        <b-form-select v-model="form[input.uuid]" :class="{'dynamic-input':cartPage}">
                            <b-form-select-option value="null" disabled>{{ $t('payment.selectExist')
                            }}</b-form-select-option>
                            <b-form-select-option v-for="(inputValue, index) in input.values" :key="index"
                                :value="inputValue.en" :class="{'dynamic-input':cartPage}">
                                {{ $i18n.locale == 'en' ? inputValue.en : inputValue.ar }}
                            </b-form-select-option>
                        </b-form-select>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>

                </b-form-group>
            </div>
            <b-button v-if="documentsPage == true" type="submit" variant="outline-danger" class="saveBtn btn-block py-3"
                :disabled="dynamicBtnDisabled" @click="buttonClicked">
                <i class="fa fa-upload"></i> {{ $t("profile.save") }}
                <span class="loader" v-if="buttonClickedEffect"></span>
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dynamicInputs','dynamicForm', 'form', 'errors' , 'dynamicBtnDisabled'],
    data() {
        return {
            currentRoute: this.$route,
            documentsPage: false,
            buttonClickedEffect: false,
            cartPage: false,
        }
    },
    mounted() {
        if (this.currentRoute.path.includes('documents')) {
            this.documentsPage = true
        }
        if (this.currentRoute.path.includes('cart')) {
            this.cartPage = true
        }
    },
    methods: {
        buttonClicked() {
            this.buttonClickedEffect = true
            this.$emit('btnClicked')
            setTimeout(() => {
                this.buttonClickedEffect = false
            }, 3000);
        }
    }
}
</script>

<style lang="scss" scoped>
.dynamic-form-holder{

    .dynamic-input , .b-custom-control-lg .custom-file-label {
        border: none;
        outline: none;
        box-shadow: none;
        border-radius: 15px !important;
        &:focus{
            box-shadow: 0 0 0 0.1rem #6e6e6e;
        }
    }
}
</style>