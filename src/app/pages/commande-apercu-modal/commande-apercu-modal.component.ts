import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';



@Component({
  selector: 'app-commande-apercu-modal',
  templateUrl: './commande-apercu-modal.component.html',
  standalone: true,
  imports: [
    NzModalModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule
  ],
  styleUrl: './commande-apercu-modal.component.css'

})
export class CommandeApercuModalComponent {
  @Input() isVisible: boolean = false;
  @Input() commandeDetails: any = {};
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleOk(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
