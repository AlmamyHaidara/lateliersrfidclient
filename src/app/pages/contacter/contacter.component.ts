import {Component, OnInit} from '@angular/core';
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {ContactService} from "../../services/contact-service.service";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-contacter',
  templateUrl: './contacter.component.html',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NgForOf,
    RouterLink,  
    NzTableModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzPaginationModule,
    FormsModule
  ],
  styleUrl: './contacter.component.css'
})
export class ContacterComponent implements OnInit {
  contacts: any[] = [];
  filteredContacts: any[] = [];
  searchValue = '';
  pageIndex = 1;

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    const scl_Cli_Id = localStorage.getItem('scl_Cli_Id');
    if (scl_Cli_Id) {
      const id = parseInt(scl_Cli_Id, 10);
      this.getContactsByClientAndOrigin(id, 'client');
    } else {
      console.error('ID de contact non trouvé dans le localStorage');
    }
  }

  getContactsByClientAndOrigin(id: number, origine: string): void {
    this.contactService.getContactsByClientAndOrigin(id, origine).subscribe(
      (data: any[]) => {
        this.contacts = data;
        this.filteredContacts = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSearch(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.cot_Nom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      contact.cot_Prenom.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      contact.cot_Email.toLowerCase().includes(this.searchValue.toLowerCase())
    );
  }

  supprimerContact(id: number): void {
    Swal.fire({
      title: 'Supprimer !',
      text: 'Êtes-vous de vouloir supprimer l\'élément sélectionné ?\n',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteContact(id).subscribe(() => {
          this.contacts = this.contacts.filter(contact => contact.cot_Id !== id);
          this.onSearch(); // Reapply the search filter
          Swal.fire(
            'Supprimer !',
            'L\'utilisateur a été supprimé avec succès.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        }, error => {
          Swal.fire(
            'Erreur!',
            'Une erreur s\'est produite lors de la suppression de l\'utilisateur.',
            'error'
          );
        });
      }
    });
  }
}