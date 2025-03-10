import {Component, OnInit} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CollectionRfidService} from "../../services/CollectionRfidService";
import {NgForOf, NgIf} from "@angular/common";
import {SpinnerComponent} from "@coreui/angular";

@Component({
  selector: 'app-list-dimensions',
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
  templateUrl: './list-dimensions.component.html',
  styleUrl: './list-dimensions.component.css'
})
export class ListDimensionsComponent implements OnInit {
  dimensions: any[] = [];
  collectionId: number = 0;
  gammeId: number = 0;
  colorName: string = '';
  collectionName: string = '';
  loading: boolean = true;




  constructor(private route: ActivatedRoute, private collectionService: CollectionRfidService,private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collectionId = Number(params.get('collectionId'));
      this.gammeId = Number(params.get('gammeId'));
      this.colorName = localStorage.getItem('selectedColorName') || '';
      this.collectionName = localStorage.getItem('selectedCollectionName') || '';

      this.loadDimensions();
    });
  }



  loadDimensions(): void {
    this.loading =true;
    console.log('Collection ID:', this.collectionId);
    console.log('Gamme ID:', this.gammeId);

    this.collectionService.getArticleByCollectionIdAndGammeId(this.collectionId, this.gammeId).subscribe(
      articles => {
        console.log('Articles:', articles);

        this.dimensions = articles.map(article => {
          return { dimension: article.dimensions, art_id: article.art_id };
        });
        this.loading =false;

        console.log('Dimensions:', this.dimensions);
      },
      error => {
        console.error('Une erreur s\'est produite lors du chargement des dimensions :', error);
      }
    );
  }
  selectArticle(artId: number,dimension:string): void {
    localStorage.setItem('selectedArtId', artId.toString());
    localStorage.setItem('selectedDimension', dimension);
    this.router.navigateByUrl(`/association/${artId}`);
  }

  goBack(): void {
    this.router.navigateByUrl(`/ListColor/${this.collectionId}`);
  }

}

