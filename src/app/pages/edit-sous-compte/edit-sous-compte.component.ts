import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UtilisateurRfidService} from "../../services/UtilisateurRfidService";
import Swal from "sweetalert2";
import {CompteAdminService} from "../../services/compte-admin.service";
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {NgForOf} from "@angular/common";
import {PosteService} from "../../services/poste.service";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardComponent, NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-edit-sous-compte',
  templateUrl: './edit-sous-compte.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink,
    NgForOf,
    NzFormModule,
    NzSelectModule,
    NzCardModule,
    NzTypographyModule,
    NzButtonModule,
    NzInputModule
    
    
  ],
  styleUrl: './edit-sous-compte.component.css'
})
export class EditSousCompteComponent {
  employe: any = {};
  employeId!: number;

  postes: any[] = [];
  

  constructor(private route: ActivatedRoute, private CompteAdminService: CompteAdminService, private router: Router,private posteService: PosteService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeId = params['id'];
  
      this.CompteAdminService.getEmployeById(this.employeId).subscribe(
        (employe) => {
          this.employe = employe;
          console.log("Employé récupéré:", this.employe); 
        },
        (error) => {
          console.error('Erreur lors de la récupération employé:', error);
        }
      );
  
      this.getPostes();
    });
  }
  

  getPostes(): void {
    this.posteService.getPostes().subscribe(
      (data) => {
        this.postes = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des postes :', error);
      }
    );
  }



  modifierEmploye(): void {
    this.CompteAdminService.updateEmploye(this.employeId, this.employe)
      .subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur mis à jour avec succès',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/ListSousCompte']);
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
