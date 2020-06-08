<template>
<div class="cards">
  <transition-group 
    name="flippe" 
    tag="div"
  >
    <div
      class="card" 
      v-for="(card, i) in cards" 
      :key="i" 
      :class="{ flipped: card.flipped, found: card.found }" 
      @click="flipCard(card)"
    >
    <div class="back"></div>
    <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
    </div>
  </transition-group>
</div>
</template>

<script>
  export default {
    name: 'Card',
    props: ['cards','flipCard']
  }
  
</script>

<style src="./card.scss" lang="scss" scoped></style>