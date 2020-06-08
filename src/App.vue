<template>
  <div id="app" class="wrap">
    <Header 
      :scoreA="scoreA" 
      :scoreB="scoreB" 
      :resetGame="resetGame" 
    />
    <Card 
      :cards="cards"
      :flipCard="flipCard"
    />
    <transition name="fade">
      <Lightbox 
        :user="user" 
        :closeBox="closeBox" 
        v-if="show" 
      />
    </transition>
  </div>
</template>

<script>
import _ from 'lodash';
import Header from './components/header';
import Card from './components/card';
import Lightbox from './components/lightbox';
import vue from './assets/img/vue.png';
import css from './assets/img/css.png';
import html from './assets/img/html.png';
import switchGame from './assets/img/switchGame.png';
import psGame from './assets/img/psGame.png';
import pubg from './assets/img/pubg.jpg';

let CardTypes = [
	{ name: "vue", image: vue },
  { name: "css", image: css },
  { name: "html", image: html },
  { name: "switchGame", image: switchGame },
  { name: "psGame", image: psGame },
  { name: "pubg", image: pubg },
];

let shuffleCards = () => { //亂數排序
	let cards = [].concat(_.cloneDeep(CardTypes), _.cloneDeep(CardTypes));
	return _.shuffle(cards);
}

export default {
  name: 'App',
  components: {
    Header,
    Lightbox,
    Card
  },
  data() {
    return {
      show: false,
      cards: [],
      flipBackTimer: null,
      scoreA: 0,
      scoreB: 0,
      user: 'A'
    }
	},
	
	methods: {
		resetGame() {
			this.show = false;
			let cards = shuffleCards();
			this.scoreA = 0;
      this.scoreB = 0;
      this.user = 'A';
			
			_.each(cards, (card) => {
				card.flipped = false;
				card.found = false;
			});
			
			this.cards = cards;
		},
		
		flippedCards() { // 將有翻轉的過濾出來
			return _.filter(this.cards, card => card.flipped);
		},
		
		sameFlippedCard() { // 翻開後
			let flippedCards = this.flippedCards();
			if (flippedCards.length == 2 && flippedCards[0].name == flippedCards[1].name) {
        switch (this.user) {
          case 'A':
            return this.scoreA = this.scoreA + 1;
            break;
          case 'B':
            return this.scoreB = this.scoreB + 1;
            break;
          default:
            break;
        }
        return true;
			}
		},
		
		setCardFounds() {
			_.each(this.cards, (card) => {
				if (card.flipped)
					card.found = true;
			});
		},
		
		checkAllFound() {
			let foundCards = _.filter(this.cards, card => card.found);
			if (foundCards.length == this.cards.length)
				return true;
		},

    closeBox() {
      this.show = false;
    },
		
		flipCard(card) {
			if (card.found || card.flipped) return;
			
			let flipCount = this.flippedCards().length;
			
			if (flipCount == 0) {
				card.flipped = !card.flipped;
			} else if (flipCount == 1) {
				card.flipped = !card.flipped;

				if (this.sameFlippedCard()) {
					// 猜中
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.setCardFounds();
						this.clearFlips();

						if (this.checkAllFound()) {
							this.finishGame();
						}
					}, 200);
				} else {
					// 猜錯
					this.flipBackTimer = setTimeout( ()=> {
            this.user = this.user === 'A' ? 'B' : 'A';
            this.show = true;
            this.clearFlipBackTimer();
            this.clearFlips();
					}, 1000);
				}
			}
		},
		
		clearFlips() {
			_.map(this.cards, card => card.flipped = false);
		},
	
		clearFlipBackTimer() {
			clearTimeout(this.flipBackTimer);
			this.flipBackTimer = null;
		}
	},
	
	created() {
		this.resetGame();
	}
}
</script>

<style lang="scss">
@import './scss/_var.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html, body {
  min-height: 100%;
}

html {
  background-color: $backgroundColor;
	color: $white;
	font-size: 16px;
	font-family: 'Helvetica', 'Arial', sans-serif;
	font-weight: 400;
	font-smoothing: antialiased;
}

.wrap {
  height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: all .6s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
