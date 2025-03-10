import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxComponent } from "ng-zorro-antd/checkbox";
import {Router, RouterLink} from "@angular/router";
import { CompteAdminService } from "../../services/compte-admin.service";
import Swal from "sweetalert2";
import {PosteService} from "../../services/poste.service";
import {NgForOf} from "@angular/common";
import {isValidTelephone} from "../../utils/validation-utils";
import {EmployeSocieteService} from "../../services/employe-societe.service";
import {NavbarComponent} from "../Needers/navbar/navbar.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ActivatedRoute } from '@angular/router';
import { ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-admin-compte',
  templateUrl: './admin-compte.component.html',
  standalone: true,
  imports: [
    NzCarouselModule,
    FormsModule,
    NzCheckboxComponent,
    ReactiveFormsModule,
    RouterLink,
    NgForOf,
    NavbarComponent,
    NzIconDirective
  ],
  styleUrl: './admin-compte.component.scss'
})
export class AdminCompteComponent {
  employe: any = {};
  passwordConf: string = '';
  postes: any[] = [];
  fileToUpload: File | null = null;
  spinner:boolean = false

  constructor(
    private router: Router,
    private posteService: PosteService,
    private employeSocieteService: EmployeSocieteService,
    private  compteAdminService:CompteAdminService,
    private route: ActivatedRoute, private el: ElementRef
  ) { }

  fileName: string = '';
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.fileName = file.name; 
      this.fileToUpload = file; 
    }
  }

  array = 
  [
    'assets/Login/lateliersImage copie.jpg',
    'assets/Login/C1.jpg',
    'assets/Login/C2.jpg',
    'assets/Login/C3.jpg',
    'assets/Login/C4.jpg',
    'assets/Login/C5.jpg',
  ];

  ngOnInit(): void {
    this.getPostes();
    this.employe.Emp_LogoUrl = "Default"
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
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

  onSubmit() {


   

    if (!isValidTelephone(this.employe.Emp_NumeroTelephone)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Numéro de téléphone invalide. Veuillez saisir un numéro de téléphone à 10 chiffres.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.employe.Emp_MotDePasse !== this.passwordConf) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (this.fileToUpload) {
      this.compteAdminService.uploadFileEmploye(this.fileToUpload).subscribe(
        (response: any) => {
          this.employe.Emp_LogoUrl = response.fileUrl;

        },
        (error:any) => {
          console.error('Erreur lors du téléchargement du fichier :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors du téléchargement du fichier.',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      console.error('Aucun fichier sélectionné.');
    }

    this.spinner= true;
    sessionStorage.setItem('email', this.employe.Emp_AdresseMail);
    sessionStorage.setItem('password', this.employe.Emp_MotDePasse);

    this.employe.Emp_Soc_Id = 0;
    this.employe.Emp_Administrateur = true;

    const societeString = localStorage.getItem('societe');

    if (!societeString) {
      console.error('Erreur: données de la société non trouvées dans la session.');
      return;
    }

    const societe = JSON.parse(societeString);
    console.log("dkjhdkjhdkjhd",societe,this.employe);

    this.employeSocieteService
      .enregistrerEmployeEtSociete(this.employe, societe)
      .subscribe(
        (response: any) => {
          this.spinner = false
          if (response && response.message === "Employé et société enregistrés avec succès.") {
            console.log('Employé administrateur inséré avec succès !');
            console.log(this.employe);
            this.employe.Emp_LogoUrl = response.fileUrl;
            localStorage.removeItem('societe');
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: "Employé et société enregistrés avec succès",
              confirmButtonText: 'OK'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl('/AlertCreateSociety');
              }
            });
          } else {
            this.spinner = false
            console.error('Erreur lors de l\'insertion de l\'employé administrateur :', response);
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: response.message || 'Une erreur s\'est produite lors de l\'insertion de l\'employé administrateur.',
              confirmButtonText: 'OK'
            });
          }
        },
        (error) => {
          this.spinner = false
          console.error('Erreur lors de l\'insertion de l\'employé administrateur :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'insertion de l\'employé administrateur.',
            confirmButtonText: 'OK'
          });
        }
      );

  }
}
