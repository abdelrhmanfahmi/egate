<template>
  <div>
    <v-dialog transition="dialog-bottom-transition" width="100%" height="50%">
      <template v-slot:activator="{ props }">
        <span class="iconHolder seachIcon cursor-pointer m-0" v-bind="props">
          <v-icon icon="mdi-magnify"></v-icon
        ></span>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar
            color="orange"
            title="Search By Product Name"
            class="p-0 m-0 text-center"
          ></v-toolbar>
          <v-card-text>
            <form>
              <input type="search" placeholder="search" class="searchInput" name="searchWord" v-model="searchWord" id="searchWord">
            </form>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn variant="text" @click="isActive.value = false">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data(){
    return{
      searchWord:''
    }
  }
}
</script>
<style lang="scss" scoped>
.searchInput{
  padding: 15px;
  border: 1px solid $gray;
  border-radius: 5px;
  width: 100%;
}
</style>