import type { RouteRecordRaw } from 'vue-router'

import { AuthLayout } from '@/router/layouts'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/LoginView.vue'),
        meta: { title: 'login' },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/RegisterView.vue'),
        meta: { title: 'register' },
      },
      {
        path: 'verify',
        name: 'verify-otp',
        component: () => import('@/views/auth/VerifyOtpView.vue'),
        meta: { title: 'verifyOtp' },
      },
      {
        path: 'pending-approval',
        name: 'pending-approval',
        component: () => import('@/views/auth/PendingApprovalView.vue'),
        meta: { title: 'pendingApproval' },
      },
    ],
  },
]

export default routes
