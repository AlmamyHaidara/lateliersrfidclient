import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AdresseService} from "../../services/adresse.service";

@Component({
  selector: 'app-edit-adresse',
  templateUrl: './edit-adresse.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink
  ],
  styleUrl: './edit-adresse.component.css'
})
export class EditAdresseComponent implements OnInit {
  adresseId!: number;
  adresse: any = {};
  errorMessage: string = '';

  constructor(private adresseService: AdresseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.adresseId = +params['id'];
      this.adresseService.getAdresseById(this.adresseId).subscribe(
        response => {
          this.adresse = response;
        },
        error => {
          console.error('Erreur lors de la récupération des détails de l\'adresse : ', error);
          this.errorMessage = 'Erreur lors de la récupération des détails de l\'adresse.';
        }
      );
    });
  }

  updateAdresse() {
    this.adresseService.updateAdresse(this.adresseId, this.adresse).subscribe(
      response => {
        console.log('Adresse mise à jour avec succès : ', response);
        this.router.navigate(['/adresse']);
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'adresse : ', error);
        this.errorMessage = 'Erreur lors de la mise à jour de l\'adresse.';
      }
    );
  }
}
