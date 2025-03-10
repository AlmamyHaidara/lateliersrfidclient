import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { FournisseurRfidService } from '../../services/FournisseurRfidService';
import Swal from "sweetalert2";
import { FormsModule } from "@angular/forms";
import { NzLayoutComponent } from "ng-zorro-antd/layout";

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink
  ],
  standalone: true,
  styleUrls: ['./edit-supplier.component.css']
})
export class EditSupplierComponent implements OnInit {

  fournisseur: any = {};
  fournisseurId: number = 0;

  constructor(private route: ActivatedRoute, private fournisseurService: FournisseurRfidService,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fournisseurId = params['id'];
      this.fournisseurService.getFournisseurById(this.fournisseurId)
        .subscribe(fournisseur => {
          this.fournisseur = fournisseur;
        }, error => {
          console.error('Erreur lors de la récupération du fournisseur:', error);
        });
    });
  }
  getFournisseurDetails(): void {
    this.fournisseurService.getFournisseurById(this.fournisseurId)
      .subscribe(fournisseur => {
        this.fournisseur = fournisseur;
      }, error => {
        console.error('Erreur lors de la récupération du fournisseur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la récupération du fournisseur',
          text: 'Une erreur s\'est produite lors de la récupération des détails du fournisseur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }

  modifierFournisseur(): void {
    this.fournisseurService.mettreAJourFournisseur(this.fournisseurId, this.fournisseur)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Fournisseur mis à jour avec succès',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/supplier']);
        });
      }, error => {
        console.error('Erreur lors de la mise à jour du fournisseur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour du fournisseur',
          text: 'Une erreur s\'est produite lors de la mise à jour du fournisseur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
      });
  }
}
