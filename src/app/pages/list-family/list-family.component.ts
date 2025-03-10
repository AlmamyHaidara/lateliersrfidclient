import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { NzContentComponent, NzHeaderComponent, NzLayoutComponent, NzSiderComponent } from "ng-zorro-antd/layout";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { NzMenuDirective, NzMenuItemComponent } from "ng-zorro-antd/menu";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-family',
  standalone: true,
  imports: [
    NzContentComponent,
    NzHeaderComponent,
    NzIconDirective,
    NzLayoutComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    NzSiderComponent,
    RouterLink
  ],
  templateUrl: './list-family.component.html',
  styleUrls: ['./list-family.component.css']
})
export class ListFamilyComponent {
  isCollapsed = false;

  constructor() { }

  ngOnInit() { }

  showUnavailableAlert(): void {
    Swal.fire({
      icon: 'info',
      title: 'Service non disponible',
      text: 'Ce service n\'est pas disponible pour le moment. Veuillez réessayer plus tard.',
      confirmButtonText: 'OK'
    });
  }
}
