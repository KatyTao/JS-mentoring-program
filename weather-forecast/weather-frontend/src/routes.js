import AsyncComponent from './component/async-component';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: 'Home',
    path: '/',
    component: AsyncComponent(() => import('./pages/home'))
  },
  {
    name: 'Profile',
    path: '/profile',
    component: AsyncComponent(() => import('./pages/profile'))
  },
  {
    name: 'Cities',
    path: '/cities/:city',
    component: AsyncComponent(() => import('./pages/cities'))
  },
  {
    name: 'oauth',
    path:'/authorization_code',
    component: AsyncComponent(() => import('./pages/oauth'))
  }
]