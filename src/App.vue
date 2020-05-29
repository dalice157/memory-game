<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <Card
      msg="Welcome to Your Vue.js App"
      cards="CardTypes"
    />
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  data: {
    CardTypes: [
	{ name: "vue", image: "https://vuejs.org/images/logo.png" },
	{ name: "express", image: "https://coligo.io/images/express.svg" },
	{ name: "mongo", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" },
	{ name: "nodejs", image: "https://worldvectorlogo.com/logos/nodejs-icon.svg" },
	{ name: "webpack", image: "https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67" },
	{ name: "babel", image: "https://babeljs.io/images/logo.svg" },
	{ name: "jade", image: "http://jade-lang.com/style/jade-logo-header.svg" },
]
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
