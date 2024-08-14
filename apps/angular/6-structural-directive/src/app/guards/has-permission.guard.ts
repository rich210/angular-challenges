import { inject } from '@angular/core';
// import { Router } from '@angular/router';
import { Role } from '../user.model';
import { UserStore } from '../user.store';
// import { map, mergeMap, of } from 'rxjs';

export function hasAnyRole(role: Role | Role[]): boolean {
  const store = inject(UserStore);
  return store.hasAnyRole(role);
}

export function isAdmin(): boolean {
  const store = inject(UserStore);
  return store.user().isAdmin;
}

// export const isAdmin = () => {
//   const userStore = inject(UserStore);
//   const router = inject(Router);

//   return userStore.user$.pipe(
//     mergeMap((user) => {
//       if(user) {
//         return of(user.isAdmin)
//       }else {
//         return of(router.parseUrl('no-user'));
//       }
//     }
//   ));
// };

// export const hasRole = (accessRoleList: Role[]) => {
//   const userStore = inject(UserStore);
//   const router = inject(Router);

//   return userStore.user$.pipe(
//     mergeMap((user) => {
//       if(user) {
//         return of(user.roles.some(role => accessRoleList.includes(role)));
//       }else {
//         return of(router.parseUrl('no-user'));
//       }
//     }
//   ));
// };

// function hasPermissionGuard(isAdmin: boolean, accessRoleList: Role[]) {
//   let userStore = inject(UserStore);
//   return userStore.isUserLoggedIn$.pipe(
//     mergeMap((hasUser) => {
//       if(hasUser) {
//         if(isAdmin) {
//           return userStore.isAdmin$.pip(map(Boolean));
//         }
//       }
//     })
//   );
// }
