import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { isValidEmail } from '../../utils/validation-utils';
import Swal from 'sweetalert2';
import { ForgotPasswordService } from '../../services/forgot-password.service';


@Component({
  selector: 'app-forgot-password',
  standalone:true,
  imports:[
    CommonModule,
    NzInputModule,
    CommonModule,
    FormsModule, NzInputModule, NzSelectModule,
    RouterLinkWithHref
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  spinner: boolean = false;
  constructor(private forgotPassword: ForgotPasswordService){}

  envoyer(){

    if (!this.email || this.email.trim() == "") {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir une addresse.',
        confirmButtonText: 'OK'
      }).then(() => {
        this.email = "";
      });
      return;
    }
    
    if(!isValidEmail(this.email)){
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez saisir une adresse valide.',
        confirmButtonText: 'OK'
      });
      return;
    }

    this.spinner = true
    this.forgotPassword.sendMail(this.email).subscribe(

      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message,
        });
        this.spinner = false;
      },
      (error) => {
        const errorMessage = error.error.message || 'Une erreur est survenue';
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage,
        });
        this.spinner = false
      }
    )
    
    
  }

}
