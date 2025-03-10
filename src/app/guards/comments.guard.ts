import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommentaireService } from '../services/commentaire.service';

export const commentsGuard: CanActivateFn = (route, state) => {
  const commentaireService = inject(CommentaireService);
  const router = inject(Router);

  if (commentaireService.idCommande && commentaireService.idCommande > 0) {
    return true; 
  } else {
    router.navigate(['/etatCommande']); 
    return false;
  }
};
