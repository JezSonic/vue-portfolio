import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { env } from "@/helpers/app.ts";

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Home',
      description: 'Welcome to my portfolio. Discover my projects and skills.',
      keywords: 'home, introduction, projects, skills',
      requires_backend: false,
    }
  },
  {
    name: 'profile',
    path: '/user/profile/:id',
    component: () => import('../views/user/UserProfileView.vue'),
    meta: {
      title: 'User Profile',
      description: 'View user profile information.',
      // Keywords could be dynamic based on user profile content if available
      keywords: 'user, profile, details',
      requires_backend: true,
    }
  },
  {
    name: 'verify-email',
    path: '/auth/verify-email/:token',
    component: () => import('../views/auth/VerifyEmail.vue'),
    meta: {
      title: 'Verify Email',
      description: 'Email verification page.',
      requires_backend: true,
    }
  },
  {
    name: 'reset-password',
    path: '/auth/reset-password/:token',
    component: () => import('../views/auth/ResetPassword.vue'),
    meta: {
      title: 'Reset Password',
      description: 'Reset your account password.',
      requires_backend: true,
    }
  },
  {
    name: 'settings',
    path: '/user/settings',
    component: () => import('../views/user/accountSettings/AccountSettingsView.vue'),
    meta: {
      title: 'Account Settings',
      description: 'Manage your account settings.',
      requires_backend: true,
    }
  },
  {
    name: 'download-user-data',
    path: '/user/download-data',
    component: () => import('../views/user/DataDownload.vue'),
    meta: {
      title: 'Download User Data',
      description: 'Download your user data.',
      requires_backend: true,
    }
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import('../views/ContactView.vue'),
    meta: {
      title: 'Contact Me',
      description: 'Get in touch with me. Send a message or find my contact details.',
      keywords: 'contact, email, message, social media',
      requires_backend: false,
    }
  },
  {
    name: 'commissions',
    path: '/commissions',
    component: () => import('../views/commissions/CommissionsView.vue'),
    meta: {
      title: 'Commissions',
      description: 'Information about my commission services.',
      keywords: 'commissions, services, pricing, freelance',
      requires_backend: false,
    }
  },
  {
    name: 'commissions-tos',
    path: '/commissions/tos',
    component: () => import('../views/commissions/TosView.vue'),
    meta: {
      title: 'Commissions - Terms of Service',
      description: 'Terms of Service for my commission work.',
      keywords: 'tos, terms of service, commissions, legal',
      requires_backend: false,
    }
  },
  {
    name: 'privacy-policy',
    path: '/privacy-policy',
    component: () => import('../views/PrivacyPolicyView.vue'),
    meta: {
      title: 'Privacy Policy',
      description: 'Read the Privacy Policy for this website.',
      keywords: 'privacy, policy, data, security, legal',
      requires_backend: false,
    }
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('../views/auth/AuthView.vue'),
    meta: {
      title: 'Login / Register',
      description: 'Login to your account or register a new one.',
      requires_backend: true,
    }
  },
  {
    name: 'auth-callback',
    path: '/auth/:id/callback',
    component: () => import('../views/auth/AuthCallbackView.vue'),
    meta: {
      title: 'OAuth Callback',
      description: 'Processing authentication callback.',
      requires_backend: true,
    }
  },
  {
    name: "error_404",
    path: '/:pathMatch(.*)*',
    component: () => import('../views/errors/404.vue'),
    meta: {
      title: 'Page Not Found (404)',
      description: 'The page you are looking for does not exist.',
      requires_backend: false,
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requires_backend && env("ENABLE_BACKEND")) {
    next()
  } else {
    if (!to.meta.requires_backend) {
      return next()
    }
    return next({path: "/"})
  }
})
export default router;
