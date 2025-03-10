import {Component, OnInit} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CollectionRfidService} from "../../services/CollectionRfidService";
import {NgForOf, NgIf} from "@angular/common";
import {SpinnerComponent} from "@coreui/angular";

@Component({
  selector: 'app-list-color',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    NzPaginationComponent,
    RouterLink,
    NgForOf,
    NgIf,
    SpinnerComponent
  ],
  templateUrl: './list-color.component.html',
  styleUrl: './list-color.component.css'
})
export class ListColorComponent implements OnInit {
  colors: any[] = [];
  collectionId: number | null = null;
  dimensions: string[] = [];
  collectionName: string | null = null;
  loading: boolean = true;







  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionRfidService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.collectionName = localStorage.getItem('selectedCollectionName');
    this.collectionId = Number(localStorage.getItem('selectedCollectionId'));
    this.route.paramMap.subscribe(params => {
      const paramId = params.get('collectionId');
      if (paramId !== null) {
        this.collectionId = +paramId;
        console.log('Collection ID:', this.collectionId);
        this.loadColors(this.collectionId);
      } else {
        console.error('Collection ID is null');
      }
    });
  }

  loadColors(collectionId: number): void {
    this.loading =true;
    this.collectionService.getCouleurByCollectionId(collectionId)
      .subscribe(colors => {
        this.colors = colors;
        this.dimensions = this.colors.map(color => color.dimensions);
        this.loading =false;

      });
  }


  showDimensions(gammeId: number, colorName: string): void {
    localStorage.setItem('selectedColorName', colorName);
    localStorage.setItem('selectedGammeId', gammeId.toString());
    const collectionIdString = localStorage.getItem('selectedCollectionId');
    if (collectionIdString !== null) {
      const collectionId = +collectionIdString;
      this.router.navigateByUrl(`/list-dim/${collectionId}/${gammeId}`);
    } else {
      console.error('Collection ID is null');
    }
  }




}
