import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {FormsModule} from "@angular/forms";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {Router, RouterLink} from "@angular/router";
import {CompteAdminService} from "../../services/compte-admin.service";
import Swal from "sweetalert2";
import {CommonModule, NgForOf} from "@angular/common";
import {PosteService} from "../../services/poste.service";
import {isValidEmail, isValidTelephone} from "../../utils/validation-utils";
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';


@Component({
  selector: 'app-add-sous-compte',
  templateUrl: './add-sous-compte.component.html',
  standalone: true,
  imports: [
    NzLayoutComponent,
    FormsModule,
    NzCheckboxComponent,
    RouterLink,
    NgForOf,
    NzFormModule,
    NzCardModule,
    NzSelectModule,
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    CommonModule

  ],
  styleUrl: './add-sous-compte.component.css'
})
export class AddSousCompteComponent {
  employe: any = {};
  passwordConf: string = '';
  postes: any[] = [];
  selectedFileName!: string;
  spinner:boolean = false;
  
  constructor(private compteAdminService: CompteAdminService, private router: Router ,private posteService: PosteService) { }
  
  ngOnInit(): void {
    this.getPostes();
    this.employe.Emp_LogoUrl = "Default"
  }

  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      this.selectedFileName = inputElement.files[0].name;
    }
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
  
  @ViewChildren('inputRef') inputs!: QueryList<ElementRef>;
  hasEmptyField:boolean = false;

  validateInputs() {
    this.hasEmptyField = false;

    this.inputs.forEach(input => {
      const value = input.nativeElement.value;
      if (!value.trim()) {
        this.hasEmptyField = true;
        input.nativeElement.classList.add('error'); // Ajouter une classe pour marquer l'erreur
      } else {
        input.nativeElement.classList.remove('error');
      }
    });
  }


  onSubmit() {
    console.log('Mot de passe:', this.employe.Emp_MotDePasse);
    console.log('Confirmation du mot de passe:', this.passwordConf);
    
    this.validateInputs();
    
    if(this.hasEmptyField){
      Swal.fire({
        icon: 'warning',
        title: 'Champs vides détecté',
        text: 'Les champs non facultatifs ne doivent pas êtres vides !',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.employe.Emp_Nom || !this.employe.Emp_Prenom || !this.employe.Emp_AdresseMail || !this.employe.Emp_NumeroTelephone || !this.employe.Emp_Pst_Id || !this.employe.Emp_MotDePasse || !this.passwordConf) {
      Swal.fire({
        icon: 'warning',
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs du formulaire.',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          icon: 'custom-swal-icon'
        }
      });
      
      return;
    }

    if ((this.employe.Emp_Prenom).length < 2 || (this.employe.Emp_Nom).length < 2) {
      Swal.fire({
        icon: 'warning',
        title: 'Incorrect',
        text: 'Les champs nom et prénom doivent avoir au minimum deux caractères.',
        confirmButtonText: 'OK'
      });
      return;
    }    

    if (!isValidTelephone(this.employe.Emp_NumeroTelephone)) {
      Swal.fire({
        icon: 'warning',
        title: 'Incorrect',
        text: 'Numéro de téléphone invalide. Veuillez saisir un numéro de téléphone à 10 chiffres.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.employe.Emp_MotDePasse !== this.passwordConf) {
      Swal.fire({
        icon: 'warning',
        title: 'Incorrecte',
        text: 'Les mots de passe ne correspondent pas.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if(!isValidEmail(this.employe.Emp_AdresseMail)){
      Swal.fire({
        icon: 'warning',
        title: 'Adresse email incorrecte',
        text: 'Saisissez une adresse email valide',
        confirmButtonText: 'OK'
      });
      return;
    }

    const socId = localStorage.getItem('emp_Soc_Id');

    if (!socId) {
      console.error('Erreur: soc_Id non trouvé dans le stockage local.');
      return;
    }

    this.employe.Emp_Soc_Id = socId;
    this.employe.Emp_Administrateur = false;
    this.spinner = true
    this.compteAdminService.insertEmploye(this.employe).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Employé  inséré avec succès !',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigateByUrl('/ListSousCompte');
        });
        this.spinner = false
        localStorage.removeItem('soc_Id');
      },
      (error) => {
        console.error('Erreur lors de l\'insertion de l\'employé  :', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'insertion de l\'employé ',
          confirmButtonText: 'OK'
        });
        this.spinner = false
      }
    );

  }
}
