<template>
  <div class="info">
    <div><span class="label">Score:</span><span class="value">{{ score }} </span></div>
    <div><span class="label">Turns:</span><span class="value">{{ turns }} </span></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['score', 'turns']
}
</script>

<style src="./header.scss" lang="scss" scoped>

</style>