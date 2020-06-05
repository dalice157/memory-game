<template>
  <div class="wrap">
    <div class="btnWrap">
      <button class="btn" @click="resetGame()">重新開始</button>
    </div>
    <div class="info">
      <div class="label">
        <span class="title">A組：</span>
        <span class="value">{{ scoreA }}</span>
      </div>
      <div class="label">
        <span class="title">B組：</span>
        <span class="value">{{ scoreB }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['scoreA','scoreB', 'resetGame']
}
</script>

<style src="./header.scss" lang="scss" scoped></style>