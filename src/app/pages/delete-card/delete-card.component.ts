import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-delete-card',
  templateUrl: './delete-card.component.html',
  standalone: true,
  styleUrl: './delete-card.component.css'
})
export class DeleteCardComponent {
  @Output() delete: EventEmitter<any> = new EventEmitter();

  deleteCard() {
    this.delete.emit();
  }
}
