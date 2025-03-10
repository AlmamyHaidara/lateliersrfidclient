import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { CollectionRfidService } from '../../../services/CollectionRfidService';
import { RemiseService } from '../../../services/remise.service';
import { NgIf, NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { CustomNumberPipe } from '../../../pipe/custum-number.pipe';

@Component({
  selector: 'app-modal-devis',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    NzSelectComponent,
    NzOptionComponent,
    NzInputNumberComponent,
    CommonModule,
    CustomNumberPipe
  ],
  templateUrl: './modal-devis.component.html',
  styleUrl: './modal-devis.component.css'
})
export class ModalDevisComponent {
  @Output() addArticle = new EventEmitter<any>();

    Dea_PrixTotalHT: number = 0; // Somme totale de tous les articles
    listOfOption: any[] = []; 
    selectedArticleId: number | null = null; // Stocke l'ID de l'article sélectionné
    selectedArticleDesignation: string | null = null; // Stocke la désignation de l'article sélectionné
    demoValue = 0; 
    remiseValue = 0; 
    isHidden = false;
    loading = true;
    selectedArticlePrixVente: number | null = null; // Stocke le prix de vente de l'article sélectionné
    devisArticles: any[] = []; // Tableau pour stocker les articles ajoutés

  
  
    constructor(
      private collectionRfidService: CollectionRfidService,
      private remiseService: RemiseService // Injection du service Remise
    ) {}
  
    ngOnInit() {
      this.loadAllArticles();
    }
  
    loadAllArticles() {
      this.collectionRfidService.getAllArticles().subscribe(
        (articles: any[]) => {
          // Stocke l'ID et la désignation de chaque article
          this.listOfOption = articles.map(article => ({
            id: article.art_id,
            designation: article.art_designation,
            prixvente: article.art_prixvente // Récupération du prix de vente
          }));
          this.loading = false; // Arrête le spinner après le chargement
        },
        (error: any) => {
          console.error('Erreur lors de la récupération des articles :', error);
          this.loading = false;
        }
      );
    }
  
    onSelect(articleId: number): void {
      this.selectedArticleId = articleId; // Stocke l'ID de l'article
      // Récupération de la désignation et du prix de vente de l'article sélectionné
      const selectedArticle = this.listOfOption.find(article => article.id === articleId);
    
      if (selectedArticle) {
        this.selectedArticlePrixVente = selectedArticle.prixvente; // Assurez-vous que le prix de vente est récupéré correctement
        this.selectedArticleDesignation = selectedArticle.designation; // Récupération de la désignation
      } else {
        console.error("Article non trouvé !");
        this.selectedArticlePrixVente = 0;
        this.selectedArticleDesignation = '';
      }
    
      const clientId = localStorage.getItem('scl_Cli_Id'); // Récupération de l'ID client depuis le local storage
      if (clientId && this.selectedArticleId) {
        this.remiseService.getRemiseByIdClientIdArticle(Number(clientId), this.selectedArticleId).subscribe(
          (remise: any) => {
            this.remiseValue = remise ? remise.clr_Remise : 0; // Utilise clr_Remise
          },
          (error: any) => {
            console.error('Erreur lors de la récupération de la remise :', error);
            this.remiseValue = 0;
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
    

      const prixTotalRemiseHT = Math.round(quantite * prixVente * (1 - remise / 100) * 100) / 100;
    
      const article = {
        Dea_Id: 0, // Assurez-vous que la valeur par défaut est bien définie
        Dea_Dev_Id: 0, // Valeur par défaut ou celle définie
        Dea_Art_Id: this.selectedArticleId, // ID de l'article sélectionné
        Dea_PrixHT: this.selectedArticlePrixVente || 0, // Utilisez le prix de vente sélectionné
        Dea_Tva: 0, // Assurez-vous de renseigner une valeur par défaut
        Dea_Quantite: this.demoValue,
        Dea_Remise: this.remiseValue || 0, // Utilise la remise récupérée ou 0 par défaut
        Dea_Art_Designation: this.selectedArticleDesignation || '',
        Dea_Art_CodeArticle: 0, // Valeur par défaut ou renseignez-la si elle est requise
        Dea_PrixTotalHT: this.demoValue * (this.selectedArticlePrixVente || 0), // Calcul du prix total HT
        Dea_PoidsTotal: 0, // Assurez-vous de renseigner une valeur par défaut
        Dea_PrixTotalRemiseHT: prixTotalRemiseHT,
        Dea_TotalRemiseHT: prixTotalRemiseHT // Ou un autre calcul selon votre logique métier
      };
      console.log(article);
      
    
      this.addArticle.emit(article);
      this.devisArticles.push(article);
      this.updateTotalHT(); // Met
      // Affiche une alerte de succès
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: 'Article ajouté au panier avec succès!',
      });
    
      this.isHidden = true;
    }
    
    // Méthode pour calculer la somme totale des prix remisés
    updateTotalHT() {
      this.Dea_PrixTotalHT = this.devisArticles.reduce((sum, article) => sum + article.Dea_PrixTotalRemiseHT, 0);
    }

}
