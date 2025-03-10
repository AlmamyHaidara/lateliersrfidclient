import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { CommonModule } from '@angular/common';
import { CollectionRfidService } from '../../services/CollectionRfidService';
import Swal from 'sweetalert2';
import { RemiseService } from '../../services/remise.service';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-modal-commande',
  templateUrl: './modal-commande.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputNumberComponent,
    CommonModule,
    NzSpinComponent
  ],
  styleUrls: ['./modal-commande.component.css']
})
export class ModalCommandeComponent implements OnInit {
    @Output() addArticle = new EventEmitter<any>();
    @Output() totalValuesUpdated = new EventEmitter<{ totalHT: number, montantTVA: number, montantTTC: number }>();


    cda_PrixTotalHT: number = 0;
    montantTVA: number = 0;
    montantTTC: number = 0;
    tauxTVA: number = 20;

    listOfOption: any[] = []; 
    selectedArticleId: number | null = null; 
    selectedArticleDesignation: string | null = null; 
    demoValue = 1; 
    remiseValue = 0; 
    isHidden = false;
    loading = true;
    selectedArticlePrixVente: number | null = null; 
    commandeArticles: any[] = []; 
    loadingRemise: boolean = false; 

  
  
    constructor(
      private collectionRfidService: CollectionRfidService,
      private remiseService: RemiseService 
    ) {}
  
    ngOnInit() {
      this.loadAllArticles();
    }
  
    loadAllArticles() {
      this.collectionRfidService.getAllArticles().subscribe(
        (articles: any[]) => {
          this.listOfOption = articles.map(article => ({
            id: article.art_id,
            designation: article.art_designation,
            prixvente: article.art_prixvente 
          }));
          this.loading = false;
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des articles :', error);
          this.loading = false;
        }
      );
    }
  
    onSelect(articleId: number): void {
      this.selectedArticleId = articleId; 
    
      // Trouver l'article sélectionné
      const selectedArticle = this.listOfOption.find(article => article.id === articleId);
    
      if (selectedArticle) {
        this.selectedArticlePrixVente = selectedArticle.prixvente;
        this.selectedArticleDesignation = selectedArticle.designation;
      } else {
        console.error("Article non trouvé !");
        this.selectedArticlePrixVente = 0;
        this.selectedArticleDesignation = '';
      }
    
      // Récupérer l'ID du client depuis le localStorage
      const clientId = localStorage.getItem('scl_Cli_Id');
      
      if (clientId && this.selectedArticleId) {
        this.loadingRemise = true; 


        this.remiseService.applyRemiseToArticle(Number(clientId), this.selectedArticleId).subscribe(
          (remiseArticle: any) => {
            this.remiseValue = remiseArticle.remise ?? 0;
            this.selectedArticlePrixVente = remiseArticle.prixInitial; 
            this.loadingRemise = false;
          },
          (error: any) => {
            console.error('Erreur lors de l’application de la remise :', error);
            this.remiseValue = 0;
            this.loadingRemise = false; 

          }
        );
      } else {
        console.warn('Client ID ou Article ID non trouvé');
      }
    }
    
  
    addToCart() {
      if (!this.selectedArticleId) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez sélectionner un article.',
        });
        return;
      }
    
      if (this.demoValue <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Veuillez entrer une quantité valide.',
        });
        return;
      }
    
      if (this.selectedArticlePrixVente === null || this.selectedArticlePrixVente === 0) {
        console.error('Le prix de vente de l\'article est invalide ou égal à zéro');
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Le prix de vente de l\'article est invalide.',
        });
        return;
      }
    
      const prixVente = this.selectedArticlePrixVente;
      const remise = this.remiseValue || 0;
      const quantite = this.demoValue;
      
      const totalRemiseHT = Math.round(quantite * prixVente * (remise / 100) * 100) / 100;
      
      const prixTotalRemiseHT = Math.round((quantite * prixVente - totalRemiseHT) * 100) / 100;
      
      const article = {
        cda_Id: 0,
        cda_Cde_Id: 0,
        cda_Art_Id: this.selectedArticleId,
        cda_Prixht: prixVente,
        cda_Tva: 0,
        cda_Quantite: this.demoValue,
        cda_Remise: this.remiseValue, 
        cda_Art_Designation: this.selectedArticleDesignation || '', 
        cda_Art_CodeArticle: 0,
        cda_Art_PrixVente: prixVente, 
        cda_PrixTotalHT: quantite * prixVente,
        cda_PoidsTotal: 0,
        cda_PrixTotalRemiseHT: prixTotalRemiseHT, 
        cda_TotalRemiseHT: totalRemiseHT, 
        cda_TraitementMax: 0,
        cda_Conditionne: 0,
        cda_Coupe: 0,
        cda_Repris: 0,
        cda_Litige: 0,
        cda_Commentaire: '',
        cda_Modification: '',
        cda_NumeroPreparation: 0,
        cda_Liaison_Designation: '',
        cda_Controlee: '',
        cda_Ordre: 0
      };
      
      this.addArticle.emit(article);
      this.commandeArticles.push(article);
      this.updateTotalHT(); 
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Article ajouté au panier avec succès!',
      }).then(() => {
        this.demoValue = 1;
      });;
    
      this.isHidden = true;
    }

  updateTotalHT() {
  const totalHTBrut = this.commandeArticles.reduce((sum, article) => sum + article.cda_PrixTotalHT, 0);

  const totalRemiseHT = this.commandeArticles.reduce((sum, article) => sum + article.cda_TotalRemiseHT, 0);
  let totalHTApresRemise = totalHTBrut - totalRemiseHT;
  
  if (totalHTApresRemise < 0) {
    totalHTApresRemise = 0;
  }

  this.montantTVA = Math.round((totalHTApresRemise * this.tauxTVA / 100) * 100) / 100;

  this.montantTTC = Math.round((totalHTApresRemise + this.montantTVA) * 100) / 100;

  this.totalValuesUpdated.emit({
    totalHT: totalHTApresRemise,
    montantTVA: this.montantTVA,
    montantTTC: this.montantTTC
  });
}
    
    
    
    filterOption = (input: string, option: any): boolean => {
      const normalizedInput = input.toLowerCase().trim();
      const normalizedLabel = option.nzLabel.toLowerCase();
      const keywords = normalizedInput.split(/\s+/);
      return keywords.every(keyword => normalizedLabel.includes(keyword));
    };
    
    
    
}
