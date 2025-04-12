import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    name: 'projects',
    path: '/projects',
    component: () => import('../views/ReposView.vue'),
    meta: {
      title: 'Projects'
    }
  },
  {
    name: 'games',
    path: '/games',
    component: () => import('../views/GamesView.vue'),
    meta: {
      title: 'Games'
    }
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact'
    }
  },
  {
    name: 'commissions',
    path: '/commissions',
    component: () => import('../views/CommissionsView.vue'),
    meta: {
      title: 'Commissions'
    }
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('../views/AuthView.vue'),
    meta: {
      title: 'Login / Register'
    }
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = 'New DEV - ' + to.meta.title;
})
export default router;
