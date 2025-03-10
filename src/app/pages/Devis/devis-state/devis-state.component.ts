import { DatePipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent, NzCardTabComponent } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzTabSetComponent, NzTabComponent } from 'ng-zorro-antd/tabs';
import { OrderTrackingComponent } from '../../commandeHistory/order-tracking/order-tracking.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-devis-state',
  standalone: true,
  imports: [
    DatePipe,
    NzDatePickerModule,
    FormsModule,
    CommonModule,
    NzFormModule,
    NzLayoutComponent,
    NzCardComponent,
    OrderTrackingComponent,
    NzTabSetComponent,
    NzCardTabComponent,
    NzTabComponent,
    NzSelectModule,
    NzButtonComponent
  ],
  templateUrl: './devis-state.component.html',
  styleUrl: './devis-state.component.css'
})
export class DevisStateComponent {

  commandes: any[] = [];
  selectedYear: number | null = null;
  selectedMonth: number | null = null;
  clientId: number | null = null;

  years: NzSelectOptionInterface[] = [];
  months: NzSelectOptionInterface[] = [
    { value: 1, label: 'Janvier' },
    { value: 2, label: 'Février' },
    { value: 3, label: 'Mars' },
    { value: 4, label: 'Avril' },
    { value: 5, label: 'Mai' },
    { value: 6, label: 'Juin' },
    { value: 7, label: 'Juillet' },
    { value: 8, label: 'Août' },
    { value: 9, label: 'Septembre' },
    { value: 10, label: 'Octobre' },
    { value: 11, label: 'Novembre' },
    { value: 12, label: 'Décembre' }
  ];

  constructor(
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const clientIdStr = localStorage.getItem('scl_Cli_Id');
    if (clientIdStr) {
      this.clientId = parseInt(clientIdStr, 10);

      if (this.clientId) {
        this.commandeService.getLastSevenWithArticlesByClient(this.clientId).subscribe(
          (data) => {
            this.commandes = data;

            // Stocker les commandes dans le sessionStorage
            sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la récupération des 7 dernières commandes.', 'error');
          }
        );
      }
    } else {
      Swal.fire('Erreur', 'Client ID non trouvé dans le local storage', 'error');
    }
    this.initializeYears();
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 10; i--) {
      this.years.push({ value: i, label: i.toString() });
    }
  }

  onDateChange(): void {
    if (this.clientId && this.selectedMonth && this.selectedYear) {
      this.commandeService.getCommandesByMonthAndYear(this.clientId, this.selectedMonth, this.selectedYear)
        .subscribe(
          (data) => {
            this.commandes = data;
            sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la récupération des commandes.', 'error');
          }
        );
    }
  }

  validerCommande(id: number): void {
    const commande = this.commandes.find(c => c.cde_Id === id);
    
    if (!commande) {
      Swal.fire('Erreur', 'Commande non trouvée.', 'error');
      return;
    }

    // Appel du service pour valider la commande sans envoyer de corps de requête
    this.commandeService.validerCommande(id).subscribe(
      (response) => {
        Swal.fire('Succès', response.message || 'Votre commande a été validée avec succès !', 'success');
      },
      (error) => {
        Swal.fire('Erreur', 'Une erreur est survenue lors de la validation de la commande. Veuillez réessayer.', 'error');
      }
    );
    
}

  
  editCommande(commandeId: number): void {
    const savedCommandes = sessionStorage.getItem('commandes');
    if (savedCommandes) {
      const commandesArray = JSON.parse(savedCommandes);
      
      const commande = commandesArray.find((c: any) => c.cde_Id === commandeId);
      
      if (commande) {
        console.log('Commande trouvée :', commande);
        this.router.navigate(['/edit-commande', commande.cde_Id]); // Redirection avec l'ID de la commande
      } else {
        Swal.fire('Erreur', 'Commande non trouvée.', 'error');
      }
    } else {
      Swal.fire('Erreur', 'Aucune commande stockée dans le sessionStorage.', 'error');
    }
  }

  // Méthode pour supprimer une commande
  deleteCommande(commandeId: number): void {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette commande ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.deleteCommandePortal(commandeId).subscribe(
          () => {
            Swal.fire('Succès', 'Commande supprimée avec succès.', 'success');
            this.commandes = this.commandes.filter(c => c.cde_Id !== commandeId); // Mise à jour de la liste des commandes
            sessionStorage.setItem('commandes', JSON.stringify(this.commandes)); // Mettre à jour le sessionStorage
          },
          (error) => {
            Swal.fire('Erreur', 'Erreur lors de la suppression de la commande.', 'error');
          }
        );
      }
    });
  }
}
