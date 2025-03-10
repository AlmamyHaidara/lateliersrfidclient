import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactFormComponent } from "../contact-form/contact-form.component";
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-add-contact-modal',
  standalone:true,
  templateUrl: './add-contact-modal.component.html',
  styleUrl: './add-contact-modal.component.css',
  imports: [ContactFormComponent,
    NzModalModule
  ]
})
export class AddContactModalComponent {
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() ContactAdded = new EventEmitter<void>();

  

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleModalClose():void{
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
    this.ContactAdded.emit()
  }
}
