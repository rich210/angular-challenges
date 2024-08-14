import { hasAnyRole, isAdmin } from './guards/has-permission.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [() => isAdmin()],
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [() => hasAnyRole('MANAGER')],
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (c) => c.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/no-access/no-access.component').then(
        (c) => c.NoAccessComponent,
      ),
  },
];
