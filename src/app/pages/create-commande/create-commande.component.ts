import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzSpaceComponent, NzSpaceItemDirective } from "ng-zorro-antd/space";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { NzInputDirective, NzInputGroupComponent } from "ng-zorro-antd/input";
import { CardCommandeComponent } from "../card-commande/card-commande.component";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { NzCheckboxComponent } from "ng-zorro-antd/checkbox";
import { NzContentComponent, NzLayoutComponent } from "ng-zorro-antd/layout";
import { NzModalComponent, NzModalContentDirective } from "ng-zorro-antd/modal";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { PopupComponent } from "../popup/popup.component";
import { ModalCommandeComponent } from "../modal-commande/modal-commande.component";
import { NgForOf, NgIf } from "@angular/common";
import { NzTimePickerComponent } from "ng-zorro-antd/time-picker";
import { FormsModule } from "@angular/forms";
import { AdresseService } from "../../services/adresse.service";
import { SafeHtmlPipe } from "../../pipe/safe-html.pipe";
import { ContactService } from "../../services/contact-service.service";
import { AddAdresseComponent } from "../add-adresse/add-adresse.component";
import { AddAddressModalComponent } from "../add-address-modal/add-address-modal.component";
import { AddContactModalComponent } from "../add-contact-modal/add-contact-modal.component";
import { CommandeService } from '../../services/commande.service'; // Import the CommandeService
import Swal from 'sweetalert2';
import { CommandeApercuModalComponent } from "../commande-apercu-modal/commande-apercu-modal.component";
import { CommonModule } from '@angular/common';  // Importer CommonModule
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ImpressionModelComponent } from "../impression-model/impression-model.component";
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ViewChild, ElementRef } from '@angular/core';
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';



@Component({
  selector: 'app-create-commande',
  templateUrl: './create-commande.component.html',
  styleUrls: ['./create-commande.component.css'],
  standalone: true,
  imports: [
    CustomNumberPipe,
    NzTimePickerModule,
    CommonModule,
    NzSpaceComponent,
    NzSelectComponent,
    NzSpaceItemDirective,
    NzInputDirective,
    NzInputGroupComponent,
    CardCommandeComponent,
    NzDatePickerComponent,
    NzCheckboxComponent,
    NzContentComponent,
    NzLayoutComponent,
    NzModalComponent,
    NzModalContentDirective,
    NzButtonComponent,
    PopupComponent,
    ModalCommandeComponent,
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
    ImpressionModelComponent,
    NzSpinModule
]
})
export class CreateCommandeComponent implements OnInit {
  @Output() totalUpdated = new EventEmitter<number>(); 
  Cde_Totaltva: number = 0;
  Cde_Totalttc: number = 0;


  isApercuModalVisible:boolean =false;
  showCommande: boolean = false;
  adresses: any[] = [];
  fournisseurId: number | null = null;
  contacts: any[] = [];
  time = new Date();
  showAddAdresse = false; 
  showAddContact = false; 
  isModalVisible = false;
  isModalVisibleContact = false;

  selectedAdresse: any = {};
  selectedAdresseId: number | null = null; 

  selectedContact: any = {};
  selectedContactId: number | null = null; 
  reference: string = '';
  datelivraison: Date | null = null;
  heurelivraisondebut: Date | null = null;
  heurelivraisonfin: Date | null = null;


  Cde_Dateretour :Date | null = null;
  Cde_Heureretourfin:Date | null = null;
  Cde_Heureretourdebut:Date | null = null;



  repriseDate: Date | null = null;
  repriseTimeStart: Date | null = null;
  repriseTimeEnd: Date | null = null;
  Cde_Imperatif: boolean = false;
  Cde_Repriselabo: boolean = false;

  commandeArticles: any[] = [];
  client: any = {}; 
  
