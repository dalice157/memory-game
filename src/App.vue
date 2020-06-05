<template>
  <div id="app" class="wrap">
    <Header :scoreA="scoreA" :scoreB="scoreB" :resetGame="resetGame" />
    <div class="cards">
      <div 
        class="card" 
        v-for="(card, i) in cards" 
        :key="i" 
        :class="{ flipped: card.flipped, found: card.found }" 
        @click="flipCard(card)">
        <div class="back"></div>
        <div class="front" :style="{ backgroundImage: 'url(' + card.image + ')' }"></div>
      </div>
    </div>
    <Lightbox :user="user" :closeBox="closeBox" v-if="show" />
  </div>
</template>

<script>
import _ from 'lodash';
import Header from './components/header';
import Lightbox from './components/lightbox';
import vue from './assets/img/vue.png';
import express from './assets/img/express.png';
import mongo from './assets/img/mongodb.png';
import webpack from './assets/img/webpack.png';
import babel from './assets/img/babel.png';
import css from './assets/img/css.png';
import html from './assets/img/html.png';
import nodejs from './assets/img/nodejs.png';
import switchGame from './assets/img/switchGame.png';
import psGame from './assets/img/psGame.png';
import pubg from './assets/img/pubg.jpg';

let CardTypes = [
	{ name: "vue", image: vue },
	{ name: "express", image: express },
	{ name: "mongo", image: mongo },
	{ name: "nodejs", image: nodejs },
	{ name: "webpack", image: webpack},
	{ name: "babel", image: babel },
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
    Lightbox
  },
  data() {
    return {
      show: false,
      cards: [],
      started: false,
      startTime: 0,
      turns: 0,
      flipBackTimer: null,
      timer: null,
      time: "--:--",
      scoreA: 0,
      scoreB: 0,
      user: 'A'
    }
	},
	
	methods: {
		resetGame() {
			this.show = false;
			let cards = shuffleCards();
			this.turns = 0;
			this.scoreA = 0;
      this.scoreB = 0;
      this.user = 'A';
			this.started = false;
			this.startTime = 0;
			
			_.each(cards, (card) => {
				card.flipped = false;
				card.found = false;
			});
			
			this.cards = cards;
		},
		
		flippedCards() {
			return _.filter(this.cards, card => card.flipped);
		},
		
		sameFlippedCard() { // 翻開是一樣的
			let flippedCards = this.flippedCards();
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name){
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
				this.turns += 1;

				if (this.sameFlippedCard()) {
					// Match!
					this.flipBackTimer = setTimeout( ()=> {
						this.clearFlipBackTimer();
						this.setCardFounds();
						this.clearFlips();

						if (this.checkAllFound()) {
							this.finishGame();
						}
					}, 200);
				} else {
					// Wrong match
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
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,900|Dosis:300,400,600,700,800|Droid+Sans:400,700|Lato:300,400,700,900|PT+Sans:400,700|Ubuntu:300,400,500,700|Open+Sans:400,300,600,700|Roboto:400,300,500,700,900|Roboto+Condensed:400,300,700|Open+Sans+Condensed:300,700|Work+Sans:400,300,700|Play:400,700|Maven+Pro:400,500,700,900&subset=latin,latin-ext);
				
$backgroundColor: #292C33;
$white: White;
$masterColor: #389BFE;

* {
  box-sizing: border-box;  
}

html {
  background-color: $backgroundColor;
	color: $white;
	font-size: 16px;
	font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
	font-weight: 400;
	font-smoothing: antialiased;
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;	
}

@mixin clearfix() {
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
      clear: both;
  }
}

.wrap {
	margin: 2em;
}

.cards {
  width: 1080px;
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
	
} // .cards


</style>
