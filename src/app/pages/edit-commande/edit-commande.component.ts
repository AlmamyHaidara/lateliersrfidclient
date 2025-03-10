import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { AddAddressModalComponent } from '../add-address-modal/add-address-modal.component';
import { AddAdresseComponent } from '../add-adresse/add-adresse.component';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component';
import { CommandeApercuModalComponent } from '../commande-apercu-modal/commande-apercu-modal.component';
import { PopupComponent } from '../popup/popup.component';
import Swal from 'sweetalert2';
import { AdresseService } from '../../services/adresse.service';
import { CommandeService } from '../../services/commande.service';
import { ContactService } from '../../services/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { EditCardCommandeComponent } from '../edit-card-commande/edit-card-commande.component';
import { BehaviorSubject } from 'rxjs';
import { EditImpressionModalComponent } from "../edit-impression-modal/edit-impression-modal.component";
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';

@Component({
  selector: 'app-edit-commande',
  standalone: true,
  imports: [
    CommonModule,
    NzSpaceComponent,
    NzSelectComponent,
    NzSpaceItemDirective,
    NzInputDirective,
    NzInputGroupComponent,
    EditCardCommandeComponent,
    NzDatePickerComponent,
    NzCheckboxComponent,
    NzContentComponent,
    NzLayoutComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    PopupComponent,
    EditModalComponent,
    NgIf,
    NzTimePickerComponent,
    FormsModule,
    NgForOf,
    NzOptionComponent,
    SafeHtmlPipe,
    AddAdresseComponent,
    AddAddressModalComponent,
    AddContactModalComponent,
    CommandeApercuModalComponent,
    EditImpressionModalComponent,
    CustomNumberPipe
],
  templateUrl: './edit-commande.component.html',
  styleUrls: ['./edit-commande.component.css']
})
export class EditCommandeComponent implements OnInit {
  commandeId: number | null = null;
  commande: any = {};
  client: any = {}; 

  showResult: boolean = false; 
  resultStatus: 'success' | 'error' = 'success'; 
  resultTitle: string = ''; 
  resultMessage: string = ''; 

  selectedAdresse: any = {};
  cde_Adresse: string = ''; // Pour afficher l'adresse sélectionnée par défaut
  selectedAdresseId: number | null = null;
  selectedContact: any = {};
  selectedContactId: number | null = null;
  reference: string = '';
  cde_Livraisonobservations:string = '';
  cde_Contactobservations :string = '';
  
  livraisonDate: Date | null = new Date();
  livraisonTimeStart: Date | null = new Date();
  livraisonTimeEnd: Date | null = new Date();
  repriseTimeStart: Date | null = new Date();
  repriseTimeEnd: Date | null = new Date();
  isLivraisonImperative: boolean = false;
  isRepriseAuLabo: boolean = false;
  commandeArticles: any[] = [];

  adresses: any[] = [];
  contacts: any[] = [];



  datelivraison: Date | null = new Date();
  heurelivraisondebut: Date | null = null;
  heurelivraisonfin: Date | null = null;


  Cde_Dateretour :Date | null = null;
  Cde_Heureretourfin:Date | null = null;
  Cde_Heureretourdebut:Date | null = null;


  isModalVisible = false;
  isModalVisibleContact = false;
  isApercuModalVisible = false;
  showCommande = false;
  Cde_Adresse: string = ''; 

  commandeArticlesSubject = new BehaviorSubject<any[]>([]);
  commandeArticles$ = this.commandeArticlesSubject.asObservable();

  Cde_Imperatif: boolean = false;
  Cde_Repriselabo: boolean = false;

  cda_PrixTotalRemiseHT:number = 0;

