<template>
  <div class="info">
    <div><span class="label">ScoreA:</span><span class="value">{{ scoreA }} </span></div>
    <div><span class="label">ScoreB:</span><span class="value">{{ scoreB }} </span></div>
    <div><span class="label">Turns:</span><span class="value">{{ turns }} </span></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['scoreA','scoreB', 'turns']
}
</script>

<style src="./header.scss" lang="scss" scoped>

</style>