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
      @click="$emit('flipCard', card)"
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

<style lang="scss" scoped>
@import '../../scss/var';
// vue transition start
.flippe-enter-active, .flippe-leave-active {
  transition: opacity .5s;
}

.flippe-enter, .flippe-leave {
  .back {
				transform: rotateY(180deg);
			}
			
			.front {
				transform: rotateY(0deg);
			}
}
// vue transition end
.cards {
  width: 60%;
  margin: 0 auto;
	.card {
		position: relative;
		display: inline-block;
		width: 150px;
		height: 220px;
		margin: 1em 2em;

		transition: opacity .5s;

		.front, .back {
			border-radius: 5px;
			position: absolute;
			left: 0; right: 0; top: 0; bottom: 0;
			width: 100%;
			height: 100%;
			background-color: $white;
			
			backface-visibility: hidden;
			transform: translateZ(0);
			transition: transform 0.6s;
			transform-style: preserve-3d;
		}
		
		
		.back {
			background-image: url('https://p2.bahamut.com.tw/B/2KU/46/0000377946.JPG');
			background-size: 95%;
			background-position: center;
			background-repeat: no-repeat;
			
			font-size: 12px;
		}
		
		.front {
			transform: rotateY(-180deg);
			
			background-size: 90%;
			background-repeat: no-repeat;
			background-position: center;
		}
		
		&.flipped, &.found {
			.back {
				transform: rotateY(180deg);
			}
			
			.front {
				transform: rotateY(0deg);
			}
		}
		
		&.found {
			opacity: 0.3;
		}
	}
}

@media only screen and (min-width: 321px) and (max-width: 768px) {
  .cards {
    width: 100%;
    text-align: center;
    .card {
      width: 93px;
		  height: 140px;
		  margin: 1em;
    }
  }
} 

@media only screen and (max-width: 321px) {
  .cards {
    width: 100%;
    text-align: center;
    .card {
      width: 90px;
		  height: 130px;
		  margin: 1em .3em;
    }
  }
}
</style>