import {Component, OnInit} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import { UtilisateurRfidService } from '../../services/UtilisateurRfidService';
import Swal from "sweetalert2";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';




@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    NzPaginationComponent,
    RouterLink,
    NgForOf,
    NzIconModule,
    FormsModule,
    NzTableModule,
    NzInputModule,
    NzButtonModule,

  ],

  standalone: true,
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  utilisateurs: any[] = [];
  filteredUtilisateurs: any[] = [];
  searchValue = '';
  pageIndex = 1;

  constructor(private utilisateurService: UtilisateurRfidService) { }

  ngOnInit(): void {
    this.getUtilisateurs();
  }

  getUtilisateurs(): void {
    this.utilisateurService.getUtilisateurs()
      .subscribe(utilisateurs => {
        this.utilisateurs = utilisateurs;
        this.filteredUtilisateurs = utilisateurs; // Initial filter
      });
  }

  onSearch(): void {
    this.filteredUtilisateurs = this.utilisateurs.filter(utilisateur =>
      utilisateur.usr_Nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      utilisateur.usr_Prenom.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  supprimerUtilisateur(id: number): void {
    Swal.fire({
      title: 'Supprimer !',
      text: 'Êtes-vous sûr de vouloir supprimer l\'élément sélectionné ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.utilisateurService.supprimerUtilisateur(id)
          .subscribe(() => {
            this.filteredUtilisateurs = this.filteredUtilisateurs.filter(utilisateur => utilisateur.usr_Id !== id);
            Swal.fire(
              'Supprimer !',
              'L\'utilisateur a été supprimé avec succès.',
              'success'
            ).then(() => {
              this.getUtilisateurs(); // Recharger les données après suppression
            });
          }, error => {
            Swal.fire(
              'Erreur !',
              'Une erreur s\'est produite lors de la suppression de l\'utilisateur.',
              'error'
            );
          });
      }
    });
  }
}













