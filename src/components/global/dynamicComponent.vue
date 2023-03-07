<template>
    <div>
        <div class=" newForm-holder">
            <div v-for="(input, index) in dynamicInputs" :key="index" class="newForm">
                <b-form-group>

                    <div v-if="input.type == 'checkbox'">
                        <b-form-checkbox v-model="form[input.uuid]" :value="true" :unchecked-value="false">
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
                        <b-form-input :type="input.type" :id="input.uuid" v-model="form[input.uuid]" />
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>
                    <div v-if="input.type == 'file'">
                        <label :for="input.uuid">{{ $i18n.locale == 'en' ? input.title_en : input.title_ar }}</label>
                        <span class="requried tetx-danger" v-if="input.required">*</span>
                        <b-form-group>
                            <b-form-file size="lg" v-model="form[input.uuid]" 
                                :placeholder="$t('profile.filePlaceHolder')"></b-form-file>
                        </b-form-group>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>

                    <div v-if="input.type == 'select'">
                        <label :for="input.uuid">{{ $i18n.locale == 'en' ? input.title_en : input.title_ar }}</label>
                        <span class="requried tetx-danger" v-if="input.required">*</span>
                        <b-form-select v-model="form[input.uuid]">
                            <b-form-select-option v-for="(inputValue, index) in input.values" :key="index"
                                :value="inputValue.en">
                                {{ $i18n.locale == 'en' ? inputValue.en : inputValue.ar }}
                            </b-form-select-option>
                        </b-form-select>
                        <div class="error" v-for="(error, index) in errors[input.uuid]" :key="index">
                            {{ error }}
                        </div>
                    </div>

                </b-form-group>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dynamicInputs', 'form', 'errors']
}
</script>

<style></style>