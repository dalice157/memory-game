<template>
  <div id="app">
    <div class="info">
      <div><span class="label">Time:</span><span class="value">{{ time }} </span></div>
      <div><span class="label">Turns:</span><span class="value">{{ turns }} </span></div>
    </div>
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
    <div class="splash" v-if="showSplash">
      <div class="overlay"></div>
      <div class="content">
        <div class="title">You won!</div>
        <div class="score">Score: {{ score }}</div>
        <button class="newGame" @click="resetGame()">New game</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
let CardTypes = [
	{ name: "vue", image: "https://vuejs.org/images/logo.png" },
	{ name: "express", image: "https://coligo.io/images/express.svg" },
	{ name: "mongo", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" },
	{ name: "nodejs", image: "https://worldvectorlogo.com/logos/nodejs-icon.svg" },
	{ name: "webpack", image: "https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" },
	{ name: "babel", image: "https://babeljs.io/images/logo.svg" },
	//{ name: "jade", image: "http://jade-lang.com/style/jade-logo-header.svg" },
];
let shuffleCards = () => {
	let cards = [].concat(_.cloneDeep(CardTypes), _.cloneDeep(CardTypes));
	return _.shuffle(cards);
}
export default {
  data() {
    return {
      showSplash: false,
      cards: [],
      started: false,
      startTime: 0,
      turns: 0,
      flipBackTimer: null,
      timer: null,
      time: "--:--",
      score: 0
    }
		
	},
	
	methods: {
		resetGame() {
			this.showSplash = false;
			let cards = shuffleCards();
			this.turns = 0;
			this.score = 0;
			this.started = false;
			this.startTime = 0;
			
			_.each(cards, (card) => {
				card.flipped = false;
				card.found = false;
			});
			
			this.cards = cards;
		},
		
		flippedCards() {
			console.log('filter:', _.filter(this.cards, card => card.flipped))
			return _.filter(this.cards, card => card.flipped);
		},
		
		sameFlippedCard() {
			let flippedCards = this.flippedCards();
			if (flippedCards.length == 2) {
				if (flippedCards[0].name == flippedCards[1].name)
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
		
		startGame() {
			this.started = true;
			this.startTime = moment();
			
			this.timer = setInterval(() => {
				this.time = moment(moment().diff(this.startTime)).format("mm:ss");
			}, 1000);
		},
		
		finishGame() {
			this.started = false;
			clearInterval(this.timer);
			let score = 1000 - (moment().diff(this.startTime, 'seconds') - CardTypes.length * 5) * 3 - (this.turns - CardTypes.length) * 5;
			this.score = Math.max(score, 0);
			this.showSplash = true;
		},
		
		flipCard(card) {
			if (card.found || card.flipped) return;
			
			if (!this.started) {
				this.startGame();
			}
			
			let flipCount = this.flippedCards().length;
			
			if (flipCount == 0) {
				card.flipped = !card.flipped;
        console.log('0:', card.flipped)
			} else if (flipCount == 1) {
				card.flipped = !card.flipped;
        console.log('1:', card.flipped)
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
				}
				else {
					// Wrong match
					this.flipBackTimer = setTimeout( ()=> {
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

#app {
	margin: 2em;
}

.info {
	text-align: center;
	padding-bottom: 1em;
	border-bottom: 1px solid #555;
	
	> div {
		display: inline-block;
		width: 200px;
		
		.label {
			margin-right: 5px;
		}
		
		.value {
			font-weight: bold;
		}
	}
}

.cards {
	.card {
		position: relative;
		display: inline-block;
		width: 100px;
		height: 150px;
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
			background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/102308/card_backside.jpg');
			background-size: 90%;
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

.splash {
	position: absolute;
	left: 0; right: 0; top: 0; bottom: 0;
	
	.overlay {
		position: absolute;
		left: 0; right: 0; top: 0; bottom: 0;
		
		background-color: rgba(#000, 0.6);
	}
	
	.content {
		position: absolute;
		left: 0; right: 0; top: 0; bottom: 0;

		width: 400px;
		height: 200px;
		
		margin: auto;
		text-align: center;
		
		background-color: rgba(#333, 0.9);
		
		border-radius: 10px;
		box-shadow: 5px 5px 20px rgba(Black, 0.8);
		
		padding: 1em;
		
		.title {
			font-size: 1.8em;
			padding: 0.5em;
		}
		
		.score {
			padding: 0.5em;
		}
		
		button {
			margin-top: 1.0em;
			
			background-color: #444;
			padding: 5px 20px;
			border-radius: 4px;
			border: 1px solid #555;
			color: $white;
			
			font-size: 1.4em;
			
		}
	}
}
</style>
