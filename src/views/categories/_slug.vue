<template>
  <div>
    <div class="cover text-center">
      <div class="cover-data p-5 d-flex justify-content-center align-items-center flex-column">
        <b-container>
          <div class="cover-title">
            <h2>cover title</h2>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">{{ $t("Home") }}</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#">{{ $t("Library") }}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  {{ $t("Data") }}
                </li>
              </ol>
            </nav>
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.slug,
    };
  },
};
</script>

<style lang="scss" scoped>
.cover-data {
  //local now
  background: url("../../assets/images/cover.png") no-repeat center;
}
</style>