  @Output() totalUpdated = new EventEmitter<number>(); 
  Cde_Totaltva: number = 0;
  Cde_Totalttc: number = 0;
  Cde_Totalht: number = 0;



  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandeService: CommandeService,
    private adresseService: AdresseService,
    private contactService: ContactService
  ) {}


  ngOnInit(): void {

    
  
    this.commandeService.commandeArticles$.subscribe(articles => {
      this.commandeArticles = articles;
      this.commandeArticles.forEach(article => {
        console.log('Dans EditCardCommandeComponent après abonnement:', article.cda_PrixTotalRemiseHT);
      });
    });
    
    this.commandeService.totalHT$.subscribe(total => {
      this.Cde_Totalht = total;
    });

  /*   this.commandeService.totalHT$.subscribe(total => {
      this.Cde_Totalht = total;
      
    }); */

    const clientId = Number(localStorage.getItem('scl_Cli_Id'));
    if (clientId) {
      this.loadClientData(clientId);
    } else {
      console.warn("Aucun ID client trouvé dans le localStorage.");
    }
    
    this.heurelivraisondebut = new Date();
    this.heurelivraisondebut.setHours(9, 0);  
    
    this.heurelivraisonfin = new Date();
    this.heurelivraisonfin.setHours(12, 0);  


    this.Cde_Heureretourdebut =new Date();
    this.Cde_Heureretourdebut.setHours(9, 0);


    this.Cde_Heureretourfin = new Date();
    this.Cde_Heureretourfin.setHours(12, 0);

    
    this.route.params.subscribe(params => {
      this.commandeId = +params['id'];
      console.log("id",this.commandeId);
      
      this.commandeService.getCommandeByIdPortal(this.commandeId).subscribe(
        (response) => {
        
      
          this.Cde_Repriselabo = response.cde_Repriselabo || false;
          this.Cde_Imperatif = response.cde_Imperatif || false;

          this.commande = response;
          this.commandeArticles = response.articles || []; 


          this.commandeArticles.forEach(article => {
            console.log('Avant setCommandeArticles:', article.cda_PrixTotalRemiseHT);
          });
          this.commandeService.setCommandeArticles(this.commandeArticles);
          
          
          
          this.Cde_Totalht= response.cde_Totalht;
       

          console.log(this.Cde_Totalht);
 
          function formatLocalDate(date: Date): Date {
            const localDate = new Date(date);
            localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset()); 
            return localDate;
          }
          
          // Application de la fonction lors de la récupération de la date
          this.datelivraison = response.cde_Datelivraison ? formatLocalDate(new Date(response.cde_Datelivraison)) : null;
          
          this.Cde_Dateretour = response.cde_Dateretour ? formatLocalDate (new Date(response.cde_Dateretour)) : null;



          this.cde_Adresse = response.cde_Adresse || '';
          this.selectedAdresseId = response.cde_Adr_Id;
          
          if (this.selectedAdresseId) {
            this.loadSelectedAdresse(this.selectedAdresseId);
          }     
          if (response.articles && Array.isArray(response.articles)) {
            this.commandeService.setCommandeArticles(response.articles);
          } else {
            console.warn("Aucun article trouvé dans la réponse");
          }
      
          this.selectedContactId = response.cde_Cot_Id ?? response.Contact?.cot_Id ?? 0;
          if (this.selectedContactId) {
            this.loadSelectedContact(this.selectedContactId);
          } 

          
    
          this.reference = response.cde_Reference || '';
          this.datelivraison = response.cde_Datelivraison ? formatLocalDate(new Date(response.cde_Datelivraison)) : null;
          console.log('livraison', this.datelivraison); //bon//
          console.log('reprise', this.Cde_Dateretour)
          
          this.Cde_Dateretour = response.cde_Dateretour ? formatLocalDate (new Date(response.cde_Dateretour)) : null;


          this.cde_Livraisonobservations= response.cde_Livraisonobservations;
          this.cde_Contactobservations = response.cde_Contactobservations;
          this.livraisonDate = new Date(response.datelivraison);
          this.livraisonTimeStart = new Date(response.heurelivraisondebut);
          this.livraisonTimeEnd = new Date(response.heurelivraisonfin);
/*          this.repriseDate = new Date(response.Cde_Dateretour);
*/         this.repriseTimeStart = new Date(response.Cde_Heureretourdebut);
          this.repriseTimeEnd = new Date(response.Cde_Heureretourfin);
          this.isLivraisonImperative = response.IsLivraisonImperative || false;
          this.isRepriseAuLabo = response.IsRepriseAuLabo || false;
         
          
        },
        (error) => {
          console.error('Erreur lors du chargement de la commande:', error);
        }
      );

      this.loadAdresses();
      this.loadContacts();
    });
  }

/* 
  onQuantityChanged(event: any) {
    const { article, newQuantity } = event;
    const articleIndex = this.commandeArticles.findIndex(a => a === article);
    if (articleIndex !== -1) {
      this.commandeArticles[articleIndex].cda_Quantite = newQuantity;
    }
  }


    onArticleDeleted(article: any) {
    this.commandeArticles = this.commandeArticles.filter(a => a !== article);
    this.commandeService.setCommandeArticles(this.commandeArticles);
  }

  onArticleAdded(article: any) {
    this.commandeArticles.push(article);
    this.commandeService.setCommandeArticles(this.commandeArticles);
  }
 */
  onQuantityChange(articleId: number, newQuantity: number) {
    this.commandeService.updateArticleQuantityAndRecalculate(articleId, newQuantity);
  }
  

  onArticleDeleted(article: any) {
    this.commandeService.deleteCommandeArticle(article);
  }

  onArticleAdded(article: any) {
    console.log("Ajout de l'article:", article);
    this.commandeService.addCommandeArticle(article);
  }
  
  onTotalValuesUpdated(event: { totalHT: number, montantTVA: number, montantTTC: number }) {
    this.Cde_Totalht = event.totalHT;
    this.Cde_Totaltva = event.montantTVA;
    this.Cde_Totalttc = event.montantTTC;
  }


  // Méthode de validation des heures de livraison
