import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NzIconDirective,
    CommonModule
  ],
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  currentRoute: string = '';
  admin = "";
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url.split("?")[0];
        this.admin = event.url.split("#")[0];
        console.log('Route actuelle :', this.currentRoute);
      }
    });
  }

}
