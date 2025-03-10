import { Component } from '@angular/core';
import {ChartjsComponent} from "@coreui/angular-chartjs";

@Component({
  selector: 'app-chart2',
  imports: [
    ChartjsComponent
  ],
  templateUrl: './chart2.component.html',
  standalone: true,
  styleUrl: './chart2.component.css'
})
export class Chart2Component {

  data = {
    labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    datasets: [
      {
        data: [11, 16, 7, 3, 14],
        backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
      }
    ]
  };


}
