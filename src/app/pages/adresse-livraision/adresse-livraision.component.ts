import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {RouterLink} from "@angular/router";
import {AdresseService} from "../../services/adresse.service";
import Swal from "sweetalert2";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-adresse-livraision',
  templateUrl: './adresse-livraision.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NzLayoutComponent,
    RouterLink,
    FormsModule,
    NzPaginationModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzButtonModule
  ],
  styleUrl: './adresse-livraision.component.css'
})
export class AdresseLivraisionComponent implements OnInit {
  adresses: any[] = [];
  filteredAdresses: any[] = [];
  searchValue = '';
  pageIndex = 1;

  constructor(private adresseService: AdresseService) { }

  ngOnInit(): void {
    this.loadAdresses();
  }

  loadAdresses(): void {
    const fournisseurIdFromLocalStorage = localStorage.getItem('scl_Cli_Id');
    if (fournisseurIdFromLocalStorage) {
      const fournisseurId = parseInt(fournisseurIdFromLocalStorage, 10);
      const origine = 'client';
      this.adresseService.getAdressesByIdClientFournisseur(fournisseurId, origine)
        .subscribe(
          (data: any[]) => {
            this.adresses = data;
            this.filteredAdresses = data; // Initialize filtered list
          },
          (error) => {
            console.error('Une erreur s\'est produite lors du chargement des adresses : ', error);
          }
        );
    } else {
      console.error('L\'ID du fournisseur n\'a pas été trouvé dans le localStorage.');
    }
  }

  onSearch(): void {
    this.filteredAdresses = this.adresses.filter(adresse =>
      adresse.adr_Nomsociete.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      adresse.adr_Adresse.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      adresse.adr_Codepostal.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      adresse.adr_Ville.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      adresse.adr_Observations.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  supprimerAdresse(id: number): void {
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
        this.adresseService.deleteAdresse(id)
          .subscribe(() => {
            this.adresses = this.adresses.filter(adresse => adresse.adr_Id !== id);
            this.filteredAdresses = this.filteredAdresses.filter(adresse => adresse.adr_Id !== id);
            Swal.fire(
              'Supprimer !',
              'L\'adresse a été supprimée avec succès.',
              'success'
            );
          }, error => {
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression de l\'adresse.',
              'error'
            );
          });
      }
    });
  }
}