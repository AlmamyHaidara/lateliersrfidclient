import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { UtilisateurRfidService } from '../../services/UtilisateurRfidService';
import Swal from "sweetalert2";
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";

@Component({
  selector: 'app-add-user',
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink
  ],
  templateUrl: './add-user.component.html',
  standalone: true,
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  utilisateur: any = {
    Usr_Nom: '',
    Usr_Prenom: ''
  };

  constructor(private utilisateurService: UtilisateurRfidService, private router: Router) { }

  ajouterUtilisateur(): void {
    if (!this.utilisateur.Usr_Nom || !this.utilisateur.Usr_Prenom) {
      Swal.fire({
        icon: 'error',
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs',
        confirmButtonText: 'OK'
      });
      return;
    }
    this.utilisateurService.ajouterUtilisateur(this.utilisateur)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.utilisateur = {
            Usr_Nom: '',
            Usr_Prenom: ''
          };
          this.router.navigate(['/userList']);
        });
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout de l\'utilisateur',
          text: 'Une erreur s\'est produite lors de l\'ajout de l\'utilisateur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }
}
