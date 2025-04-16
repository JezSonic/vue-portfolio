import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { env } from "@/helpers/app.ts";
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home',
      requires_backend: false,
    }
  },
  {
    name: 'games',
    path: '/games',
    component: () => import('../views/GamesView.vue'),
    meta: {
      title: 'Games',
      requires_backend: false,
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/UserProfileView.vue'),
    meta: {
      title: 'Profile',
      requires_backend: true,
    }
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact',
      requires_backend: false,
    }
  },
  {
    name: 'commissions',
    path: '/commissions',
    component: () => import('../views/CommissionsView.vue'),
    meta: {
      title: 'Commissions',
      requires_backend: false,
    }
  },
  {
    name: 'commissions-tos',
    path: '/commissions/tos',
    component: () => import('../views/commissions/TosView.vue'),
    meta: {
      title: 'ToS',
      requires_backend: false,
    }
  },
  {
    name: 'privacy-policy',
    path: '/privacy-policy',
    component: () => import('../views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Privacy Policy',
      requires_backend: false,
    }
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('../views/auth/AuthView.vue'),
    meta: {
      title: 'Login / Register',
      requires_backend: true,
    }
  },
  {
    name: 'auth-callback',
    path: '/auth/:id/callback',
    component: () => import('../views/auth/AuthCallbackView.vue'),
    meta: {
      title: 'OAuth Callback',
      requires_backend: true,
    }
  },
  {
    name: "error_404",
    path: '/:pathMatch(.*)*',
    component: () => import('../views/errors/404.vue'),
    meta: {
      title: '404'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = 'New DEV - ' + to.meta.title;
  if (to.meta.requires_backend && env("VITE_APP_ENABLE_BACKEND", false)) {
    next()
  } else {
    if (!to.meta.requires_backend) {
      return next()
    }
    return next({path: "/"})
  }


})
export default router;