  showResult: boolean = false; 
  resultStatus: 'success' | 'error' = 'success'; 
  resultTitle: string = ''; 
  resultMessage: string = ''; 
  Cde_Adresse: string = '';  

  cde_Livraisonobservations:string = '';
  cde_Contactobservations :string = '';
  Cde_Totalht: number = 0;

  loadingCommandeCreation: boolean = false;

  @ViewChild('addArticle') addArticleElement!: ElementRef;



  constructor(
    private adresseService: AdresseService,
    private contactService: ContactService,
    private commandeService: CommandeService 
  ) {}

  ngOnInit() {

    this.heurelivraisondebut = new Date();
    this.heurelivraisondebut.setHours(9, 0, 0, 0);
    
    

    this.heurelivraisonfin = new Date();
    this.heurelivraisonfin.setHours(12, 0, 0, 0);  

    this.Cde_Heureretourdebut = new Date();
    this.Cde_Heureretourdebut.setHours(9, 0, 0, 0);

    this.Cde_Heureretourfin = new Date();
    this.Cde_Heureretourfin.setHours(12, 0, 0, 0);    

    

 

    this.loadAdresses();

    const scl_Cli_Id = localStorage.getItem('scl_Cli_Id');
    if (scl_Cli_Id) {
      const id = parseInt(scl_Cli_Id, 10);
      this.getContactsByClientAndOrigin(id, 'client');
      this.loadClientData(id); 
    } else {
      console.error('ID de contact non trouvé dans le localStorage');
    }





    const savedCommandeData = localStorage.getItem('commandeData');
    if (savedCommandeData) {
      const parsedData = JSON.parse(savedCommandeData);
      this.commandeArticles = parsedData.commandeArticles || [];
      
    }
    const savedArticles = localStorage.getItem('commandeArticles');
  if (savedArticles) {
    this.commandeArticles = JSON.parse(savedArticles);
  }
  
  }
  private formatLocalDate(date: Date): Date {
    return new Date(date);
  }
  

  openApercuModal():void{
    this.isApercuModalVisible = true;
  }

  closeApercuModal(): void {
    this.isApercuModalVisible = false;
  }

 loadAdresses() {
    const fournisseurIdFromLocalStorage = localStorage.getItem('scl_Cli_Id');
    if (fournisseurIdFromLocalStorage) {
      this.fournisseurId = parseInt(fournisseurIdFromLocalStorage, 10);
    } 
    if (this.fournisseurId) {
      const origine = 'client';
      this.adresseService.getAdressesByIdClientFournisseur(this.fournisseurId, origine)
        .subscribe(
          (data: any[]) => {
            this.adresses = data;
            localStorage.setItem('adressesData', JSON.stringify(data));
            this.adresseService.setAdress(this.adresses);
          },
          (error) => {
            console.error('Une erreur s\'est produite lors du chargement des adresses : ', error);
          }
        );
    } else {
      console.error('L\'ID du fournisseur n\'a pas été trouvé dans le localStorage.');
    }
  }

  onAddressAdded() {
    this.loadAdresses(); 
  }

  onContactAdded() {   
    const scl_Cli_Id = localStorage.getItem('scl_Cli_Id');
    if (scl_Cli_Id) {
      const id = parseInt(scl_Cli_Id, 10);
      this.getContactsByClientAndOrigin(id, 'client');
      this.loadClientData(id); 
    }else{
      console.error('ID de contact non trouvé dans le localStorage');
    }
  }
  
  getContactsByClientAndOrigin(id: number, origine: string): void {
    this.contactService.getContactsByClientAndOrigin(id, origine).subscribe(
      (data: any[]) => {
        this.contacts = data;
        localStorage.setItem('contactsData', JSON.stringify(data));
      },
      (error) => {
        console.error(error);
      }
    );
  }


  

  loadClientData(clientId: number) {
    this.adresseService.getClientById(clientId).subscribe(
      (data: any) => {
        this.client = data;
        localStorage.setItem('clientData', JSON.stringify(data)); 
      },
      (error) => {
        console.error('Erreur lors du chargement des données client : ', error);
      }
    );
  }

