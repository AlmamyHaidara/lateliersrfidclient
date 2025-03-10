import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {SpinnerService} from "./services/spinner.service";
import {NzSpinComponent} from "ng-zorro-antd/spin";
import { FooterComponent } from './pages/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzIconModule, 
    NzLayoutModule, 
    NzMenuModule, 
    RouterLink, 
    NzSpinComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userData: any;
  isCollapsed = false;
  isLoginPage = false;
  empPstId: number | null = null;
  emp_Administrateur: boolean | null = null;
  currentRoute: string = '';
  isFirstLoad: boolean = true;
  i=0;
  

  constructor(private router: Router, public  spinnerService: SpinnerService) {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Met à jour la route actuelle
        this.i++; 
        this.currentRoute = event.url;

        // Si c'est le premier chargement, applique le style personnalisé
        if (this.isFirstLoad && this.i!=0) {
          this.isFirstLoad = false; 
        }
      }
    });
    
  }

  isSidebarVisible(): boolean {
    return !['/login', '/inscription', '/AlertCreateSociety', '/AdminCompte','/loginRfidIn', '/not-found', '/AdminCompte#creer', '/reset-password'].includes(this.router.url);
  }

  isAppVisible(): boolean {
    return this.router.url == '/login' || this.router.url == '/inscription' || this.router.url == '/AlertCreateSociety' || this.router.url == "/AdminCompte" || this.router.url == "/not-found"|| this.router.url == "'/loginRfidIn'";
  }

  isHeaderVisible(): boolean {
    return !['/login', '/inscription', '/AlertCreateSociety', "/AdminCompte",'/loginRfidIn', '/not-found', '/AdminCompte#creer', '/reset-password'].includes(this.router.url);
  }

  ngOnInit() {
    this.getUserData();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCollapsed = !this.isSidebarVisible();
        this.isLoginPage = !this.isAppVisible();

        const empPstIdString = localStorage.getItem('empPstId');
        const empAdministrateurString = localStorage.getItem('emp_Administrateur');

        if (empPstIdString !== null) {
          this.empPstId = parseInt(empPstIdString);
        }

        if (empAdministrateurString !== null) {
          this.emp_Administrateur = empAdministrateurString === 'true';
        }
      }
    });
    
  }

  private getUserData(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  logout(): void {
    this.spinnerService.showSpinner(); 
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('password');
    
    localStorage.removeItem('emp_Administrateur');
    localStorage.removeItem('empPstId');
    localStorage.removeItem('emp_Soc_Id');
    localStorage.removeItem('emp_Id');
    localStorage.removeItem('scl_Id');
    localStorage.removeItem('scl_Cli_Id');
    localStorage.removeItem('scl_Soc_Id');
    localStorage.removeItem('scl_Base');
    localStorage.removeItem('adressesData');
    localStorage.removeItem('clientData');
    localStorage.removeItem('commandeData');
    localStorage.removeItem('contactsData');
    localStorage.removeItem('user');
    

    const empAdministrateurString = localStorage.getItem('emp_Administrateur');
    const user = localStorage.getItem('user');

    setTimeout(() => {
      if (empAdministrateurString === 'true') {
        this.router.navigate(['/login']);
      } else if (user) {
        this.router.navigate(['/loginRfidIn']);
      } else {
        this.router.navigate(['/login']);
      }
      this.spinnerService.hideSpinner();
    }, 1000);
  }


  openSubmenus: { [key: string]: boolean } = {};

  toggleSubmenu(key: string): void {
    this.openSubmenus[key] = !this.openSubmenus[key];

    for (const submenu in this.openSubmenus) {
      if (submenu !== key) {
        this.openSubmenus[submenu] = false;
      }
    }
  }


}
