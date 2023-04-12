<template>
    <div class="datePicker-holder">
     <div class="from">
        <label for="example-datepicker-from">Choose a date from </label>
        <b-form-datepicker id="example-datepicker-from" v-model="fromValue" class="mb-2"></b-form-datepicker>
        <p>fromValue: '{{ fromValue }}'</p>
     </div>
     <div class="to">
        <label for="example-datepicker-to">Choose a date to </label>
        <b-form-datepicker id="example-datepicker-to" v-model="toValue" class="mb-2"></b-form-datepicker>
        <p>toValue: '{{ toValue }}'</p>
     </div>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
            fromValue: '',
            toValue:''
        }
      }
    }
  </script>