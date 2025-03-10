import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {RouterLink} from "@angular/router";
import { ActivatedRoute, Router } from '@angular/router';
import { UtilisateurRfidService } from '../../services/UtilisateurRfidService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink
  ],
  templateUrl: './edit-user.component.html',
  standalone: true,
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  utilisateur: any = {};
  utilisateurId: number = 0;

  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurRfidService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.utilisateurId = params['id'];
      this.getUtilisateurDetails();
    });
  }

  getUtilisateurDetails(): void {
    this.utilisateurService.getUtilisateurById(this.utilisateurId)
      .subscribe(utilisateur => {
        this.utilisateur = utilisateur;
      }, error => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la récupération de l\'utilisateur',
          text: 'Une erreur s\'est produite lors de la récupération des détails de l\'utilisateur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }

  modifierUtilisateur(): void {
    this.utilisateurService.mettreAJourUtilisateur(this.utilisateurId, this.utilisateur)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur mis à jour avec succès',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/userList']);
        });
      }, error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour de l\'utilisateur',
          text: 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }
}







































