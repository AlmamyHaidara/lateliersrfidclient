import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {Router, RouterLink} from "@angular/router";
import {ContactService} from "../../services/contact-service.service";
import {FonctionContactService} from "../../services/fonction-contact.service";
import {CommonModule, NgForOf} from "@angular/common";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ContactFormComponent } from "../contact-form/contact-form.component";


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink,
    NgForOf, FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzCardModule,
    CommonModule,
    ContactFormComponent
],
  styleUrl: './add-contact.component.css'
})
export class AddContactComponent  {
 
}
