import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const empId = localStorage.getItem('emp_Id');
  const empSocId = localStorage.getItem('emp_Soc_Id');

  if (empId && empSocId) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/not-found']);
    return false; 
  }
};
