import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeService } from '../../services/commande.service';
import { AdresseService } from '../../services/adresse.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { debounceTime, defaultIfEmpty, distinctUntilChanged, filter, map, merge, of, Subject, switchMap, tap, Observable, catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';
import { PaginationComponent } from '../pagination/pagination.component';
import { ApercucommandeComponent } from '../apercucommande/apercucommande.component';

type SearchAction = {
  type: 'search';
  term: string;
};

type LoadAction = {
  type: 'load';
  option: string;
  clientId: number;
};

type Action = SearchAction | LoadAction;


@Component({
  selector: 'app-list-commande',
  standalone: true,
  imports: [
    ApercucommandeComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    CustomNumberPipe,
    PaginationComponent,
  ],
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit {
  commandes: any[] = [];
  pagedCommandes: any[] = []; 
  clientId!: number; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  selectedCommande: any = null; 
  clientData: any = null;
  isloading : boolean = true;
  filteredCommandes: any[] = [];
  searchTerm: string = '';
  selectedOption: string = 'currentMonth'; 
  totalCommandes: any[] = [];
  batchSize: number = 40; 
  public loadedCommandes: any[] = []; 
  loadingMore: boolean = false; // Indicateur de chargement
  searchTerm$ = new Subject<string>();
  loadCommandes$ = new Subject<{ option: string; clientId: number}>();
  searchInput = new FormControl(''); 

  ItemsParPage : number = 15;
  PageCourant : number = 1;

  constructor(
  private commandeService: CommandeService , private adresse: AdresseService,
  private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    // const searchTermVar$ = this.searchTerm$.pipe(
    //   // tap(term => console.log('Emission dans searchTerm$:', term)),
    //   // debounceTime(300),
    //   // distinctUntilChanged(),
    //   map(term => ({
    //     type: 'search',
    //     term,
    //   }as SearchAction))
    // )

    this.loadCommandes$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(()=> this.isloading = true),
      switchMap(({ option , clientId}) =>
        option === 'currentMonth'
        ? this.commandeService.getCurrentMonthWithArticlesByClient(clientId).pipe(
          tap(()=> this.isloading = true),
          catchError(err => {
            console.error(err); 
            this.isloading = false; 
            return of([]); 
          })
        )
        : option === 'all' ? this.commandeService.getAllWithArticlesByClient(clientId).pipe(
          tap(()=> this.isloading = true),
          catchError(err => {
            console.error(err); 
            this.isloading = false; 
            return of([]); 
          })
        )
        : of([])
      )
    ).subscribe({
      next: (data) => {
        this.commandes = data; 
        this.filteredCommandes = data;
        // this.loadedCommandes = this.filteredCommandes.slice(0, this.batchSize); // Charger le premier lot
        this.loadedCommandes = data;
        this.isloading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes:', err);
        this.isloading = false;
      }
    });

    // var emptySearch$;
    // var valueSearch$;

    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(()=> this.isloading = true),
      switchMap((term : string | null) =>
        !term || !term.trim() 
        ? this.loadCommandes() 
        : this.commandeService.searchCommandesWithArticles(this.clientId, term).pipe(
          tap(()=> this.isloading = true),
          catchError (err => {
            this.isloading = false; 
            return of([]);
          })
        )
      )
    ).subscribe({
      next: (data) => {
        this.commandes = data;
        this.filteredCommandes = data;
        // this.loadedCommandes = this.filteredCommandes.slice(0, this.batchSize);
        this.loadedCommandes = data;
        this.updatePagedCommandes();
        this.isloading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes :', err);
        this.isloading = false;
      }
    });

    const storedClientId = localStorage.getItem('scl_Cli_Id');
    if (storedClientId) {
      this.clientId = parseInt(storedClientId, 10);
      this.loadCommandes();
      this.getClientDetails(Number(storedClientId));

    } else {
      console.error('Aucun ID de client trouvé dans le localStorage');
    }
    
  }
  
  get paginationData(){
    const start = (this.PageCourant -1) * this.ItemsParPage;
    const end = start  + this.ItemsParPage;

    return this.loadedCommandes.slice(start , end);
  }

  changeCurrentPage(page : number){
    this.PageCourant = page;
  }

  loadCommandes(): Observable<any> {
    // console.log('Emission dans loadCommandes$:', {
    //   option: this.selectedOption,
    //   clientId: this.clientId
    // });

    const data = { option: this.selectedOption, clientId: this.clientId };
    this.loadCommandes$.next(data); 
    return of(data);

    // this.isloading = true;
  
    // if (this.selectedOption === 'currentMonth') {
    //   this.commandeService.getCurrentMonthWithArticlesByClient(this.clientId).subscribe({
    //     next: (data) => {
    //       this.commandes = data; 
    //       this.filteredCommandes = data;
    //       this.loadedCommandes = this.filteredCommandes.slice(0, this.batchSize); // Charger le premier lot
    //       this.isloading = false;

    //       return observable$ = of(data);
    //     },
    //     error: (err) => {
    //       console.error('Erreur lors de la récupération des commandes:', err);
    //       this.isloading = false;
          
    //       return of([])
    //     }
    //   });
    // } else if (this.selectedOption === 'all') {
    //   this.commandeService.getAllWithArticlesByClient(this.clientId).subscribe({
    //     next: (data) => {
    //       this.totalCommandes = data; // Toutes les commandes
    //       this.loadedCommandes = this.totalCommandes.slice(0, this.batchSize); // Charger le premier lot
    //       this.isloading = false;

    //       return observable$ = of(data);
    //     },
    //     error: (err) => {
    //       console.error('Erreur lors de la récupération des commandes:', err);
    //       this.isloading = false;

    //       return of([])
    //     }
    //   });
    // }

    // return of([])
  }


  getClientDetails(cliId: number): void {
    this.adresse.getClientById(cliId).subscribe({
      next: (response) => {
        this.clientData = response; 
        console.log('Client Data:', this.clientData); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données client:', err);
      }
    });
  }

  loadMoreCommandes(): void {
    if (this.loadingMore) return;
  
    this.loadingMore = true;
  
    const nextBatch = this.totalCommandes.slice(
      this.loadedCommandes.length,
      this.loadedCommandes.length + this.batchSize
    );
  
    this.loadedCommandes = [...this.loadedCommandes, ...nextBatch];
    this.loadingMore = false;
  }
  
  loadAllCommandes(): void {
    this.isloading = true;
    this.commandeService.getAllWithArticlesByClient(this.clientId).subscribe({
      next: (data) => {
        this.totalCommandes = data; // Toutes les commandes
        this.loadedCommandes = this.totalCommandes.slice(0, this.batchSize); // Charge le premier lot
        this.isloading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des commandes:', err);
        this.isloading = false;
      }
    });
  }

  
  onSelectionChange(): void {
    this.loadCommandes();
  }
  
searchCommandes(): void {
  if (!this.searchTerm.trim()) {
    this.loadCommandes();
    return;
  }
  this.searchTerm$.next(this.searchTerm);
}
  
  // onScroll(event: any): void {
  //   const { scrollTop, scrollHeight, clientHeight } = event.target;
  
  //   if (scrollTop + clientHeight >= scrollHeight - 100) {
  //     this.loadMoreCommandes();
  //   }
  // }
  

  updatePagedCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCommandes = this.filteredCommandes.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagedCommandes();
  }

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filteredCommandes.length / this.pageSize) }, (_, i) => i + 1);
  }


  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.changePage(this.currentPage + 1);
    }
  }

  
  selectCommande(commande: any): void {
    this.selectedCommande = commande;
    console.log('Commande sélectionnée :', this.selectedCommande); // Debug pour vérifier l'objet
  }
  

  closePopup(): void {
    this.selectedCommande = null;
  }

  
}
