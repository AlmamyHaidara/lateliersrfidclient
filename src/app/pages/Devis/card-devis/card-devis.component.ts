import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AddContactComponent } from "../../add-contact/add-contact.component";
import { DeleteDevisComponent } from '../delete-devis/delete-devis.component';
import { DevisQuantityComponent } from '../devis-quantity/devis-quantity.component';
import { CustomNumberPipe } from '../../../pipe/custum-number.pipe';


@Component({
  selector: 'app-card-devis',
  standalone: true,
  imports: [
    CustomNumberPipe,
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzInputNumberModule,
    NzButtonModule,
    NzCardModule,
    NzTypographyModule,
    AddContactComponent,
    DeleteDevisComponent,
    DevisQuantityComponent
],
  templateUrl: './card-devis.component.html',
  styleUrl: './card-devis.component.css'
})
export class CardDevisComponent {
  @Input() devisArticles: any[] = [];

  deleteCard(article: any) {
    const index = this.devisArticles.indexOf(article);
    if (index > -1) {
      this.devisArticles.splice(index, 1);
    }
  }
  onQuantityChange(article: any, newQuantity: number) {
    console.log("Nouvelle quantité:", newQuantity);
    article.Dea_Quantite = newQuantity;
    this.updatePrixTotalRemiseHT(article);
  }
  

  updatePrixTotalRemiseHT(article: any) {
    const prixVente = article.Dea_PrixHT || 0; 
    const remise = article.Dea_Remise || 0;
    const quantite = article.Dea_Quantite || 1;
  
    console.log("Prix de vente:", prixVente);
    console.log("Remise:", remise);
    console.log("Quantité:", quantite);
  
    article.Dea_PrixTotalRemiseHT = Math.round(quantite * prixVente * (1 - remise / 100) * 100) / 100;
  
    console.log("Prix total remisé calculé:", article.Dea_PrixTotalRemiseHT);
  }
  
}
