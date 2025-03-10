import { NgForOf, CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutComponent } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ContactService } from '../../services/contact-service.service';
import { FonctionContactService } from '../../services/fonction-contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-form',
  standalone:true,
  imports: [
    FormsModule,
    NzLayoutComponent,
    RouterLink,
    NgForOf,FormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzCardModule,
    CommonModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit,AfterViewInit{
  newContact: any = {};
  spinner : boolean = false;
  fonctions: any []= [];

  constructor(private contactService: ContactService, private fonctionContactService: FonctionContactService, private router: Router) { }
  
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @ViewChild('civilite') firstInput! : ElementRef;

  ngOnInit(): void {
    this.getAllFonctionContacts();

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.firstInput.nativeElement.focus();
    },1000);
    console.log("salut");
  }         


  getAllFonctionContacts(): void {
    this.fonctionContactService.getAllFonctionContacts().subscribe(
      (data) => {
        this.fonctions = data;
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
  fermer():void{
    this.closeModal.emit()
  }
  addContact(): void {
    const sclCliId = localStorage.getItem('scl_Cli_Id');
    if (sclCliId) {
      this.newContact.cot_cli_id = sclCliId;
      console.log(sclCliId);
      this.newContact.cot_facturation = false;
      this.newContact.cot_logistique = false;
      this.newContact.cot_commercial = false;
      this.newContact.cot_litige = false;
      this.newContact.cot_rotation = false;
      this.newContact.cot_tableorigine = false;
      this.newContact.cot_tableorigine = "client";
      this.spinner = true;
      this.contactService.addContact(this.newContact).subscribe(
        (response) => {
          this.spinner = false;
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: `Contact ajoutée avec succès `,
            confirmButtonText: 'OK',
          });
          this.closeModal.emit()
          // this.router.navigate(['/contact']);
        },
        (error) => {
          console.error(error);
          this.spinner = false;
          console.error('Erreur lors de l\'ajout du contact : ', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: `Erreur lors de l'ajout du contact : ${error.error.title}`,
            confirmButtonText: 'OK',
          });
        }
      );
    }else {
      console.error('scl_Cli_Id n\'est pas défini dans le stockage local.');
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'l\'id du client n\'est pas défini dans le stockage local.',
        confirmButtonText: 'OK',
      });
    }
  }
}
