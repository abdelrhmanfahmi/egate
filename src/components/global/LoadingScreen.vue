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
<style>
#loading {
  position: fixed;
  z-index: 1000;
  background-color: white;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
