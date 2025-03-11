import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from "@angular/forms";
import { NzCheckboxComponent } from "ng-zorro-antd/checkbox";
import { SocieteService } from "../../services/societe.service";
import Swal from 'sweetalert2';
import {EmployeSocieteService} from "../../services/employe-societe.service";
import {NavbarComponent} from "../Needers/navbar/navbar.component";
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NzCheckboxComponent,
    RouterLink,
    NavbarComponent,
    NzCarouselModule
  ],
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  checked = true;
  societe: any = {
    Soc_LogoUrl: "",
    Soc_TvaIntracommunautaire:""
  };
  employe: any = {};

  fileToUpload: File | null = null;

  constructor(private societeService: SocieteService, private router: Router) {  }
  
  ngOnInit(): void {
    let localSave = localStorage.getItem("societe"); 
    if(localSave){
      this.societe = JSON.parse (localSave)
      console.log("societe trouver : ",this.societe);
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
  
  fileName: string = '';
  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.fileName = file.name; 
      this.fileToUpload = file; 
    }
  }

  onSubmit() {
    if (!this.societe.soc_raisonsociale || !this.societe.soc_Siret || !this.societe.Soc_AdresseEmail) {
      console.log("Error",this.societe);

      Swal.fire({
        icon: 'error',
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs du formulaire.',
        confirmButtonText: 'OK'
      });
      return;
    }

    if (!this.societe.soc_newsletter) {
      console.log("Error",this.societe);

      Swal.fire({
        icon: 'warning',
        title: 'Politique de confidentialité',
        text: 'Vous devez accepter les CGV et la politique de confidentialité de lateliers',
        confirmButtonText: 'OK'
      });
      return;
    }


    if (this.fileToUpload) {

      this.societeService.uploadFile(this.fileToUpload).subscribe(
        (response: any) => {
          this.societe.Soc_LogoUrl = response.fileUrl;
          localStorage.setItem('societe', JSON.stringify(this.societe));

        },
        (error:any) => {
          console.error('Erreur lors du téléchargement du fichier :', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors du téléchargement du fichier.',
            confirmButtonText: 'OK'
          });
          return;
        }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(this.societe.Soc_AdresseEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Adresse email invalide',
        text: 'Veuillez entrer une adresse email valide.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const siretFormat = /^\d{14}$/; // Format du numéro SIRET

    if (!siretFormat.test(this.societe.soc_Siret)) {
      Swal.fire({
        icon: 'error',
        title: 'SIRET invalide',
        text: 'Le SIRET doit contenir exactement 14 chiffres.',
        confirmButtonText: 'OK'
      });
      return;
    }


    //const franceTVAFormat = /^FR[\da-zA-Z][\da-zA-Z]\d{9}$/; // Format du numéro de TVA intracommunautaire en France
   //   if (!franceTVAFormat.test(this.societe.Soc_TvaIntracommunautaire)) {
   //  if (this.societe.Soc_TvaIntracommunautaire) {
   //    Swal.fire({
   //      icon: 'error',
   //      title: 'TVA Intracommunautaire invalide',
   //      text: 'La TVA Intracommunautaire en France doit respecter le format FRXX999999999.',
   //      confirmButtonText: 'OK'
   //    });
   //    return;
   //  }


    // this.employeSocieteService.enregistrerEmployeEtSociete(this.societe,this.employe).subscribe(
    //   (response: any) => {
    //     console.log('Société et employé insérés avec succès !');
    //    // localStorage.setItem('soc_Id', response.soc_Id);
    //     this.router.navigateByUrl('/AdminCompte');
    //   },
    //   (error) => {
    //     console.error('Erreur lors de l\'enregistrement de la société et de l\'employé :', error);
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Erreur',
    //       text: 'Une erreur s\'est produite lors de l\'enregistrement de la société et de l\'employé.',
    //       confirmButtonText: 'OK'
    //     });
    //   }
    // );


    this.societe.soc_id =0;
    localStorage.setItem('societe', JSON.stringify(this.societe));

    this.router.navigate(['/AdminCompte'], { fragment: 'creer' });
  }
}
