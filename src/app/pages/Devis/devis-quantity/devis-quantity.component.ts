import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-devis-quantity',
  standalone: true,
  imports: [
    PopupComponent
  ],
  templateUrl: './devis-quantity.component.html',
  styleUrl: './devis-quantity.component.css'
})
export class DevisQuantityComponent {
  @Input() quantity: number = 1; 
  @Output() quantityChange = new EventEmitter<number>(); // Émission de la nouvelle quantité

  incrementQuantity(){
    this.quantity++;
    this.quantityChange.emit(this.quantity); // Émission de la nouvelle quantité
  }

  decrementQuantity(){
    if (this.quantity > 1){
      this.quantity--;
      this.quantityChange.emit(this.quantity); // Émission de la nouvelle quantité
    }
  }
}
