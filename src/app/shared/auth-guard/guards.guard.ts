import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

export const guardsGuard: CanActivateFn = (route, state) => {
 const helperService = inject (HelperService); 
 const router = inject (Router);
 

  if (helperService.getLocalSorage('session')){
    return true;

  } else {
    const url = router.createUrlTree (["/auth/log-in"]) 
    return url;

  }
  
};
