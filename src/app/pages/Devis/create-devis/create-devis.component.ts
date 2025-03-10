import { CommonModule, NgIf, NgForOf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzContentComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzSpaceComponent, NzSpaceItemDirective } from 'ng-zorro-antd/space';
import { NzTimePickerModule, NzTimePickerComponent } from 'ng-zorro-antd/time-picker';
import { SafeHtmlPipe } from '../../../pipe/safe-html.pipe';
import { CardCommandeComponent } from '../../card-commande/card-commande.component';
import { ModalCommandeComponent } from '../../modal-commande/modal-commande.component';
import { PopupComponent } from '../../popup/popup.component';
import Swal from 'sweetalert2';
import { AdresseService } from '../../../services/adresse.service';
import { CommandeService } from '../../../services/commande.service';
import { ContactService } from '../../../services/contact-service.service';
import { ModalDevisComponent } from "../modal-devis/modal-devis.component";
import { CardDevisComponent } from "../card-devis/card-devis.component";
import { DevisService } from '../../../services/devis.service';

@Component({
  selector: 'app-create-devis',
  standalone: true,
  imports: [
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
    ModalDevisComponent,
    CardDevisComponent
],
  templateUrl: './create-devis.component.html',
  styleUrl: './create-devis.component.css'
})
export class CreateDevisComponent {
  @Output() totalUpdated = new EventEmitter<number>();

  isApercuModalVisible:boolean =false;
  showDevis: boolean = false;
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
  Dev_Reference: string = '';
  datelivraison: Date | null = null;
  heurelivraisondebut: Date | null = null;
  heurelivraisonfin: Date | null = null;


  Dev_Dateretour :Date | null = null;
  Dev_Heureretourfin:Date | null = null;
  Dev_Heureretourdebut:Date | null = null;

  repriseDate: Date | null = null;
  repriseTimeStart: Date | null = null;
  repriseTimeEnd: Date | null = null;
  isLivraisonImperative: boolean = false;
  isRepriseAuLabo: boolean = false;

  DevisArticle: any[] = [];
  client: any = {}; 
  
  showResult: boolean = false; 
  resultStatus: 'success' | 'error' = 'success'; 
  resultTitle: string = ''; 
  resultMessage: string = ''; 
  Cde_Adresse: string = '';  // Cde_Adresse initialisé comme chaîne vide

  Dev_Livraisonobservations:string = '';
  Dev_Contactobservations :string = '';
  Dev_Totalht: number = 0;

  



  constructor(
    private adresseService: AdresseService,
    private contactService: ContactService,
    private devisService: DevisService 
  ) {}

