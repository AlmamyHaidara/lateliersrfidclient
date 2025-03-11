import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UtilisateurRfidService} from "../../services/UtilisateurRfidService";
import Swal from "sweetalert2";
import {CompteAdminService} from "../../services/compte-admin.service";
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {CommonModule, NgForOf} from "@angular/common";
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
    CommonModule,
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
  selectedFileName!: string;
  postes: any[] = [];
  nouveauMDP:String =""
  mdp : string = "";
  spinner : boolean = false;

  constructor(private route: ActivatedRoute, private CompteAdminService: CompteAdminService, private router: Router,private posteService: PosteService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeId = params['id'];
  
      this.CompteAdminService.getEmployeById(this.employeId).subscribe(
        (employe) => {
          this.employe = employe;
          this.employe.emp_MotDePasse = "";
          this.selectedFileName = employe.emp_Logo_Url          
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

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      this.selectedFileName = inputElement.files[0].name;
    }
  }

  modifierEmploye(): void {
    this.employe.emp_MotDePasse = this.mdp.trim()+","+this.nouveauMDP.trim();
    if(this.employe.emp_MotDePasse.split(",")[0]==""&&this.employe.emp_MotDePasse.split(",")[1]!=""){
      Swal.fire({
        icon: 'warning',
        title: 'Champ manquant',
        text: "Le champ 'Nouveau mot de passe' ne peut pas être remplis sans le champ 'Ancien Mot de Passe'",
        confirmButtonText: 'OK'
      });
      return  
    }
    if(this.employe.emp_MotDePasse.split(",")[1]==""&&this.employe.emp_MotDePasse.split(",")[0]!=""){
      Swal.fire({
        icon: 'warning',
        title: 'Champ manquant',
        text: "Le champ 'Ancien Mot de Passe' ne peut pas être remplis sans le champ 'Nouveau mot de passe'",
        confirmButtonText: 'OK'
      });
      return
    }
    this.spinner= true;
    this.CompteAdminService.updateEmploye(this.employeId, this.employe)
      .subscribe(() => {
        this.spinner= false;
        Swal.fire({
          icon: 'success',
          title: 'succès',
          text: 'Utilisateur mis à jour avec succès',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/ListSousCompte']);
        });
      },error => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur lors de la mise à jour de l\'utilisateur',
          text: error.error?.message || 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer.',
          confirmButtonText: 'OK'
        });
        this.spinner= false;
      });
  }
}
