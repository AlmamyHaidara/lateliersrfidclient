import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginRfidInService } from '../../services/login-rfid-in.service';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NavbarComponent } from '../Needers/navbar/navbar.component';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-interne-user',
  standalone:true,
  imports:[
    NzCarouselModule,
    RouterLink,
    FormsModule,
    NgClass,
    NgIf,
    NzSpinComponent,
    NavbarComponent
  ],

  templateUrl: './interne-user.component.html',
  styleUrls: ['./interne-user.component.css']
})
export class InterneUserComponent {
  email: string = '';
  password: string = '';
  passwordVisibility: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private loginService: LoginRfidInService, private router: Router) { }

  togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

  login(): void {
    this.isLoading = true;
    this.loginService.authenticateUtilisateur(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.storeUserData(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
        console.error('Erreur de connexion', err);
      }
    });
  }

  private storeUserData(userData: any): void {
    localStorage.setItem('user', JSON.stringify(userData));
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
  
}