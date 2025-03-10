import {Component, OnInit} from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {RouterLink} from "@angular/router";
import { SlickCarouselModule, SlickCarouselComponent } from 'ngx-slick-carousel';
import { NzCardModule } from 'ng-zorro-antd/card';

import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent, CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";
import {CommonModule, NgForOf} from "@angular/common";
import {Chart1Component} from "../chart1/chart1.component";
import {Chart2Component} from "../chart2/chart2.component";
import { CommandeService } from '../../services/commande.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    NzPaginationComponent,
    RouterLink,
    SlickCarouselModule,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselControlComponent,
    CarouselComponent,
    CarouselCaptionComponent,
    CarouselIndicatorsComponent,
    NgForOf,
    CommonModule,
    Chart1Component,
    Chart2Component,
    NzCardModule,
    AsyncPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  slides: any[] = new Array(3).fill({ id: -1, src: '', title: '', subtitle: '' });

  pendingOrdersCount: number = 10; 
  cancelledOrdersCount: number =2; 
  deliveredOrdersCount:number=0;
  // commandeEnAttente: number | null = null; 
  commandeEnAttente!: Observable<number>;
  commandeValider!: Observable<number>;
  commandesDuJour!: Observable<number>;
  commandesDuMois!: Observable<number>;

  loading =true;

  constructor(private commandeService : CommandeService,) {}

  scl_Cli_Id!: string | null
  
  ngOnInit(): void {
    
    setTimeout(() => {
        
      this.scl_Cli_Id = localStorage.getItem('scl_Cli_Id');

      if (this.scl_Cli_Id !== null) {

        const id = Number(this.scl_Cli_Id);
        // this.getOrderWaiting(id);
        this.commandeEnAttente = this.commandeService.getNombreDeCommandeEnAttente(id);
        this.commandeValider = this.commandeService.getNombreDeCommandeValider(id);
        this.commandesDuJour = this.commandeService.getNombreDeCommandeDuJour(id);
        this.commandesDuMois = this.commandeService.getNombreDeCommandeDuMois(id);
        
        setTimeout(() => {
          this.loading = false;
        }, 500);  

      } else {
        console.error('ID de contact non trouvé dans le localStorage');
      }
    }, 500);

    
    this.slides[0] = {
      id: 0,
      src: './assets/carousel/camion_location.jpg',
      title: "Grâce à la location, vous pourrez ainsi profiter de nos textiles d'\évènements tels que les nappes lateliers a mis en\
       place un service de location dans le but de simplifier\
       la vie de ses clients qui ne souhaitent pas acheter les produits mais préfèrent en bénéficier sur une période donnée.",
      subtitle: ''
    };
    this.slides[1] = {
      id: 1,
      src: './assets/carousel/professionnel-location-nappes.jpg',
      title: "Nous vous offrons la possibilité de tout créer de A à Z,\
       du choix de la matière en passant par la couleur, l’imprimé, la\
       broderie mais également vous pourrez choisir la taille, l'épaisseur, le diamètre, etc.",
      subtitle: ''
    };
    this.slides[2] = {
      id: 2,
      src: './assets/carousel/sur-mesure.jpg',
      title: 'Ils vous conseilleront et répondront à vos besoins en mettant en place un stock constant pour votre entreprise.\
      Vous conviendrez d\'une date de livraison afin de bénéficier de votre linge, mais également d\'une date d\'enlèvement\
       qui vous permettra de nous retourner votre linge usagé.',
      subtitle: ''
    };
    // this.slides[3] = {
    //   id: 3,
    //   src: 'assets/Login/imgDashbrd.jpg',
    //   title: "Nous vous offrons la possibilité de tout créer de A à Z,\
    //    du choix de la matière en passant par la couleur, l’imprimé, la\
    //    broderie mais également vous pourrez choisir la taille, l'épaisseur, le diamètre, etc.",
    //   subtitle: ''
    // };

    this.getOrderCounts();
  }

  // getOrderWaiting(id: number): void {
  //   this.commandeService.getNombreDeCommandeEnAttente(id).subscribe(
  //     (data: number) => {
  //       this.commandeEnAttente = data;
        
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  getOrderCounts(): void {
    this.pendingOrdersCount = 0; 
    this.cancelledOrdersCount = 0; 
  }
  
  //  commandeEnAttente = this.commandeService.getNombreDeCommandeEnAttente(this.scl_Cli_Id);
  
}
