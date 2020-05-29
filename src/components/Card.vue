<template>
  <div class="cardWrap">
    <h1>{{ msg }}</h1>
    <div class="cards">
      <div
        class="card"
        v-for="card in cards"
        :key="card.name"
        :class="{ flipped: card.flipped, found: card.found }"
        @click="flipCard(card)"
      >
        <div class="back"></div>
        <div
          class="front"
          :style="{ backgroundImage: 'url(' + card.image + ')' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    msg: String,
    cards: Array
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .cards {
    .card {
      position: relative;
      display: inline-block;
      width: 100px;
      height: 150px;
      margin: 1em 2em;
      transition: opacity 0.5s;

      .front,
      .back {
        border-radius: 5px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: White;

        backface-visibility: hidden;
        transform: translateZ(0);
        transition: transform 0.6s;
        transform-style: preserve-3d;
      }

      .back {
        background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZJKhfdiVQlDlehnm4wybBztPVGOqwRNfoNyQo2c20wtZ-MF79&usqp=CAU");
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

      &.flipped,
      &.found {
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
</style>
