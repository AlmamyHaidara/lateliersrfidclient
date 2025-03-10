import { Component } from '@angular/core';
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {PopupComponent} from "../popup/popup.component";
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { CommonModule } from '@angular/common';

import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRateModule } from 'ng-zorro-antd/rate'

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  standalone: true,
    imports: [
        CommonModule,
        NzLayoutComponent,
        PopupComponent,
        FormsModule,
        FormsModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzInputModule,
        NzButtonModule,
        NzCardModule,
        NzTagModule,
        NzRateModule
        
    ],
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  sortOrder = 'high';
  searchValue = '';

  products = [
    {
      name: 'Bamboo Watch',
      description: 'Product Description',
      price: 65,
      rating: 5,
      status: 'INSTOCK',
      statusColor: 'green',
      category: 'Accessories',
      image: 'path/to/image1.jpg',
    },
    {
      name: 'Black Watch',
      description: 'Product Description',
      price: 72,
      rating: 4,
      status: 'OUTOFSTOCK',
      statusColor: 'red',
      category: 'Accessories',
      image: 'path/to/image2.jpg'
    },
    {
      name: 'Blue Band',
      description: 'Product Description',
      price: 79,
      rating: 3,
      status: 'LOWSTOCK',
      statusColor: 'orange',
      category: 'Fitness',
      image: 'path/to/image3.jpg'
    },
    // add more products as needed
  ];
}
