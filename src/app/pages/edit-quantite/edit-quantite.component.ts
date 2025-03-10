import { Component, Input } from '@angular/core';
import { CommandeService } from '../../services/commande.service';

@Component({
  selector: 'app-edit-quantite',
  standalone:true,
  imports:[

  ],
  templateUrl: './edit-quantite.component.html',
  styleUrl: './edit-quantite.component.css'
})
export class EditQuantiteComponent {
  @Input() article: any;

  constructor(private commandeService: CommandeService) {}

  incrementQuantity() {
    this.updateQuantity(this.article.cda_Quantite + 1);
  }

  decrementQuantity() {
    if (this.article.cda_Quantite > 1) {
      this.updateQuantity(this.article.cda_Quantite - 1);
    }
  }

  private updateQuantity(newQuantity: number) {
    this.commandeService.updateArticleQuantityAndRecalculate(this.article.cda_Id, newQuantity);
  }

  
  KeyPressEntrer(event:any) : void{
    const inputValue = (event.target as HTMLInputElement).value;
    const quantity = parseFloat(inputValue);
    if(quantity >= 1){
      this.updateQuantity(quantity);
    }
  }
}
