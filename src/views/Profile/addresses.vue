<template>
  <div class="profile">
    <div class="addresses-page">
      <div class="page-title">
        <h2 class="profile-title">Address Book</h2>
      </div>
      <div class="form-holder">
        <v-form @submit.prevent>
          <!-- firstName  -->
          <label for="firstName"
            >First Name <span class="required">*</span></label
          >
          <v-text-field
            v-model="form.firstName"
            :rules="rules"
            id="firstName"
            hide-details="true"
            class="w-100"
          ></v-text-field>
          <!-- lastName  -->
          <label for="lastName"
            >Last Name <span class="required">*</span></label
          >
          <v-text-field
            v-model="form.lastName"
            :rules="rules"
            id="lastName"
            hide-details="true"
            class="w-100"
          ></v-text-field>
          <!-- phone  -->
          <label for="phone"
            >Phone Number <span class="required">*</span></label
          >
          <v-text-field
            v-model="form.phone"
            :rules="rules"
            id="phone"
            hide-details="true"
            placeholder="+2 111 90 30 626"
            class="w-100"
            type="number"
            min="0"
          ></v-text-field>
          <!-- address  -->
          <label for="address"
            ><h4>Address <span class="required">*</span></h4>
          </label>
          <p class="text-gray">
            Street Address: Line 1 <span class="required">*</span>
          </p>
          <v-text-field
            v-model="form.address"
            :rules="rules"
            id="address"
            hide-details="true"
            class="w-100"
            placeholder="+2 111 90 30 626"
            type="number"
            min="0"
          ></v-text-field>
          <!-- country  -->
          <label for="country">Country <span class="required">*</span></label>
          <v-select
            label="Year"
            hide-details="true"
            :items="['Egypt', 'Egypt', 'Egypt', 'Egypt', 'Egypt', 'Egypt']"
            v-model="form.country"
          ></v-select>
          <!-- state  -->
          <label for="state">State/Province <span class="required">*</span></label>
          <v-select
            label="Year"
            hide-details="true"
            :items="['cairo', 'cairo', 'cairo', 'cairo', 'cairo', 'cairo']"
            v-model="form.state"
          ></v-select>
          <button type="submit" class="mt-2 buy-btn text-black w-50">Save Changes</button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: null,
        lastName: null,
        phone: null,
        address: null,
        country: null,
        state: null,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.addresses-page {
  .form-holder {
    width: 80%;
    .v-text-field {
      width: 100% !important;
      margin-bottom: 20px;
    }
  }
}
</style>
