import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdresseService } from '../../services/adresse.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';

@Component({
  selector: 'app-edit-impression-modal',
  standalone: true,
  imports:[
    NzModalModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzGridModule,
    CustomNumberPipe
  ],
  templateUrl: './edit-impression-modal.component.html',
  styleUrl: './edit-impression-modal.component.css'
})
export class EditImpressionModalComponent {
  @Input() isVisible: boolean = false;
  @Input() commandeDetails: any = {};
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  clientData: any = null; 

  constructor(private adresseservice: AdresseService) {}

  ngOnInit(): void {
    const cliId = localStorage.getItem('scl_Cli_Id');
    if (cliId) {
      this.getClientDetails(Number(cliId));
      console.error('Client ID not found in localStorage');
    }
  }


  getClientDetails(cliId: number): void {
    this.adresseservice.getClientById(cliId).subscribe({
      next: (response) => {
        this.clientData = response; 
        console.log('Client Data:', this.clientData); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données client:', err);
      }
    });
  }

  handleOk(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  printPreview(): void {
    const printContent = document.getElementById('printable-area')?.innerHTML || '';
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `
      <style>
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
      </style>
      ${printContent}
    `;

    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  }
  calculateUnitPrice(article: any): number {
    if (article.cda_Quantite > 0 && article.cda_Remise >= 0) {
      const discountFactor = 1 - article.cda_Remise / 100;
      return article.cda_PrixTotalRemiseHT / (article.cda_Quantite * discountFactor);
    }
    return 0; 
  }


  calculateTotalRemise(article: any): number {
    if (article.cda_Quantite > 0 && article.cda_Remise >= 0) {
      const unitPrice = this.calculateUnitPrice(article); // Récupère le prix unitaire HT remisé
      return article.cda_Quantite * unitPrice * (article.cda_Remise / 100);
    }
    return 0; 
  }


}
