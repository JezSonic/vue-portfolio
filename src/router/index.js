import { createRouter, createWebHistory } from "vue-router";
const routes = [
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
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to) => {
    document.title = 'New DEV - ' + to.meta.title;
});
export default router;
