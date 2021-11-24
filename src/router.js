import Vue from 'vue';
import Router from 'vue-router';

import Login from './pages/Login';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Dashboard from './pages/Dashboard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/dashboard', component: Dashboard},
    {path: '/perfil/:userid', component: Perfil},
    {path: '/login', component: Login},
  ]
});

export default router;