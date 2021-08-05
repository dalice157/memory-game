<template>
  <div id="app" class="wrap">
    <div id="nav">
      <router-link to="./">Home</router-link> |
      <router-link to="./game">Game</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
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

// vue transition start
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
// vue transition end
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: $white;

    &.router-link-exact-active {
      color: #f96464;
    }
  }
}
</style>
