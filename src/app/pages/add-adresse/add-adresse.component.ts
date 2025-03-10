import { Component } from '@angular/core';
import {AdresseService} from "../../services/adresse.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {Router} from "@angular/router";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AddAdressFormComponent } from "../add-adress-form/add-adress-form.component";


@Component({
  selector: 'app-add-adresse',
  templateUrl: './add-adresse.component.html',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzCardModule,
    NzLayoutComponent,
    AddAdressFormComponent
],
  styleUrl: './add-adresse.component.css'
})
export class AddAdresseComponent {
  
}
