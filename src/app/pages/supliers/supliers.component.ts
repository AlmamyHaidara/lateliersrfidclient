import { Component, OnInit } from '@angular/core';
import { NzPaginationComponent } from 'ng-zorro-antd/pagination';
import { RouterLink } from '@angular/router';
import { FournisseurRfidService } from '../../services/FournisseurRfidService';
import { NgForOf } from '@angular/common';
import Swal from 'sweetalert2';
import { NzInputGroupComponent, NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  imports: [
    NzLayoutComponent,
    NzInputGroupComponent,
    NzButtonModule,
    NzTableModule,
    NzPaginationComponent,
    RouterLink,
    NgForOf,
    NzInputModule,
    FormsModule,
    NzIconModule
  ],
  standalone: true,
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
  fournisseurs: any[] = [];
  filteredFournisseurs: any[] = [];
  searchValue = '';
  pageIndex = 1;

  constructor(private fournisseurService: FournisseurRfidService) { }

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs(): void {
    this.fournisseurService.getFournisseurs()
      .subscribe(fournisseurs => {
        this.fournisseurs = fournisseurs;
        this.filteredFournisseurs = fournisseurs; // Initial filter
      });
  }

  onSearch(): void {
    this.filteredFournisseurs = this.fournisseurs.filter(fournisseur =>
      fournisseur.fou_Designation.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  supprimerFournisseur(id: number): void {
    Swal.fire({
      title: 'Supprimer !',
      text: "Êtes-vous sûr de vouloir supprimer l'élément sélectionné ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fournisseurService.supprimerFournisseur(id)
          .subscribe(() => {
            this.getFournisseurs(); // Reload data after deletion
            Swal.fire(
              'Supprimer !',
              'Le fournisseur a été supprimé avec succès.',
              'success'
            );
          }, error => {
            Swal.fire(
              'Erreur !',
              'Une erreur s\'est produite lors de la suppression du fournisseur.',
              'error'
            );
          });
      }
    });
  }
}
