import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  standalone: true,
  imports: [
    RouterLink
  ],
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  onSearch(searchValue: string) {
    // Utilisez la valeur de recherche (searchValue) pour effectuer votre recherche ici
    console.log("Recherche en cours...", searchValue);
  }
}
