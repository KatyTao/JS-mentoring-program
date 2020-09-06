import AsyncComponent from './component/async-component';

export default [
  {
    name: 'Home',
    path: '/',
    component: AsyncComponent(() => import('./pages/home'))
  },
  {
    name: 'Cities',
    path: '/cities/:city',
    component: AsyncComponent(() => import('./pages/cities'))
  }
]