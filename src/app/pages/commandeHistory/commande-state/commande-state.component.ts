  import { Component } from '@angular/core';
  import Swal from 'sweetalert2';
  import { CommandeService } from '../../../services/commande.service';
  import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
  import { FormsModule } from '@angular/forms';
  import { CommonModule, DatePipe } from '@angular/common';
  import { NzFormModule } from 'ng-zorro-antd/form';
  import { NzCardComponent, NzCardTabComponent } from 'ng-zorro-antd/card';
  import { NzLayoutComponent } from 'ng-zorro-antd/layout';
  import { OrderTrackingComponent } from '../order-tracking/order-tracking.component';
  import { NzTabComponent, NzTabSetComponent } from 'ng-zorro-antd/tabs';
  import { NzSelectModule } from 'ng-zorro-antd/select';
  import { Router } from '@angular/router';
  import { NzButtonComponent } from 'ng-zorro-antd/button';
  import { NzBadgeModule } from 'ng-zorro-antd/badge';
  import { NzPaginationModule } from 'ng-zorro-antd/pagination';
  import { CustomNumberPipe } from '../../../pipe/custum-number.pipe';
  import { ApercucommandeComponent } from '../../apercucommande/apercucommande.component';
  



  interface NzSelectOptionInterface {
    value: number;
    label: string;
  }

  @Component({
    selector: 'app-commande-state',
    templateUrl: './commande-state.component.html',
    standalone: true,
    imports: [
      ApercucommandeComponent,
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
      NzButtonComponent,
      NzBadgeModule,
      NzPaginationModule,
      CustomNumberPipe
    ],
    styleUrls: ['./commande-state.component.scss']
  })
  export class CommandeStateComponent {

    commandes: any[] = [];
    selectedYear: number | null = null;
    selectedMonth: number | null = null;
    clientId: number | null = null;
    currentPage = 1;
    pageSize = 5; 
    paginatedCommandes: any[] = []; 
    loading=true;
    showValidated: boolean | null = null;
    isFormVisible = true; // Gérer la visibilité du formulaire
    totalCommandes = 0; 
    totalPages = 0; // Nombre total de pages

    searchCriteria: {
      numCommande?: number;
      reference?: string;
    } = {};
    
    validatingCommandeId: number | null = null;



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
          this.commandeService.getLastSevenBothWithArticlesByClient(this.clientId).subscribe(
            (data) => {
              this.commandes = data;
              console.log("commandes : ", data);
              
              sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
              this.filterCommandes(); // Appliquer le filtre selon l'état initial du switch
              this.loading = false; 
            },
            (error) => {
              Swal.fire('Erreur', "Vous n'avez pas de commandes, pour le moment", 'error');
              this.loading = false;
            }
          );
        }
      } else {
        Swal.fire('Erreur', 'Client ID non trouvé dans le local storage', 'error');
        this.loading = false;
      }
      this.initializeYears();
    }
    
    filterCommandes(): void {
      if (this.showValidated === null) {

        this.commandes = JSON.parse(sessionStorage.getItem('commandes') || '[]');
      } else {
        this.commandes = JSON.parse(sessionStorage.getItem('commandes') || '[]')
          .filter((commande: any) => (commande.cde_Valide || commande.cde_Numcommande != 888888)  === this.showValidated);
      }
    }
    onSubmitSearch(): void {
      if (!this.clientId) {
        Swal.fire('Erreur', 'Client ID manquant', 'error');
        return;
      }
    
      const numCommande = this.searchCriteria.numCommande || undefined;
      const reference = this.searchCriteria.reference?.trim() || undefined;
    
      if (!numCommande && !reference) {
        Swal.fire('Erreur', 'Veuillez spécifier un numéro de commande ou une référence.', 'error');
        return;
      }
    
      this.loading = true;
    
      this.commandeService
        .searchCommandesByCriteria(this.clientId, numCommande, reference)
        .subscribe(
          (data) => {
            if (data.length === 1) {
              this.commandes = data;
            } else {
              Swal.fire('Erreur', 'Plusieurs commandes correspondent aux critères.', 'error');
            }
            this.loading = false;
          },
          (error) => {
            if (error.status === 400) {
              Swal.fire('Erreur', "Demande incorrecte. Vérifiez les paramètres de la recherche.", 'error');
            } else if (error.status === 500) {
              Swal.fire('Erreur', "Erreur interne du serveur. Veuillez réessayer plus tard.", 'error');
            } else {
              Swal.fire('Erreur', "Erreur inconnue lors de la recherche des commandes.", 'error');
            }
            this.loading = false;
          }
        );
    }
    
    
    
    
    initializeYears(): void {
      const currentYear = new Date().getFullYear();
      for (let i = currentYear; i >= currentYear - 10; i--) {
        this.years.push({ value: i, label: i.toString() });
      }
    }

 /*    onDateChange(): void {
      if (this.clientId && this.selectedMonth && this.selectedYear) {
        this.loading = true;
    
        this.commandeService.GetByMonthAndYearWithArticlesByClient(this.clientId, this.selectedMonth, this.selectedYear)
          .subscribe(
            (data) => {
              console.log('Données reçues du backend:', data);
              this.commandes = data;
              sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
              this.loading = false;
            },
            (error) => {
              Swal.fire('Erreur', "Vous n'avez pas de commandes, pour le moment", 'error');
              this.loading = false;
            }
          );
      }
    } */
    

      onDateChange(type: 'month' | 'year'): void {
        if (!this.clientId) {
          Swal.fire('Erreur', 'Client ID non trouvé.', 'error');
          return;
        }
      
        if (type === 'month') {
          if (!this.selectedYear) {
            Swal.fire('Attention', 'Veuillez sélectionner une année avant de choisir un mois.', 'warning');
            this.selectedMonth = null; // Réinitialisation du mois si l'année n'est pas sélectionnée
            return;
          }
      
          if (this.selectedMonth && this.selectedYear) {
            this.loading = true;
      
            this.commandeService
              .GetByMonthAndYearWithArticlesByClient(this.clientId, this.selectedMonth, this.selectedYear, this.currentPage)
              .subscribe({
                next: (data) => {
                  if (data && data.commandes) {
                    this.commandes = data.commandes;
                    this.totalCommandes = data.totalCount;
                    this.totalPages = Math.ceil(this.totalCommandes / data.pageSize); 
                    sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
                  } else {
                    Swal.fire('Information', 'Aucune commande trouvée pour ce mois et cette année.', 'info');
                  }
                  this.loading = false;
                },
                error: (error) => {
                  console.error('Erreur lors de la récupération des commandes :', error);
                  Swal.fire('Erreur', "Aucune commande trouvée pour ce mois et cette année.", 'error');
                  this.loading = false;
                },
              });
          }
        } else if (type === 'year') {
          if (!this.selectedYear) {
            Swal.fire('Erreur', 'Veuillez sélectionner une année.', 'error');
            return;
          }
      
          if (this.selectedMonth) {
            this.loading = true;
      
            this.commandeService
              .GetByMonthAndYearWithArticlesByClient(this.clientId, this.selectedMonth, this.selectedYear, this.currentPage)
              .subscribe({
                next: (data) => {
                  if (data && data.commandes) {
                    this.commandes = data.commandes;
                    this.totalCommandes = data.totalCount;
                    this.totalPages = Math.ceil(this.totalCommandes / data.pageSize); // Calcul des pages totales
                    sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
                  } else {
                    Swal.fire('Information', 'Aucune commande trouvée pour ce mois et cette année.', 'info');
                  }
                  this.loading = false;
                },
                error: (error) => {
                  console.error('Erreur lors de la récupération des commandes :', error);
                  Swal.fire('Erreur', "Aucune commande trouvée pour ce mois et cette année.", 'error');
                  this.loading = false;
                },
              });
          } else {
            // Si seul l'année est sélectionnée, charger avec pagination
            this.loadCommandesByYear();
          }
        }
      }
      
      loadCommandesByYear(): void {
        if (!this.selectedYear || !this.clientId) {
          Swal.fire('Erreur', 'Année ou Client ID non défini.', 'error');
          return;
        }
      
        this.loading = true;
      
        this.commandeService
          .CommandeGetByYearWithArticles(this.clientId, this.selectedYear, this.currentPage)
          .subscribe({
            next: (data) => {
              if (data && data.commandes) {
                this.commandes = data.commandes;
                this.totalCommandes = data.totalCount;
                const pageSize = 20; // Taille de la page
                this.totalPages = Math.ceil(this.totalCommandes / pageSize);
                                sessionStorage.setItem('commandes', JSON.stringify(this.commandes));
              } else {
                Swal.fire('Information', 'Aucune commande trouvée pour cette année.', 'info');
              }
              this.loading = false;
            },
            error: (error) => {
              console.error('Erreur lors de la récupération des commandes :', error);
              Swal.fire('Erreur', 'Une erreur est survenue lors de la récupération des commandes.', 'error');
              this.loading = false;
            },
          });
      }
      
      onPageChange(page: number): void {
        this.currentPage = page;
      
        if (this.selectedMonth) {
          // Charger par mois et année si le mois est sélectionné
          this.onDateChange('month');
        } else {
          // Charger par année si aucun mois n'est sélectionné
          this.loadCommandesByYear();
        }
      }
      
    
    validerCommande(id: number): void {
      const commande = this.commandes.find(c => c.cde_Id === id);
    
      if (!commande) {
        Swal.fire('Erreur', 'Commande non trouvée.', 'error');
        return;
      }
    
      if (commande.cde_Valide) {
        Swal.fire('Erreur', 'Cette commande a déjà été validée.', 'error');
        return;
      }
    
      this.validatingCommandeId = id; 
    
      this.commandeService.validerCommande(id).subscribe(
        (response) => {
          Swal.fire({
            title: 'Succès',
            text: response.message || 'Votre commande a été validée avec succès !',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload();
          });
    
          commande.cde_Valide = true;
          this.validatingCommandeId = null; 
        },
        (error) => {
          if (error.status === 400) {
            Swal.fire('Erreur', "Erreur lors de la validation de la commande. La demande est incorrecte.", 'error');
          } else if (error.status === 401) {
            Swal.fire('Erreur', "Non autorisé. Vous devez vous reconnecter pour valider la commande.", 'error');
          } else if (error.status === 500) {
            Swal.fire('Erreur', "Erreur interne du serveur lors de la validation de la commande. Veuillez réessayer plus tard.", 'error');
          } else {
            Swal.fire('Erreur', 'Une erreur est survenue lors de la validation de la commande. Veuillez réessayer.', 'error');
          }
          this.validatingCommandeId = null;
        }
      );
    }
    
    isApercuModalVisible : boolean = false;
    commandeApercu: any = {};
    isApercuVisible(i:number) { 
      this.commandeApercu = this.commandes[i];
      this.isApercuModalVisible = true
      
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
              this.commandes = this.commandes.filter(c => c.cde_Id !== commandeId); 
              sessionStorage.setItem('commandes', JSON.stringify(this.commandes)); // Mettre à jour le sessionStorage
            },
            (error) => {
              if (error.status === 400) {
                Swal.fire('Erreur', "Demande incorrecte lors de la suppression de la commande.", 'error');
              } else if (error.status === 401) {
                Swal.fire('Erreur', "Non autorisé. Veuillez vous reconnecter pour supprimer la commande.", 'error');
              } else if (error.status === 500) {
                Swal.fire('Erreur', "Erreur interne du serveur lors de la suppression de la commande. Veuillez réessayer plus tard.", 'error');
              } else {
                Swal.fire('Erreur', 'Erreur inconnue lors de la suppression de la commande.', 'error');
              }
            }
          );
        }
      });
    }

    
  }
