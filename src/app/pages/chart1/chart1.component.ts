import { Component } from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {NzPaginationComponent} from "ng-zorro-antd/pagination";
import {RouterLink} from "@angular/router";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {
  CarouselCaptionComponent,
  CarouselComponent,
  CarouselControlComponent, CarouselIndicatorsComponent,
  CarouselInnerComponent,
  CarouselItemComponent
} from "@coreui/angular";
import {NgForOf} from "@angular/common";
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-chart1',
  imports: [
    ChartjsComponent

  ],
  templateUrl: './chart1.component.html',
  standalone: true,
  styleUrl: './chart1.component.css'
})
export class Chart1Component {
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 80, 40]
      }
    ]
  };
}
