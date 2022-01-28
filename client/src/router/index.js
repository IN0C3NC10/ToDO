import { createRouter, createWebHashHistory } from 'vue-router';
import isConnected from '../utils/isConnected.js';
import Home from '../views/Home.vue';
import Task from '../views/Task.vue';
import QRCode from '../views/QRCode.vue';
import Notification from '../views/Notification.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/task',
    name: 'task.create',
    component: Task
  },
  {
    path: '/task/:id',
    props: true,
    name: 'task.edit',
    component: Task
  },
  {
    path: '/synchronize',
    name: 'qrcode',
    component: QRCode
  },
  {
    path: '/notification',
    name: 'notify',
    component: Notification
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//.. verifica se possui um MacAddress salvo
router.beforeEach((to, from, next) => {
  if (!isConnected && to.name != 'qrcode') {
    next('/synchronize');
  } else {
    next();
  }
})

export default router
