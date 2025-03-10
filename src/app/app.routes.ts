import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {ListFamilyComponent} from "./pages/list-family/list-family.component";
import {ListCollectionComponent} from "./pages/list-collection/list-collection.component";
import {ListColorComponent} from "./pages/list-color/list-color.component";
import {ListDimensionsComponent} from "./pages/list-dimensions/list-dimensions.component";
import {AssociationComponent} from "./pages/association/association.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {SupliersComponent} from "./pages/supliers/supliers.component";
import {AddSupplierComponent} from "./pages/add-supplier/add-supplier.component";
import {EditSupplierComponent} from "./pages/edit-supplier/edit-supplier.component";
import {UserListComponent} from "./pages/user-list/user-list.component";
import {EditUserComponent} from "./pages/edit-user/edit-user.component";
import {AddUserComponent} from "./pages/add-user/add-user.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {CreateSocietyAlertComponent} from "./pages/create-society-alert/create-society-alert.component";
import {AdminCompteComponent} from "./pages/admin-compte/admin-compte.component";
import {AddSousCompteComponent} from "./pages/add-sous-compte/add-sous-compte.component";
import {ListSousCompteComponent} from "./pages/list-sous-compte/list-sous-compte.component";
import {EditSousCompteComponent} from "./pages/edit-sous-compte/edit-sous-compte.component";
import {ParametersComponent} from "./pages/parameters/parameters.component";
import {ParametersCurrentCompteComponent} from "./pages/parameters-current-compte/parameters-current-compte.component";
import {InformationsPageComponent} from "./pages/informations-page/informations-page.component";
import {AdresseLivraisionComponent} from "./pages/adresse-livraision/adresse-livraision.component";
import {ContacterComponent} from "./pages/contacter/contacter.component";
import {AddContactComponent} from "./pages/add-contact/add-contact.component";
import {EditContactComponent} from "./pages/edit-contact/edit-contact.component";
import {AddAdresseComponent} from "./pages/add-adresse/add-adresse.component";
import {EditAdresseComponent} from "./pages/edit-adresse/edit-adresse.component";
import {TableComponent} from "./pages/table/table.component";
import {CommandeComponent} from "./pages/commande/commande.component";
import {CreateCommandeComponent} from "./pages/create-commande/create-commande.component";
import {QuantityComponent} from "./pages/quantity/quantity.component";
import {DeleteCardComponent} from "./pages/delete-card/delete-card.component";
import {CardCommandeComponent} from "./pages/card-commande/card-commande.component";
import {ModalCommandeComponent} from "./pages/modal-commande/modal-commande.component";
import {
  CommandeHistoryListComponent
} from "./pages/commandeHistory/commande-history-list/commande-history-list.component";
import {CommandeStateComponent} from "./pages/commandeHistory/commande-state/commande-state.component";
import {OrderDetailsComponent} from "./pages/commandeHistory/order-details/order-details.component";
import {OrderTrackingComponent} from "./pages/commandeHistory/order-tracking/order-tracking.component";
import {NavbarComponent} from "./pages/Needers/navbar/navbar.component";
import { AddAdressFormComponent } from './pages/add-adress-form/add-adress-form.component';
import { AddAddressModalComponent } from './pages/add-address-modal/add-address-modal.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';
import { AddContactModalComponent } from './pages/add-contact-modal/add-contact-modal.component';
import { InterneUserComponent } from './pages/interne-user/interne-user.component';
import { EditCommandeComponent } from './pages/edit-commande/edit-commande.component';
import { CreateDevisComponent } from './pages/Devis/create-devis/create-devis.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { CommentaireByOrderComponent } from './pages/Commentaire/commentaire-by-order/commentaire-by-order.component';
import { commentsGuard } from './guards/comments.guard';
import { ImpressionModelComponent } from './pages/impression-model/impression-model.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ListCommandeComponent } from './pages/list-commande/list-commande.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component:WelcomeComponent },
  { path: 'list', component:ListFamilyComponent,canActivate: [authGuard]},
  { path: 'listCollection', component: ListCollectionComponent,canActivate: [authGuard]},
  { path: 'ListColor/:collectionId', component: ListColorComponent,canActivate:[authGuard] },
  { path: 'list-dim/:collectionId/:gammeId', component: ListDimensionsComponent ,canActivate:[authGuard]  },
  { path: 'association/:art_id', component:AssociationComponent,canActivate:[authGuard] },
  { path: 'dashboard', component:DashboardComponent,canActivate:[authGuard]  },
  { path: 'supplier', component:SupliersComponent,canActivate:[authGuard]  },
  { path: 'addSupplier', component:  AddSupplierComponent,canActivate:[authGuard]},
  { path: 'Edit/:id', component:  EditSupplierComponent,canActivate:[authGuard]},
  { path: 'userList', component:  UserListComponent,canActivate:[authGuard]},
  { path: 'editUser/:id', component:  EditUserComponent, canActivate:[authGuard]},
  { path: 'addUser', component:  AddUserComponent, canActivate:[authGuard]},
  { path: 'inscription', component:  SignupComponent},
  { path: 'AlertCreateSociety', component:  CreateSocietyAlertComponent,canActivate:[authGuard]},
  { path: 'AdminCompte', component:  AdminCompteComponent},
  { path: 'AddNewEmployee', component:  AddSousCompteComponent},
  { path: 'ListSousCompte', component:  ListSousCompteComponent,canActivate:[authGuard]},
  { path: 'editEmploye/:id', component:  EditSousCompteComponent,canActivate:[authGuard]},
  { path: 'aides', component:  ParametersComponent, canActivate:[authGuard]},
  { path: 'parameters', component:  ParametersCurrentCompteComponent, canActivate:[authGuard]},
  { path: 'informations', component:  InformationsPageComponent, canActivate:[authGuard]},
  { path: 'adresse', component:  AdresseLivraisionComponent, canActivate:[authGuard]},
  { path: 'contact', component:  ContacterComponent, canActivate:[authGuard]},
  { path: 'addContact', component:  AddContactComponent, canActivate:[authGuard]},
  { path: 'editContact/:id', component:  EditContactComponent, canActivate:[authGuard]},
  { path: 'addAdresse', component:  AddAdresseComponent, canActivate:[authGuard]},
  { path: 'editAdresse/:id', component:  EditAdresseComponent, canActivate:[authGuard]},
  { path: 'table', component:  TableComponent, canActivate:[authGuard]},
  { path: 'commande', component:  CommandeComponent, canActivate:[authGuard]},
  { path: 'createCommande', component:  CreateCommandeComponent, canActivate:[authGuard]},
  { path: 'quantite', component:  QuantityComponent, canActivate:[authGuard]},
  { path: 'deleteCard', component:  DeleteCardComponent,canActivate:[authGuard]},
  { path: 'card', component:  CardCommandeComponent, canActivate:[authGuard]},


  { path: 'commandeModal', component:  ModalCommandeComponent, canActivate:[authGuard]},
  { path: 'listHistory', component:  CommandeHistoryListComponent,canActivate:[authGuard]},
  { path: 'etatCommande', component:  CommandeStateComponent, canActivate:[authGuard]},

  { path: 'orderDetails', component:  OrderDetailsComponent,canActivate:[authGuard]},
  { path: 'orderTraking', component:  OrderTrackingComponent, canActivate:[authGuard]},

  { path: 'navbar', component:  NavbarComponent, canActivate:[authGuard]},

  { path: 'addAdress', component:  AddAdressFormComponent, canActivate:[authGuard]},

  { path: 'addAdressModal', component:    AddAddressModalComponent, canActivate:[authGuard]},

  { path: 'ContactForm', component:    ContactFormComponent, canActivate:[authGuard]},

  { path: 'ContactModal', component: AddContactModalComponent, canActivate:[authGuard]},
  
  { path:'loginRfidIn', component: InterneUserComponent},
  { path:'createDevis', component: CreateDevisComponent,canActivate:[authGuard]},


  { path: 'edit-commande/:id', component: EditCommandeComponent ,canActivate:[authGuard]},
    
  { path: 'impression', component:   ImpressionModelComponent ,canActivate:[authGuard]},
  { path: 'listCommande', component:   ListCommandeComponent},

  

  { path: 'comment', component:   CommentaireByOrderComponent,canActivate:[authGuard, commentsGuard]},
  { path: 'not-found', component:   NotFoundComponent},
  { path: 'reset-password', component:  ForgotPasswordComponent},
  { path: 'password-reset/:token', component: PasswordResetComponent },

  { path: '**', redirectTo: '/not-found' } ,




  
  
  


















];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}



