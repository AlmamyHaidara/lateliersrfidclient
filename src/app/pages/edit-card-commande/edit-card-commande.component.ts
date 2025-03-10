import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DeleteCardComponent } from '../delete-card/delete-card.component';
import { QuantityComponent } from '../quantity/quantity.component';
import { CommandeService } from '../../services/commande.service';
import { EditQuantiteComponent } from "../edit-quantite/edit-quantite.component";
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-card-commande',
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
    NzTypographyModule,
    EditQuantiteComponent
],
  templateUrl: './edit-card-commande.component.html',
  styleUrls: ['./edit-card-commande.component.css']
})
export class EditCardCommandeComponent implements OnInit  {


    constructor(public commandeService: CommandeService) {}

    ngOnInit() {
      this.commandeService.commandeArticles$.subscribe(articles => {
        console.log('Articles reçus via le service:', articles);
      });
    }
/* 
    onQuantityChange(article: any, newQuantity: number) {
      article.cda_Quantite = newQuantity;
      this.commandeService.calculateDiscountedTotal(article); 
    
      const updatedArticles = this.commandeArticles.map(a => 
        a.cda_Id === article.cda_Id ? article : a
      );
      this.commandeService.setCommandeArticles(updatedArticles);
    } */

    onQuantityChange(article: any, newQuantity: number) {
      // Appeler la méthode du service pour mettre à jour la quantité et recalculer le total remisé
      this.commandeService.updateArticleQuantityAndRecalculate(article.cda_Id, newQuantity);
    }
    
    
    deleteCard(article: any) {
      if (!article || !article.cda_Id) {
        Swal.fire('Erreur', 'Impossible de supprimer cet article car son ID est introuvable.', 'error');
        return;
      }
    
      Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: "Cet article sera supprimé définitivement !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer !'
      }).then((result) => {
        if (result.isConfirmed) {
          // Supprimer l'article via le service
          this.commandeService.removeArticle(article.cda_Id).subscribe({
            next: () => {
              // Supprimer l'article localement et mettre à jour le Total HT
              this.commandeService.deleteCommandeArticle(article);
              Swal.fire('Supprimé!', 'L\'article a été supprimé avec succès.', 'success');
            },
            error: (err) => {
              console.error('Erreur lors de la suppression de l\'article :', err);
              Swal.fire('Erreur', 'Impossible de supprimer l\'article.', 'error');
            }
          });
        }
      });
    }
    
    
    
  }    