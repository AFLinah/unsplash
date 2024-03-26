import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const currentMenu = route.url[0].path;
  const router = inject(Router);
  const access_token = localStorage.getItem("accessToken");

  if(access_token) {
    // console.log("access_token is set");
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