  triggerAddAdresse() {
    this.showAddAdresse = true;
  }

  triggerAddContact() {
    this.showAddContact = true;
  }

  onSelectContact(contactId: number) {
    const contactsData = localStorage.getItem('contactsData');
    if (contactsData) {
      const contacts = JSON.parse(contactsData);
      this.selectedContact = contacts.find((contact: any) => contact.cot_Id === contactId);
    }
  }

  onSelectAdresse(adresseId: number) {
    const adressesData = localStorage.getItem('adressesData');
    if (adressesData) {
      const adresses = JSON.parse(adressesData);
      this.selectedAdresse = adresses.find((adresse: any) => adresse.adr_Id === adresseId);
      // console.log("Voici l'adresse selectionné et son id : ",this.selectedAdresse,"\n id : "+adresseId);
      
      if (this.selectedAdresse) {
        this.Cde_Adresse = this.selectedAdresse.adr_Adresse || ''; 
      }
    }
  }

  toggleCommande() {
    this.showCommande = !this.showCommande;
    if (this.showCommande) {
      const commandeData = {
        selectedAdresse: this.selectedAdresse,
        selectedContact: this.selectedContact,
        reference: this.reference,
        livraisonDate: this.datelivraison,
        heurelivraisondebut: this.heurelivraisondebut,
        heurelivraisonfin: this.heurelivraisonfin,
        repriseDate: this.Cde_Dateretour,
        Cde_Heureretourdebut: this.Cde_Heureretourdebut?.toISOString(),
        Cde_Heureretourfin: this.Cde_Heureretourfin?.toISOString(),
        isLivraisonImperative: this.Cde_Imperatif,
        isRepriseAuLabo: this.Cde_Repriselabo,
        cde_Livraisonobservations : this.cde_Livraisonobservations,
        cde_Contactobservations : this.cde_Contactobservations,
        commandeArticles: this.commandeArticles
        
      };
      localStorage.setItem('commandeData', JSON.stringify(commandeData));
    }
    
    setTimeout(() => {
      if (this.showCommande && this.addArticleElement) {
        this.addArticleElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);

  }

  showModal(): void {
    this.isModalVisible = true;
  }

  showModalContact(): void {
    this.isModalVisibleContact = true;
  }

/*   addArticleToCommande(article: any): void {
    this.commandeArticles.push(article);
    this.updateLocalStorage();
  } */

  calculateTotal(): number {
    const total = this.commandeArticles.reduce((total, article) => {
      return total + (article.cda_PrixTotalRemiseHT || 0);
    }, 0);
    this.Cde_Totalht = total;
    this.totalUpdated.emit(this.Cde_Totalht);
    return total;
}

  

  addArticleToCommande(article: any): void {
    this.commandeArticles.push(article);
    this.updateLocalStorage();
    this.calculateTotal(); 
  }
  

  updateLocalStorage() {
    const commandeData = {
      selectedAdresse: this.selectedAdresse,
      selectedContact: this.selectedContact,
      reference: this.reference,
      livraisonDate: this.datelivraison,
      heurelivraisondebut: this.heurelivraisondebut,
      heurelivraisonfin: this.heurelivraisonfin,
      repriseDate: this.Cde_Dateretour,
      Cde_Heureretourdebut: this.Cde_Heureretourdebut?.toISOString(),
      Cde_Heureretourfin: this.Cde_Heureretourfin?.toISOString(),
      isLivraisonImperative: this.Cde_Imperatif,
      isRepriseAuLabo: this.Cde_Repriselabo,
      cde_Livraisonobservations : this.cde_Livraisonobservations,
      cde_Contactobservations:this.cde_Contactobservations,
      commandeArticles: this.commandeArticles
    };
    localStorage.setItem('commandeData', JSON.stringify(commandeData));
  }
// Méthode de validation des heures de livraison
validateLivraisonHours(): void {
  if (this.heurelivraisondebut && this.heurelivraisonfin && this.heurelivraisondebut >= this.heurelivraisonfin) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur d\'horaire',
      text: 'L\'heure de début de livraison ne peut pas être supérieure ou égal à l\'heure de fin de livraison.',
    });
    this.heurelivraisondebut = null; 
  }
}

