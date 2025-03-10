import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AdresseService } from '../../services/adresse.service';
import { CreateCommandeComponent } from '../create-commande/create-commande.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-adress-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzCardModule,
    NzLayoutComponent,
  ],
  templateUrl: './add-adress-form.component.html',
  styleUrl: './add-adress-form.component.css'
})
export class AddAdressFormComponent implements OnInit,AfterViewInit{
  
  newAdresse: any = {};
  spinner : boolean = false;
  @ViewChild('adr_Nomsociete') nomsoc! : ElementRef;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private adresseService: AdresseService,
              private router:Router,) { }

  adresseTableau!:any[];
  ngOnInit(): void {
    this.adresseTableau = this.adresseService.getAdress();    
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.nomsoc.nativeElement.focus();
    },1000);
    console.log("salut");
  }         


  addAdresse() {
    const scl_Cli_Id = localStorage.getItem('scl_Cli_Id');

    if (scl_Cli_Id) {
      this.newAdresse.adr_Clifou_Id = scl_Cli_Id;
      this.newAdresse.Adr_Tableorigine= "client";
      this.spinner = true;
      this.adresseService.addAdresse(this.newAdresse).subscribe(
        response => {
          this.spinner = false;
          console.log('Adresse ajoutée avec succès : ', response);
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Adresse ajoutée avec succès `,
            confirmButtonText: 'OK',
          });
          this.newAdresse = {};
          this.closeModal.emit();
          // this.router.navigate(['/adresse'])
        },
        error => {
          this.spinner = false;
          console.error('Erreur lors de l\'ajout de l\'adresse : ', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: `Erreur lors de l'ajout de l'adresse : ${error.error.title}`,
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      console.error('scl_Cli_Id n\'est pas défini dans le stockage local.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'l\'id du client n\'est pas défini dans le stockage local.',
        confirmButtonText: 'OK',
      });
    }
  }
  
  fermer():void{
    this.closeModal.emit();
  }

}