  ngOnInit() {

    this.heurelivraisondebut = new Date();
    this.heurelivraisondebut.setHours(9, 0);  
    
    this.heurelivraisonfin = new Date();
    this.heurelivraisonfin.setHours(12, 0);  


    this.Dev_Heureretourdebut =new Date();
    this.Dev_Heureretourdebut.setHours(9, 0);


    this.Dev_Heureretourfin = new Date();
    this.Dev_Heureretourfin.setHours(12, 0);



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
      this.DevisArticle = parsedData.devisArticles || [];
      
    }
  }

  openApercuModal():void{
    this.isApercuModalVisible = true;
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

      if (this.selectedAdresse) {
        this.Cde_Adresse = this.selectedAdresse.adr_Adresse || ''; // Assigne adr_Adresse ou une chaîne vide si adr_Adresse est null
      }
    }
  }

  toggleDevis() {
    this.showDevis = !this.showDevis;
    if (this.showDevis) {
      const commandeData = {
        selectedAdresse: this.selectedAdresse,
        selectedContact: this.selectedContact,
        Dev_Reference: this.Dev_Reference,
        livraisonDate: this.datelivraison?.toISOString(),
        livraisonTimeStart: this.heurelivraisondebut,
        livraisonTimeEnd: this.heurelivraisonfin,
        repriseDate: this.Dev_Dateretour?.toISOString(),
        repriseTimeStart: this.Dev_Heureretourdebut,
        repriseTimeEnd: this.heurelivraisonfin,
        isLivraisonImperative: this.isLivraisonImperative,
        isRepriseAuLabo: this.isRepriseAuLabo,
        devisArticles: this.DevisArticle
      };
      localStorage.setItem('commandeData', JSON.stringify(commandeData));
    }
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

  // Ajout de la méthode pour calculer le total
  calculateTotal(): number {
    const total = this.DevisArticle.reduce((total, article) => {
      return total + (article.Dea_PrixTotalRemiseHT || 0);
    }, 0);
    this.Dev_Totalht = total; // Mise à jour de Cde_Totalht
    this.totalUpdated.emit(this.Dev_Totalht); // Emettre l'événement de mise à jour si nécessaire
    return total;
}

  

  // Méthode modifiée pour ajouter l'article et recalculer le total
  addArticleToDevis(article: any): void {
    this.DevisArticle.push(article);
    this.updateLocalStorage();
    this.calculateTotal(); // Recalculer le total après l'ajout de l'article
  }
  

  updateLocalStorage() {
    const commandeData = {
      selectedAdresse: this.selectedAdresse,
      selectedContact: this.selectedContact,
      Dev_Reference: this.Dev_Reference,
      livraisonDate: this.datelivraison?.toISOString(),
      livraisonTimeStart: this.heurelivraisondebut,
      livraisonTimeEnd: this.heurelivraisonfin,
      repriseDate: this.Dev_Dateretour?.toISOString(),
      repriseTimeStart: this.Dev_Heureretourdebut,
      repriseTimeEnd: this.Dev_Heureretourfin,
      isLivraisonImperative: this.isLivraisonImperative,
      isRepriseAuLabo: this.isRepriseAuLabo,
      devisArticles: this.DevisArticle
    };
    localStorage.setItem('commandeData', JSON.stringify(commandeData));
  }

  submitDevis(): void {
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

    // Find the corresponding contact in the contacts list
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




    const commandeRequest = {
     Devis: {
        Dev_User: 'DefaultUser',
        Dev_Reference: this.Dev_Reference || 'DefaultReference',
        Dev_Originedevis: 'DefaultDevis',
        Dev_Raisonsociale: this.selectedAdresse.Adr_Nomsociete || 'DefaultRaisonSociale',
        /* Dev_Contactobservations: this.selectedContact.Cot_Observations || 'DefaultContactObservations',
        Dev_Livraisonobservations: 'DefaultLivraisonObservations', */
        Dev_Cli_Id: cli_Id,
        Dev_Cot_Id: contactMatch.cot_Id,
        Dev_adr_Id: adresseMatch.adr_Id,
        Dev_Numdevis: 888888 ,
        Client: client,
        AdresseLivraison: this.selectedAdresse,
        Contact: this.selectedContact,
        LivraisonDate: this.datelivraison?.toISOString(),
        LivraisonTimeStart: this.heurelivraisondebut,
        LivraisonTimeEnd: this.heurelivraisonfin,
        RepriseDate: this.Dev_Dateretour?.toISOString(),
        RepriseTimeStart: this.Dev_Heureretourdebut,
        RepriseTimeEnd: this.Dev_Heureretourfin,
        IsLivraisonImperative: this.isLivraisonImperative,
        IsRepriseAuLabo: this.isRepriseAuLabo,
        Dev_Adresse: this.Cde_Adresse,
        Dev_Livraisonobservations:this.Dev_Livraisonobservations,
        Dev_Contactobservations :this.Dev_Contactobservations,
        Dev_Datecreation: new Date(),
        Dev_Datelivraison:this.datelivraison ,
        Dev_Heurelivraisonfin: this.heurelivraisonfin,
        Dev_Dateretour: this.Dev_Dateretour,
        Dev_Heureretourfin:this.Dev_Heureretourdebut,
        Dev_Totalht: this.Dev_Totalht,
        Dev_Totaltva: 0,
        Dev_Totalttc: 0,
        Dev_Preparateur: 'dddd',
        Dev_Heurecreation: new Date(),
        Dev_Heurelivraisondebut:this.heurelivraisondebut,
        Dev_Heureretourdebut: this.Dev_Heureretourdebut,
        Cde_Controle: false,
        Dev_Datecontrole: new Date(),
        Dev_Heurecontrole: new Date(),
        Dev_Litige: false,
        Dev_Datereprisestatut: false,
        Dev_Prepare: 0,
        Dev_Livre: false,
        Dev_Repris: false,
        Dev_Valide: false,
        Dev_Numeromodification: 0,
        Dev_Datelastmodif: new Date(),
        Dev_Heurelastmodif: new Date(),
        Dev_Supprimee: false,
        Dev_Transferee: false,
        Dev_Bonenlevement: false,
        Dev_Rotation: false,
        Dev_Soldedu: client.cli_SoldeDu,
        Dev_Escompte: client.cli_Escompte,
        Dev_Suivicommande: '',
        ModePaiement: client.modePaiement,
        Representant: client.representant,
        Dev_Imperatif: false,
        Dev_Repriselabo: false
      },
      devisArticles: this.DevisArticle
    };
    
    localStorage.setItem('commandeRequest', JSON.stringify(commandeRequest));
    
    this.devisService.createDevisLegerPortal(commandeRequest).subscribe(
      (response: any) => {
        console.log('Commande créée avec succès', response);
        localStorage.removeItem('commandeRequest');
        localStorage.removeItem('commandeData');
        localStorage.removeItem('contactsData');
        localStorage.removeItem('adressesData');
        localStorage.removeItem('clientData');
  
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
        
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de la création de la commande',
        });
      }
    );
  }

  
}