validateLivraisonHours(): void {
  if (this.heurelivraisondebut && this.heurelivraisonfin && this.heurelivraisondebut > this.heurelivraisonfin) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur d\'horaire',
      text: 'L\'heure de début de livraison ne peut pas être supérieure à l\'heure de fin de livraison.',
    });
    this.heurelivraisondebut = null; // Réinitialiser l'heure si elle est incorrecte
  }
}

validateRetourHours(): void {
  if (this.Cde_Heureretourdebut && this.Cde_Heureretourfin && this.Cde_Heureretourdebut > this.Cde_Heureretourfin) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur d\'horaire',
      text: 'L\'heure de début de retour ne peut pas être supérieure à l\'heure de fin de retour.',
    });
    this.Cde_Heureretourdebut = null; // Réinitialiser l'heure si elle est incorrecte
  }
}




validateDates(): boolean {
  if (this.datelivraison && this.Cde_Dateretour && this.datelivraison >= this.Cde_Dateretour) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur de date',
      text: 'La date de livraison ne peut pas être supérieure à la date de reprise.',
    });
    return false;
  }
  return true;
}

onDeliveryDateChange(newDate: Date | null): void {
  this.datelivraison = newDate;
  this.validateDates();
}

onReturnDateChange(newDate: Date | null): void {
  this.Cde_Dateretour = newDate;
  this.validateDates();
}
  
  loadSelectedContact(contactId: number): void {
    this.contactService.getContactById(contactId).subscribe(
      (contact) => {
        this.selectedContact = contact;
        this.commande.Contact = {
          Cot_Fax: contact.Cot_Fax || '',
          Cot_Nom: contact.Cot_Nom || '',
          Cot_Email: contact.Cot_Email || '',
          Cot_Prenom: contact.Cot_Prenom || '',
          Cot_Civilite: contact.Cot_Civilite || '',
          Cot_Portable: contact.Cot_Portable || '',
          Cot_Telephone: contact.Cot_Telephone || '',
          Cot_Observations: contact.Cot_Observations || '',
          Cot_Tableorigine: contact.Cot_Tableorigine || 'client'
        };
      },
      (error) => {
        console.error('Erreur lors du chargement du contact sélectionné:', error);
      }
    );
  }

  
  loadSelectedAdresse(adresseId: number): void {
    this.adresseService.getAdresseById(adresseId).subscribe(
      (adresse) => {
        this.selectedAdresse = adresse; 
        this.commande.AdresseLivraison = {
          Adr_Fax: adresse.Adr_Fax || '',
          Adr_Email: adresse.Adr_Email || '',
          Adr_Ville: adresse.Adr_Ville || '',
          Adr_Adresse: adresse.Adr_Adresse || '',
          Adr_Telephone: adresse.Adr_Telephone || '',
          Adr_Codepostal: adresse.Adr_Codepostal || '',
          Adr_Nomsociete: adresse.Adr_Nomsociete || '',
          Adr_Observations: adresse.Adr_Observations || '',
          Adr_Tableorigine: adresse.Adr_Tableorigine || ''
        };
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'adresse sélectionnée:', error);
      }
    );
  }



  

  loadCommande(): void {
    if (this.commandeId) {
      this.commandeService.getCommandeByIdPortal(this.commandeId).subscribe(
        (data) => {
          this.commande = data;
          this.commandeArticles = data.CommandeArticles || [];

          if (data.articles) {
            this.commandeService.setCommandeArticles(data.articles);
          }
          this.selectedAdresse = data.AdresseLivraison || {};
          this.selectedContact = data.Contact || {};
          this.reference = data.Cde_Reference;

          this.livraisonDate = this.isValidDate(data.datelivraison) ? new Date(data.datelivraison) : null;
          console.log('jkhdkjhdkjh',this.livraisonDate);
          
          this.livraisonTimeStart = this.isValidDate(data.heurelivraisondebut) ? new Date(data.heurelivraisondebut) : null;
          this.livraisonTimeEnd = this.isValidDate(data.heurelivraisonfin) ? new Date(data.heurelivraisonfin) : null;
          this.repriseTimeStart = this.isValidDate(data.Cde_Heureretourdebut) ? new Date(data.Cde_Heureretourdebut) : null;
          this.repriseTimeEnd = this.isValidDate(data.Cde_Heureretourfin) ? new Date(data.Cde_Heureretourfin) : null;
          this.commandeArticles = data.CommandeArticles || [];
          this.isLivraisonImperative = data.IsLivraisonImperative;
          this.isRepriseAuLabo = data.IsRepriseAuLabo;
        },
        (error) => {
          console.error('Erreur lors du chargement de la commande:', error);
        }
      );
    }
  }

  isValidDate(dateString: any): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  loadAdresses(): void {
    const fournisseurId = localStorage.getItem('scl_Cli_Id');
    if (fournisseurId) {
      this.adresseService.getAdressesByIdClientFournisseur(parseInt(fournisseurId, 10), 'client').subscribe(
        (data: any[]) => {
          this.adresses = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des adresses:', error);
        }
      );
    }
  }

  loadContacts(): void {
    const clientId = localStorage.getItem('scl_Cli_Id');
    if (clientId) {
      this.contactService.getContactsByClientAndOrigin(parseInt(clientId, 10), 'client').subscribe(
        (data: any[]) => {
          this.contacts = data;
        },
        (error) => {
          console.error('Erreur lors du chargement des contacts:', error);
        }
      );
    }
  }

  loadClientData(clientId: number) {
    this.adresseService.getClientById(clientId).subscribe(
      (data: any) => {
        this.client = data;
        localStorage.setItem('clientData', JSON.stringify(data)); // Stocke les données du client dans localStorage
        console.log('Données du client chargées avec succès:', this.client);
      },
      (error) => {
        console.error('Erreur lors du chargement des données client : ', error);
      }
    );
  }
  

  onSelectAdresse(adresseId: number) {
    const adressesData = localStorage.getItem('adressesData');
    if (adressesData) {
      const adresses = JSON.parse(adressesData);
      this.selectedAdresse = adresses.find((adresse: any) => adresse.adr_Id === adresseId);

      if (this.selectedAdresse) {
        this.Cde_Adresse = this.selectedAdresse.adr_Adresse || ''; // Assigne adr_Adresse ou une chaîne vide si adr_Adresse est null
      }
    }
  }

  onSelectContact(contactId: number): void {
    this.selectedContact = this.contacts.find((contact) => contact.cot_Id === contactId) || {};
  }

  showModal(): void {
    this.isModalVisible = true;
  }

  showModalContact(): void {
    this.isModalVisibleContact = true;
  }

  onAddressAdded(): void {
    this.loadAdresses();
  }

  onContactAdded(): void {
    this.loadContacts();
  }



  updateLocalStorage(): void {
    const commandeData = {
      selectedAdresse: this.selectedAdresse,
      selectedContact: this.selectedContact,
      reference: this.reference,
      livraisonDate: this.datelivraison,
      livraisonTimeStart: this.heurelivraisondebut,
      livraisonTimeEnd: this.heurelivraisonfin,
      repriseDate: this.Cde_Dateretour,
      repriseTimeStart: this.Cde_Heureretourdebut,
      repriseTimeEnd: this.Cde_Heureretourfin,
      isLivraisonImperative: this.Cde_Imperatif,
      isRepriseAuLabo: this.Cde_Repriselabo,
      commandeArticles: this.commandeArticles,
    };
    localStorage.setItem('commandeData', JSON.stringify(commandeData));
    
  }
  

  calculateTotal(): number {
    const total = this.commandeArticles.reduce((total, article) => {
      return total + (article.cda_PrixTotalRemiseHT || 0);
    }, 0);
    this.Cde_Totalht = total; 
    this.totalUpdated.emit(this.Cde_Totalht); 
    return total;
}

  submitCommande(): void {
    if (this.commandeId) {
        const commandeData = JSON.parse(localStorage.getItem('commandeData') || '{}');

        const clientData = JSON.parse(localStorage.getItem('clientData') || '{}');

        const modePaiement = clientData.modePaiement || {
            mpa_Code: 'Code par défaut',
            mpa_Libelle: 'Libellé par défaut',
            mpa_Type: 'Type par défaut',
        };

        const representant = clientData.representant || {
            rep_Code: 'Code par défaut',
            rep_Nom: 'Nom par défaut',
            rep_Prenom: 'Prénom par défaut',
            rep_Civilite: 'Civilité par défaut',
            rep_Telephone: 'Téléphone par défaut',
            rep_Fonction: 'Fonction par défaut'
        };

        const contact = {
            Cot_Fax: this.selectedContact.Cot_Fax || '',
            Cot_Nom: this.selectedContact.Cot_Nom || 'Nom par défaut',
            Cot_Email: this.selectedContact.Cot_Email || 'email@example.com',
            Cot_Prenom: this.selectedContact.Cot_Prenom || 'Prénom par défaut',
            Cot_Civilite: this.selectedContact.Cot_Civilite || 'Mr.',
            Cot_Portable: this.selectedContact.Cot_Portable || '0000000000',
            Cot_Telephone: this.selectedContact.Cot_Telephone || '0000000000',
            Cot_Observations: this.selectedContact.Cot_Observations || 'Aucune observation',
            Cot_Tableorigine: 'client'
        };

        const commandeRequest = {
            Commande: {
                Cde_Id: this.commandeId,
                Cde_User: 'PORTAIL',
                Cde_Reference: this.reference || '',
                Cde_Originedevis: 'DefaultDevis',
                Cde_Raisonsociale: this.client.cli_Societe,
                Cde_Contactobservations: contact.Cot_Observations,
                Cde_Livraisonobservations: 'Observation de livraison par défaut',
                Cde_Cli_Id: clientData.cli_Id,
                cde_Cot_Id: this.selectedContact.cot_Id,  // Lier à l'ID de contact sélectionné
                cde_adr_Id: this.selectedAdresse.adr_Id,  // Lier à l'adresse sélectionnée
                Cde_Numcommande: 888888,

                Cde_Datelivraison:this.datelivraison ,
                Cde_Heurelivraisonfin: this.heurelivraisonfin,
                Cde_Dateretour: this.Cde_Dateretour,
                Cde_Heureretourfin:this.Cde_Heureretourfin,
                cde_Contactobservations :this.cde_Contactobservations,
                cde_Livraisonobservations :this.cde_Livraisonobservations,
                Cde_Preparateur: 'dddd',
                Cde_Heurecreation: new Date(),
                Cde_Heurelivraisondebut:this.heurelivraisondebut,
                Cde_Heureretourdebut: this.Cde_Heureretourdebut,
                LivraisonTimeStart: this.heurelivraisondebut,
                LivraisonTimeEnd: this.heurelivraisonfin,
                RepriseTimeStart: this.Cde_Heureretourdebut,
                RepriseTimeEnd: this.Cde_Heureretourfin,
                Cde_Imperatif: this.Cde_Imperatif,
                Cde_Repriselabo: this.Cde_Repriselabo,
                Cde_Mpa_Id: this.client.modePaiement.mpa_Id,
                Cde_Rep_Id: this.client.representant.rep_Id,
                Cde_Totalht: this.Cde_Totalht,
                Cde_Totaltva: this.Cde_Totaltva,
                Cde_Totalttc: this.Cde_Totalttc,


                Client: clientData,

                Contact: contact,

                ModePaiement: {
                    mpa_Code: modePaiement.mpa_Code || 'Code par défaut',
                    mpa_Libelle: modePaiement.mpa_Libelle || 'Libellé par défaut',
                    mpa_Type: modePaiement.mpa_Type || 'Type par défaut'
                },

                Representant: {
                    rep_Code: representant.rep_Code || 'Code par défaut',
                    rep_Nom: representant.rep_Nom || 'Nom par défaut',
                    rep_Prenom: representant.rep_Prenom || 'Prénom par défaut',
                    rep_Civilite: representant.rep_Civilite || 'Civilité par défaut',
                    rep_Telephone: representant.rep_Telephone || 'Téléphone par défaut',
                    rep_Fonction: representant.rep_Fonction || 'Fonction par défaut'
                },

                AdresseLivraison: this.selectedAdresse,

                Cde_Adresse: this.Cde_Adresse,
                Cde_Datecreation: new Date(),
              
              
                Cde_Valide: false,

            },
      CommandeArticles: this.commandeArticles
        };

        this.commandeService.updateCommandePortal(this.commandeId, commandeRequest).subscribe(
            (response) => {
                Swal.fire('Succès', 'Commande mise à jour avec succès', 'success');
                this.router.navigate(['/etatCommande']);
            },
            (error) => {
                Swal.fire('Erreur', `Erreur lors de la mise à jour de la commande: ${error.message}`, 'error');
            }
        );
    }
}






  openApercuModal(): void {
    this.isApercuModalVisible = true;
  }

  toggleCommande(): void {
    this.showCommande = !this.showCommande;
  }
}
