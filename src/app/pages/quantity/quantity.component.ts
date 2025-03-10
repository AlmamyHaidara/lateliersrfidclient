import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  standalone: true,
  imports: [
    PopupComponent
  ],
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {
  @Input() quantity: number = 1; 
  @Output() quantityChange = new EventEmitter<number>();

  incrementQuantity(){
    this.quantity++;
    this.quantityChange.emit(this.quantity); // Émission de la nouvelle quantité
  }

  decrementQuantity(){
    if (this.quantity > 1){
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  KeyPressEntrer(event:any) : void{
    const inputValue = (event.target as HTMLInputElement).value;
    const quantity = parseFloat(inputValue);
    this.quantity = quantity
    if(this.quantity >= 1){
      this.quantityChange.emit(quantity);
    }
  }
}
