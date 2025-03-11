import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {CompteAdminService} from "../../services/compte-admin.service";
import {FormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import Swal from "sweetalert2";
import {isValidEmail, isValidPassword} from "../../utils/validation-utils";
import {SpinnerService} from "../../services/spinner.service";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import {SocieteClientService} from "../../services/societe-client.service";
import {NavbarComponent} from "../Needers/navbar/navbar.component";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NzCarouselModule,
    RouterLink,
    FormsModule,
    NgClass,
    NgIf,
    NzSpinComponent,
    NavbarComponent
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{


  email: string = '';
  password: string = '';
  empPstId!: number;
  expirationTime: number = 0;
  passwordVisibility: boolean = false;
  emp_Soc_Id!: number;
  emp_Administrateur!: number;
  emp_Id !: number;
  isLoading: boolean = false;

  constructor(private compteAdminService: CompteAdminService, private router: Router,private societeClientService  : SocieteClientService,    private spinnerService: SpinnerService 
  ) { }

  ngOnInit(): void {
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');
    const storedExpirationTime = sessionStorage.getItem('expirationTime');

    if (storedEmail && storedPassword && storedExpirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < +storedExpirationTime) {
        this.email = storedEmail;
        this.password = storedPassword;
      } else {
        this.clearSessionStorage();
      }
      
    }
    // document.body.style.overflow = 'hidden';
  }

  login(): void {

    if (!this.email && !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir votre email et votre mot de passe.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.email) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir votre email.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir votre mot de passe.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!isValidEmail(this.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir une adresse email valide.',
        confirmButtonText: 'OK'
      });
      return;
    }

  /*   if (!isValidPassword(this.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le mot de passe doit contenir au moins 8 caractères et au moins un chiffre.',
        confirmButtonText: 'OK'
      });
      return;
    } */
    this.isLoading = true; // Show spinner


    this.compteAdminService.authenticateEmploye(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false; // Show spinner
        this.empPstId = response.emp_Pst_Id;
        this.emp_Administrateur = response.emp_Administrateur;
        this.emp_Soc_Id = response.emp_Soc_Id;

        this.emp_Id =response.emp_Id;
        localStorage.setItem('emp_Administrateur', this.emp_Administrateur.toString());
        localStorage.setItem('emp_Soc_Id', this.emp_Soc_Id.toString());
        localStorage.setItem('empPstId', this.empPstId.toString());
        localStorage.setItem('emp_Id', this.emp_Id.toString());

        this.societeClientService.getSocieteClientSclById(this.emp_Soc_Id).subscribe(
          societeClient => {
            console.log('Societe Client: ', societeClient);

            localStorage.setItem('scl_Id', societeClient.scl_Id.toString());
            localStorage.setItem('scl_Cli_Id', societeClient.scl_Cli_Id.toString());
            localStorage.setItem('scl_Soc_Id', societeClient.scl_Soc_Id.toString());
            localStorage.setItem('scl_Base', societeClient.scl_Base);
            
          },
          error => {
            console.error('Erreur lors de la récupération de la société client : ', error);
            // Gérez l'erreur ici
          }
        );

        const expirationTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // 2 jours
        sessionStorage.setItem('expirationTime', expirationTime.toString());
        


        this.router.navigate(['/dashboard']);
        // this.dashboard.ngOnInit();
        localStorage.removeItem("societe");
        localStorage.removeItem("employeSave");
        console.log(response);

      },

      error: (error: HttpErrorResponse) =>  {
        this.isLoading = false; 
        console.error(error);
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur 401',
            text: error.error.message || 'Accès non autorisé. Veuillez vérifier vos identifiants.',
            confirmButtonText: 'OK'
          });
        } else if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur 400',
            text: error.error.message || 'La requête est incorrecte. Veuillez vérifier les informations soumises.',
            confirmButtonText: 'OK'
          });
        } else if (error.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.error.message || 'Accès interdit. Vous n\'avez pas les autorisations nécessaires.',
            confirmButtonText: 'OK'
          });
        } else if (error.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.error.message || 'Ressource non trouvée. L\'élément demandé n\'existe pas.',
            confirmButtonText: 'OK'
          });
        } else if (error.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: error.error.message || 'Une erreur interne est survenue. Veuillez réessayer plus tard.',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erreur inconnue',
            text: 'Une erreur est survenue. Veuillez réessayer plus tard.',
            confirmButtonText: 'OK'
          });
        }

      }
    });
  }


  clearSessionStorage(): void {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('expirationTime');
  }
  togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
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

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  
}
