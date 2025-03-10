import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {NzLayoutComponent} from "ng-zorro-antd/layout";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ContactService} from "../../services/contact-service.service";
import {FonctionContactService} from "../../services/fonction-contact.service";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NzLayoutComponent,
    RouterLink
  ],
  styleUrl: './edit-contact.component.css'
})
export class EditContactComponent implements OnInit {
  contactId!: number;
  contact: any = {};
  fonctions: any []= [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fonctionContactService: FonctionContactService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contactId = +params['id'];
      this.contactService.getContactById(this.contactId).subscribe(
        (response) => {
          this.contact = response;
        },
        (error) => {
          console.error(error);
        }
      );

    });
    this.getAllFonctionContacts();

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

  updateContact(): void {
    this.contactService.updateContact(this.contactId, this.contact).subscribe(
      (response) => {
        console.log('Contact updated successfully:', response);

        this.router.navigate(['/contact']);
      },
      (error) => {
        console.error('Failed to update contact:', error);
      }
    );
  }

}
