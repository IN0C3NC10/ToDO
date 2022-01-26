import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Task from '../views/Task.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Task',
    name: 'Task',
    component: Task
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
