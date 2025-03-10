import { Component } from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";

@Component({
  selector: 'app-informations-page',
  templateUrl: './informations-page.component.html',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent
  ],
  styleUrl: './informations-page.component.css'
})
export class InformationsPageComponent {

}
