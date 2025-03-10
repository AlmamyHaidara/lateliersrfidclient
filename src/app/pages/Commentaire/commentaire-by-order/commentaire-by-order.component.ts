import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Commentaire } from '../../../models/commentaire';
import { FormsModule } from '@angular/forms';
import { CommentaireService } from '../../../services/commentaire.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  standalone:true,
  imports:[
    CommonModule,
    FormsModule,
    NzIconModule,
    RouterLink
  ],
  selector: 'app-commentaire-by-order',
  templateUrl: './commentaire-by-order.component.html',
  styleUrl: './commentaire-by-order.component.css'
})
export class CommentaireByOrderComponent implements OnDestroy{

  envoie:boolean = false;

  constructor(private commentaireService:CommentaireService,
              private router : Router){}

  commentaire: Commentaire = {
    com_cde_id: 0, // Assurez-vous de l'ajouter depuis votre service
    com_id: 0,
    com_message: '',
    com_image: '',
    com_livraison_avec_soin: false,
    com_au_dela_attentes: false,
    com_articles_conformes: false,
    com_respect_instructions: false,
    com_dans_delais: false,
    com_articles_qualite: false,  
  };

  selectedFileName: string | null = null; 
  
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files[0]) {
      this.selectedFileName = inputElement.files[0].name;
      this.commentaire.com_image = this.selectedFileName;
    }
  }

  ngOnDestroy(): void {
    this.commentaireService.idCommande = 0;    
  }

  valider(): void {
    if (!this.commentaire.com_message.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Champ requis',
        text: 'Veuillez au moins remplir le champ de commentaire pour envoyer un commentaire.',
      });
      return;
    }

    this.envoie = true
    // Ajoutez l'ID de commande depuis le service
    this.commentaire.com_cde_id = this.commentaireService.getID()    
    // Appeler le service pour envoyer les données à l'API
    this.commentaireService.createCommentaire(this.commentaire).subscribe(
      (response) => {
        this.envoie = false
        this.selectedFileName = null;
        // Réinitialisation de l'objet commentaire
        this.commentaire = {
          com_cde_id: 0, // Assurez-vous de l'ajouter depuis votre service
          com_id: 0,
          com_message: '',
          com_image: '',
          com_livraison_avec_soin: false,
          com_au_dela_attentes: false,
          com_articles_conformes: false,
          com_respect_instructions: false,
          com_dans_delais: false,
          com_articles_qualite: false,  
        };

        Swal.fire({
          title: 'Succès !',
          text: 'Votre commentaire a été enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(()=>{
          this.router.navigateByUrl("/etatCommande")
        })   
        

      },
      (error) => {
        Swal.fire({
          title: 'Erreur !',
          text: 'Une erreur est survenue lors de l\'enregistrement.',
          icon: 'error',
          confirmButtonText: 'Réessayer'
        }).then(()=>{
          console.log(this.commentaire);
          this.envoie = false
        });
        console.error('Erreur lors de l\'enregistrement', error);
      }
    )

  }
  
}
