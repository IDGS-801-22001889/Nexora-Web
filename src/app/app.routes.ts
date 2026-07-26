import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { adminGuard } from './core/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/public/home/home').then(m => m.Home)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: []
  },
  {
  path: 'faq',
  loadComponent: () => import('./features/public/faq/faq').then(m => m.FaqComponent)
  }
];
