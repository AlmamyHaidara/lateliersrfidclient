import { Component } from '@angular/core';
import {NzContentComponent, NzLayoutComponent} from "ng-zorro-antd/layout";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  standalone: true,
  imports: [
    NzContentComponent,
    NzLayoutComponent,
    RouterLink
  ],
  styleUrl: './parameters.component.css'
})
export class ParametersComponent {
  isCollapsed = false;

  constructor() { }

  ngOnInit() { }
}
