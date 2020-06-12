import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';
import Game from '../views/game.vue';

Vue.use(VueRouter);

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
