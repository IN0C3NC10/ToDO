import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Task from '../views/Task.vue';

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
