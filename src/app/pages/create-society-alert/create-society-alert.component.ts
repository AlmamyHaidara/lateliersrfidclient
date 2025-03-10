import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-create-society-alert',
  templateUrl: './create-society-alert.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NzCheckboxComponent,
    ReactiveFormsModule,
    RouterLink
  ],
  styleUrl: './create-society-alert.component.css'
})
export class CreateSocietyAlertComponent {

}
