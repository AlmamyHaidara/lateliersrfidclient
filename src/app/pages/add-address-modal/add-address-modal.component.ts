import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddAdressFormComponent } from "../add-adress-form/add-adress-form.component";
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-address-modal',
  standalone: true,

  templateUrl: './add-address-modal.component.html',
  styleUrl: './add-address-modal.component.css',
  imports: [AddAdressFormComponent,
    NzModalModule
  ]
})
export class AddAddressModalComponent {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() addressAdded = new EventEmitter<void>();

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleModalClose(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.addressAdded.emit()
  }
}
