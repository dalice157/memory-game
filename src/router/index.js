import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import Game from '../views/game.vue';

Vue.use(VueRouter);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
const routes = [
  {
    path: process.env.NODE_ENV === 'production' ? '/memory-game/' : '/',
    name: 'Home',
    component: Home
  },
  {
    path: process.env.NODE_ENV === 'production' ? '/memory-game/game' : '/game',
    name: 'Game',
    component: Game
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
