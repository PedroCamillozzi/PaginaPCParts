import { CanActivateFn } from '@angular/router';

export const userLevelGuard: CanActivateFn = (route, state) => {
  return true;
};