validateRetourHours(): void {
  if (this.Cde_Heureretourdebut && this.Cde_Heureretourfin && this.Cde_Heureretourdebut >= this.Cde_Heureretourfin) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur d\'horaire',
      text: 'L\'heure de début de retour ne peut pas être supérieure ou égal à l\'heure de fin de retour.',
    });
    this.Cde_Heureretourdebut = null; 
  }
}

    onTotalValuesUpdated(event: { totalHT: number, montantTVA: number, montantTTC: number }) {
    this.Cde_Totalht = event.totalHT;
    this.Cde_Totaltva = event.montantTVA;
    this.Cde_Totalttc = event.montantTTC;
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
  
  submitCommande(): void {

    const scl_Cli_Id = localStorage.getItem('scl_Cli_Id');
    if (!scl_Cli_Id) {
      console.error('ID de client non trouvé dans le localStorage');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Client non trouvé ',
      });
      return;
    }

    
    const cli_Id = parseInt(scl_Cli_Id, 10);
    const adressesData = localStorage.getItem('adressesData');
    const adresses = adressesData ? JSON.parse(adressesData) : null;
    
    if (!adresses) {
      console.error('Les données des adresses sont requises.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les données des adresses sont requises.',
      });
      return;
    }
    if (!this.validateDates()) {
      return; // Arrête l'exécution si les dates sont invalides
    }

    const selectedAdresse = this.selectedAdresse || {};
    const adresseMatch = adresses.find((adresse: any) => adresse.adr_Id === selectedAdresse.adr_Id);
  
    if (!adresseMatch) {
      console.error('L\'adresse sélectionnée n\'a pas été trouvée dans les données des adresses.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'L\'adresse sélectionnée n\'a pas été trouvée.',
      });
      return;
    }



  
    const clientData = localStorage.getItem('clientData');
    const client = clientData ? JSON.parse(clientData) : null;
    
    if (!client) {
      console.error('Les données du client sont requises.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les données du client sont requises.',
      });
      return;
    }

    

    
    
    const contactsData = localStorage.getItem('contactsData');
    const contacts = contactsData ? JSON.parse(contactsData) : null;
    
    if (!contacts) {
      console.error('Les données des contacts sont requises.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les données des contacts sont requises.',
      });
      return;
    } 
    

    const selectedContact = this.selectedContact || {};


    const contactMatch = contacts.find((contact: any) => contact.cot_Id === selectedContact.cot_Id);

    if (!contactMatch) {
      console.error('Le contact sélectionné n\'a pas été trouvé dans les données des contacts.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le contact sélectionné n\'a pas été trouvé.',
      });
      return;
    }


    this.loadingCommandeCreation = true; 


    const commandeRequest = {
      Commande: {

        
        Cde_User: 'PORTAIL',
        Cde_Reference: this.reference || '',
        Cde_Originedevis: 'DefaultDevis',
        Cde_Raisonsociale: this.client.cli_Societe,
        Cde_Contactobservations: this.selectedContact.Cot_Observations || 'DefaultContactObservations',
        Cde_Livraisonobservations: 'DefaultLivraisonObservations',
        Cde_Cli_Id: cli_Id,
        cde_Cot_Id: contactMatch.cot_Id,
        cde_adr_Id: adresseMatch.adr_Id,
        Cde_Numcommande: 888888 ,
        Client: client,
        AdresseLivraison: this.selectedAdresse,
        Contact: this.selectedContact,
        LivraisonDate: this.datelivraison?.toISOString(),
        LivraisonTimeStart: this.heurelivraisondebut,
        LivraisonTimeEnd: this.heurelivraisonfin,
        RepriseDate: this.Cde_Dateretour?.toISOString(),
        RepriseTimeStart: this.Cde_Heureretourdebut,
        RepriseTimeEnd: this.Cde_Heureretourfin,
        Cde_Imperatif: this.Cde_Imperatif,
        Cde_Repriselabo: this.Cde_Repriselabo,
        Cde_Adresse: '',
        cde_Livraisonobservations:this.cde_Livraisonobservations,
        cde_Contactobservations :this.cde_Contactobservations,
        Cde_Datecreation: new Date(),
        Cde_Datelivraison:this.datelivraison ,
        Cde_Heurelivraisonfin: this.heurelivraisonfin,
        Cde_Dateretour: this.Cde_Dateretour,
        Cde_Heureretourfin:this.Cde_Heureretourfin,
        Cde_Totalht: this.Cde_Totalht,
        Cde_Totaltva: this.Cde_Totaltva,
        Cde_Totalttc: this.Cde_Totalttc,
        Cde_Preparateur: 'dddd',
        Cde_Heurecreation: new Date(),
        Cde_Heurelivraisondebut:this.heurelivraisondebut,
        Cde_Heureretourdebut: this.Cde_Heureretourdebut,
        Cde_Controle: false,
        Cde_Datecontrole: new Date(),
        Cde_Heurecontrole: new Date(),
        Cde_Litige: false,
        Cde_Datereprisestatut: false,
        Cde_Prepare: 0,
        Cde_Livre: false,
        Cde_Repris: false,
        Cde_Valide: false,
        Cde_Numeromodification: 0,
        Cde_Datelastmodif: new Date(),
        Cde_Heurelastmodif: new Date(),
        Cde_Supprimee: false,
        Cde_Transferee: false,
        Cde_Bonenlevement: false,
        Cde_Rotation: false,
        Cde_Soldedu: client.cli_SoldeDu,
        Cde_Escompte: client.cli_Escompte,
        Cde_Suivicommande: '',
        ModePaiement: client.modePaiement,
        Representant: client.representant,
        Cde_Mpa_Id: this.client.modePaiement.mpa_Id,
        Cde_Rep_Id: this.client.representant.rep_Id,
        
        Cde_Souscategorie: '',
        Cde_Categorie: '',
        Cde_Datepreparation: new Date(),
        Cde_Heurepreparation: new Date(),
      },
      CommandeArticles: this.commandeArticles
      


    };
    console.log('Heure de livraison début:', this.heurelivraisondebut);
    console.log('Heure de livraison fin:', this.heurelivraisonfin);
    console.log('Heure de retour début:', this.Cde_Heureretourdebut);
    console.log('Heure de retour fin:', this.Cde_Heureretourfin);
    console.log("La commande request est : ",commandeRequest);
    
    localStorage.setItem('commandeRequest', JSON.stringify(commandeRequest));
    
    this.commandeService.createCommandeLegerPortal(commandeRequest).subscribe(
      (response: any) => {

        console.log('Commande créée avec succès', response);
        localStorage.removeItem('commandeRequest');
        localStorage.removeItem('commandeData');
        localStorage.removeItem('contactsData');
        localStorage.removeItem('adressesData');
        localStorage.removeItem('clientData');
  

        this.loadingCommandeCreation = false; 

        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Commande créée avec succès!',
        }).then(()=>{
          window.location.reload();
        });
      },
      (error: any) => {
        console.error('Erreur lors de la création de la commande', error);
        this.loadingCommandeCreation = false;

        Swal.fire({
          icon: 'error',
          title: 'Erreur',  
          text: 'Erreur lors de la création de la commande',
        });
      }
    );
  }

  
  
}
