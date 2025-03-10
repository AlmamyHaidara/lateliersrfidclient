import { Component, OnInit } from '@angular/core';
import { NzContentComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { NzPaginationComponent } from "ng-zorro-antd/pagination";
import { Router, RouterLink } from "@angular/router";
import { CollectionRfidService } from "../../services/CollectionRfidService";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import {SpinnerComponent} from "@coreui/angular";
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzCardModule } from 'ng-zorro-antd/card';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';





@Component({
  selector: 'app-list-collection',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    NzPaginationComponent,
    RouterLink,
    NgForOf,
    SpinnerComponent,
    NgIf,
    NgClass,
    NzSkeletonModule,
    NzCardModule
  ],
  templateUrl: './list-collection.component.html',
  styleUrl: './list-collection.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ListCollectionComponent implements OnInit {
  collections: any[] = [];
  pageSize = 24;
  currentPage = 1;
  totalItemsCount = 0;
  loading: boolean = true;


  constructor(private collectionService: CollectionRfidService,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections(): void {
    this.loading = true;
    this.collectionService.getCollectionByFamilleId(1, this.currentPage, this.pageSize)
      .subscribe(response => {
        console.log('Response from getCollectionByFamilleId:', response);
        this.collections = response.items;
        this.totalItemsCount = response.totalItemsCount;
        this.loading = false;
      }, () => {
        this.loading = false;  // Assurez-vous d'arrêter le chargement même en cas d'erreur
      });
  }
  

  onPageChange(page: number): void {
    console.log('Page changed to:', page);
    this.currentPage = page;
    this.loadCollections();
  }

  showColors(collectionId: number,collectionName: string): void {
    console.log('Collection ID:', collectionId);
    localStorage.setItem('selectedCollectionName', collectionName);
    localStorage.setItem('selectedCollectionId', collectionId.toString());
    this.router.navigateByUrl(`/ListColor/${collectionId}`);


  }

}
