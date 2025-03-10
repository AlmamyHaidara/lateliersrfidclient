import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {CompteAdminService} from "../../services/compte-admin.service";
import Swal from "sweetalert2";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { trigger, transition, style, animate } from '@angular/animations'; // Import animations


@Component({
  selector: 'app-list-sous-compte',
  templateUrl: './list-sous-compte.component.html',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NzLayoutComponent,
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    FormsModule,
    CommonModule

  ],
  styleUrl: './list-sous-compte.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ListSousCompteComponent implements OnInit {
  employes: any[] = [];
  filteredEmployes: any[] = [];
  searchValue = '';
  pageIndex = 1;  
  scl_Soc_Id_str: string | null = localStorage.getItem("scl_Soc_Id");
  spinner: boolean = true;
  constructor(private CompteAdminService: CompteAdminService) {}

  ngOnInit(): void {
    this.getAllNonAdminEmployees();
  }

  getAllNonAdminEmployees(): void {
    if(this.scl_Soc_Id_str){
      const scl_Soc_Id = parseInt(this.scl_Soc_Id_str, 10);
      this.CompteAdminService.getAllNonAdminEmployees(scl_Soc_Id).subscribe(
        (data: any[]) => {
          this.spinner = false
          this.employes = data;
          this.filteredEmployes = data; 
        },
        (error) => {
          this.spinner = false
          console.log('Erreur lors de la récupération des employés : ', error);
          Swal.fire({
            title: 'Supprimer !',
            text: 'une erreur est survenue lors de la récupération des employés',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }
      );
    }
  }

  onSearch(): void {
    this.filteredEmployes = this.employes.filter(
      employe =>
        employe.emp_Nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        employe.emp_Prenom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        employe.emp_NumeroTelephone.includes(this.searchValue)
    );
  }

  deleteEmploye(id: number): void {
    Swal.fire({
      title: 'Supprimer !',
      text: 'Êtes-vous sûr de vouloir supprimer l\'employé sélectionné ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.CompteAdminService.deleteEmploye(id)
          .subscribe(() => {
            this.employes = this.employes.filter(employe => employe.id !== id);
            this.filteredEmployes = this.filteredEmployes.filter(employe => employe.id !== id);
            this.getAllNonAdminEmployees();

            Swal.fire(
              'Supprimer !',
              'L\'employé a été supprimé avec succès.',
              'success'
            );
          }, error => {
            Swal.fire(
              'Erreur!',
              'Une erreur s\'est produite lors de la suppression de l\'employé.',
              'error'
            );
          });
      }
    });
  }
  
}
