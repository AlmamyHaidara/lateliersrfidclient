import { Component, Input } from '@angular/core';
import { DeleteCardComponent } from "../delete-card/delete-card.component";
import { QuantityComponent } from "../quantity/quantity.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-commande',
  templateUrl: './card-commande.component.html',
  standalone: true,
  imports: [
    CustomNumberPipe,
    DeleteCardComponent,
    QuantityComponent,
    CommonModule, 
    FormsModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzCardModule,
    NzTypographyModule
  ],
  styleUrls: ['./card-commande.component.css']
})
export class CardCommandeComponent {
  @Input() commandeArticles: any[] = [];

  deleteCard(article: any) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Cet article sera supprimé du panier !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.commandeArticles.indexOf(article);
        if (index > -1) {
          this.commandeArticles.splice(index, 1);
          localStorage.setItem('commandeArticles', JSON.stringify(this.commandeArticles));
          this.updateTotals();
          Swal.fire('Supprimé!', 'L\'article a été supprimé.', 'success');
        }
      }
    });
  }
  
  onQuantityChange(article: any, newQuantity: number) {
    console.log("Nouvelle quantité:", newQuantity);
    article.cda_Quantite = newQuantity;
    this.updatePrixTotalRemiseHT(article);
  }
  

  updatePrixTotalRemiseHT(article: any) {
    const prixVente = article.cda_Art_PrixVente || 0; 
    const remise = article.cda_Remise || 0;
    const quantite = article.cda_Quantite || 1;
  
    console.log("Prix de vente:", prixVente);
    console.log("Remise:", remise);
    console.log("Quantité:", quantite);
  
    // Calcul de la remise totale HT
    article.cda_TotalRemiseHT = Math.round(quantite * prixVente * (remise / 100) * 100) / 100;
    
    // Calcul du prix total remisé HT
    article.cda_PrixTotalRemiseHT = Math.round((quantite * prixVente - article.cda_TotalRemiseHT) * 100) / 100;
  
    console.log("Total remise HT calculé:", article.cda_TotalRemiseHT);
    console.log("Prix total remisé HT calculé:", article.cda_PrixTotalRemiseHT);
  }
  
  updateTotals() {
    // Calcul du total HT (hors taxes)
    const totalHT = this.commandeArticles.reduce((sum, article) => sum + (article.cda_PrixTotalRemiseHT || 0), 0);
  
    // Calcul de la TVA et du montant TTC (toutes taxes comprises)
    const tauxTVA = 20; // Remplacez par votre taux réel
    const montantTVA = Math.round(totalHT * (tauxTVA / 100) * 100) / 100;
    const montantTTC = totalHT + montantTVA;
  
    console.log('Totaux mis à jour:', { totalHT, montantTVA, montantTTC });
  }
  
  
  
}
