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
    name: 'profile',
    path: '/user/profile/:id',
    component: () => import('../views/user/UserProfileView.vue'),
    meta: {
      title: 'Profile',
      requires_backend: true,
    }
  },
  {
    name: 'verify-email',
    path: '/auth/verify-email/:token',
    component: () => import('../views/auth/VerifyEmail.vue'),
    meta: {
      title: 'Auth - Verifying email...',
      requires_backend: true,
    }
  },
  {
    name: 'reset-password',
    path: '/auth/reset-password/:token',
    component: () => import('../views/auth/ResetPassword.vue'),
    meta: {
      title: 'Auth - Reset password',
      requires_backend: true,
    }
  },
  {
    name: 'settings',
    path: '/user/settings',
    component: () => import('../views/user/AccountSettingsView.vue'),
    meta: {
      title: 'Settings',
      requires_backend: true,
    }
  },
  {
    name: 'download-user-data',
    path: '/user/download-data',
    component: () => import('../views/user/DataDownload.vue'),
    meta: {
      title: 'Download your user data',
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
    component: () => import('../views/commissions/CommissionsView.vue'),
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
      title: '404',
      requires_backend: false,
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
