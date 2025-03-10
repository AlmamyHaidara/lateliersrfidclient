import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-devis',
  standalone:true,
  templateUrl: './delete-devis.component.html',
  styleUrl: './delete-devis.component.css'
})
export class DeleteDevisComponent {
  @Output() delete: EventEmitter<any> = new EventEmitter();

  deleteCard() {
    this.delete.emit();
  }
}
