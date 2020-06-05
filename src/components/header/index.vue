<template>
  <div class="info">
    <div class="label">
      <span class="title">ScoreA：</span>
      <span class="value">{{ scoreA }}</span>
    </div>
    <div class="label">
      <span class="title">ScoreB：</span>
      <span class="value">{{ scoreB }}</span>
    </div>
    <button class="btn" @click="resetGame()">重新開始</button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['scoreA','scoreB', 'resetGame']
}
</script>

<style src="./header.scss" lang="scss" scoped>

</style>