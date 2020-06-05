<template>
  <div class="box">
    <div class="overlay"></div>
    <div class="content">
      <div class="title">你猜錯了，換 {{user}} 猜。</div>
      <button @click="closeBox()">關閉</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Lightbox',
    props: ['user', 'closeBox']
  }
</script>
<style src="./lightbox.scss" lang="scss" scoped></style>