import { createRouter, createWebHistory } from 'vue-router';
import LuckDraw from '../components/LuckDraw.vue'; // 抽奖页面组件

const routes = [
  {
    path: '/',
    name: 'LuckDraw',
    component: LuckDraw, // 将 LuckDraw 设置为根路径的组件
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;