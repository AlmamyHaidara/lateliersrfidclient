import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CompteAdminService } from "../../services/compte-admin.service";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-parameters-current-compte',
  templateUrl: './parameters-current-compte.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
  ],
  styleUrls: ['./parameters-current-compte.component.css']
})
export class ParametersCurrentCompteComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  empId: number | null = null;

  constructor(
    private compteAdminService: CompteAdminService,
    private router: Router
  ) {
    const empIdString = localStorage.getItem('emp_Id');
    if (empIdString) {
      this.empId = parseInt(empIdString, 10);
    } else {
      console.log('emp_Id est null.');
    }
  }

  changePassword(): void {
    // Validation des entrées
    if (!this.empId) {
      Swal.fire('Erreur', 'ID de l\'employé non trouvé.', 'error');
      return;
    }
  
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword) {
      Swal.fire('Erreur', 'Veuillez remplir tous les champs.', 'error');
      return;
    }
  
    if (this.newPassword !== this.confirmPassword) {
      Swal.fire('Erreur', 'Les nouveaux mots de passe ne correspondent pas.', 'error');
      return;
    }
  
    if (this.oldPassword === this.newPassword) {
      Swal.fire('Erreur', 'Le nouveau mot de passe doit être différent de l\'ancien.', 'error');
      return;
    }
  
    const minPasswordLength = 8;
    if (this.newPassword.length < minPasswordLength) {
      Swal.fire('Erreur', `Le nouveau mot de passe doit contenir au moins ${minPasswordLength} caractères.`, 'error');
      return;
    }
  
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (!passwordRegex.test(this.newPassword) || !passwordRegex.test(this.confirmPassword)) {
      Swal.fire('Erreur', 'Les mots de passe ne doivent contenir que des lettres, des chiffres et des caractères spéciaux.', 'error');
      return;
    }
  
    // Appel au service pour mettre à jour le mot de passe
    if (this.empId !== null) {
      this.compteAdminService.updateEmployePassword(this.empId, this.oldPassword, this.newPassword).subscribe({
        next: (response: any) => {
          Swal.fire('Succès', response.message || 'Le mot de passe a été mis à jour avec succès.', 'success');
          this.oldPassword = '';
          this.newPassword = '';
          this.confirmPassword = '';
        },
        error: (error: any) => {
  
          // Vérification de l'erreur réelle ou de l'état inattendu
          if (error.status === 400 || error.status === 401 || error.status === 500) {
            Swal.fire('Erreur', error.error?.message || 'Une erreur s\'est produite lors de la mise à jour du mot de passe.', 'error');
          } else {
            Swal.fire('Erreur', 'Une erreur inattendue s\'est produite.', 'error');
          }
        },
      });
    }
  }
  

  deleteAccount(): void {
    // if (this.empId === null) {
    //   this.errorMessage = 'ID de l\'employé non trouvé.';
    //   return;
    // }
  
    // Swal.fire({
    //   title: 'Êtes-vous sûr?',
    //   text: 'Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Oui, supprimer!',
    //   cancelButtonText: 'Annuler'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.compteAdminService.deleteEmploye(this.empId!).subscribe(
    //       () => {
    //         this.successMessage = 'Compte supprimé avec succès.';
    //         this.errorMessage = '';
  
    //         this.logout();
    //       },
    //       (error) => {
    //         this.errorMessage = 'Erreur lors de la suppression du compte : ' + error.message;
    //         this.successMessage = '';
    //       }
    //     );
    //   }
    // });
  }
  /* logout(): void {
    this.spinnerService.showSpinner();
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    localStorage.removeItem('empPstId');
    localStorage.removeItem('emp_administrateur');
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.spinnerService.hideSpinner();
    }, 3000);
  } */
}






