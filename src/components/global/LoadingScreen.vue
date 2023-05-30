<template>
  <div class="loading-com">
    <div id="loading">
      <img
        class="img"
        src="@/assets/images/new-design/loading-screen.gif"
        alt="loading..."
        width="200"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped lang="scss">
#loading {
  position: fixed;
  z-index: 999999999;
  background-color: #fbfbfb;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:100%;
  img {
    width: 70%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
