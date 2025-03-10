import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FournisseurRfidService } from '../../services/FournisseurRfidService';
import { NgForOf } from "@angular/common";
import { NzContentComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { FormsModule } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent {
  nouveauFournisseur: any = {};

  constructor(private fournisseurService: FournisseurRfidService, private router: Router) { }

  ajouterFournisseur(): void {
    this.fournisseurService.ajouterFournisseur(this.nouveauFournisseur)
      .subscribe(nouveauFournisseur => {
        console.log('Fournisseur ajouté:', nouveauFournisseur);
        this.nouveauFournisseur = {};
        Swal.fire({
          icon: 'success',
          title: 'Fournisseur ajouté avec succès',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/supplier']);
        });
      }, error => {
        console.error('Erreur lors de l\'ajout du fournisseur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de l\'ajout du fournisseur',
          text: 'Une erreur s\'est produite lors de l\'ajout du fournisseur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }
}
