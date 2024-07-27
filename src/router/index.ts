import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue';
import { useInterfaceStore } from '@/stores/interface';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WelcomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/auth/SignIn.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/WelcomeView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from) => {
  const interfaceStore = useInterfaceStore();
  console.log('Testing isAuthenticated: ', interfaceStore.isLoggedIn);
  console.log('To requires auth: ', to, from);

  if (to.meta.requiresAuth && !interfaceStore.isLoggedIn) {
    console.log('redirecting to /signin');
    return {
      path: '/signin',
      // save the location we were at to come back later
      query: { redirect: to.fullPath }
    };
  }
});

export default router;
