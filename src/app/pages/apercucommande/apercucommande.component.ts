import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import printJS from 'print-js';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AdresseService } from '../../services/adresse.service';
import { CustomNumberPipe } from '../../pipe/custum-number.pipe';

@Component({
  selector: 'app-apercucommande',
  standalone: true,
  imports: [
    NzModalModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzTableModule,
    NzGridModule,
    CustomNumberPipe
  ],
  templateUrl: './apercucommande.component.html',
  styleUrl: './apercucommande.component.css'
})
export class ApercucommandeComponent implements OnInit,OnChanges{
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
    if(this.commandeDetails)
    console.log("Brrrrrrrr : ",this.commandeDetails);
    
  }

  ngOnChanges(changes: SimpleChanges) : void{
    if (changes['commandeDetails'] !== undefined)
    console.log("Dans le Onchange ",this.commandeDetails);
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
    const width = 1200;
    const height = 800;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;

    const printContent = document.getElementById('printable-area')?.innerHTML || '';
    const printWindow = window.open('', '', `width=${width},height=${height},left=${left},top=${top}`);
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Impression</title>
            <style>
              *{
               font-family: 'Poppins', sans-serif;
               margin: 0;
               padding: 0;
              }
              .header-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                border-bottom: 2px solid #000;
                padding-bottom: 10px;
              }

              .company-logo {
                display: flex;
                align-items: center;
                
              }

              .company-logo img {
                height:100px;
                margin-right: 10px;
              }

              .order-info {
                text-align: right;
              }

              .details-table {
                width: 100%;
                margin-bottom: 10px;
                border-collapse: collapse;
              }

              .details-table th,
              .details-table td {
                border: 1px solid #000;
                padding: 6px;
                text-align: center;
                font-size: 14px;
              }

              .details-section {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #000;
                border-radius: 8px;
              }

              .details-title {
                font-weight: bold;
                background-color: #f0f0f0;
                padding: 5px;
                border-bottom: 1px solid #000;
              }

              .details-content {
                padding: 5px;
              }

              .table-container {
                margin-top: 20px;
              }

              .table-container table {
                width: 100%;
                border-collapse: collapse;
              }

              .table-container th,
              .table-container td {
                border: 1px solid #000;
                padding: 6px;
                text-align: center;
              }

              .footer-section {
                margin-top: 20px;
              }
              .grid-container {
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
              }
              
              .grid-header {
                border: 2px solid #000;
                border-radius: 5px;
                text-align: center;
                padding: 5px;
            
              }
              .grid-fax {
                border: 2px solid #000;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                margin-bottom: 10px;
              }
              
              
              .grid-reference {
                border: 2px solid #000;
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                margin-top: 20px;
              }
              .grid-pied {
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                margin-top: 20px;
              }
              
              .grid-content table {
                width: 100%;
                border-collapse: collapse;
              }
              
              .grid-content th, .grid-content td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              
              .grid-content th {
                background-color: #f4f4f4;
                font-weight: bold;
              }
              
              .bouton{
                margin-top: 20px;
              }
              .company-details {
                font-style: normal;
                line-height: 1.5;
                margin: 10px 0;
              }
              
              .company-details a {
                color: #007BFF;
                text-decoration: none;
              }
              
              .company-details a:hover {
                text-decoration: underline;
              }
              
              .parti{
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .d2{
                flex:2;
                min-height: 300px;
              }
              .d1{
                flex:1;
                min-height: 300px;
              }
              .d1d1{
                min-height: 80%;
              }
              .d1d2{
                min-height: 20%;
                max-height: 20%;
              }

              .d2d1{
                min-height: 100%;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
  
      printWindow.document.close(); 
      printWindow.print();
      setTimeout(() => {
        printWindow.close
      }, 5000);
    } else {
      console.error("La fenêtre d'impression n'a pas pu s'ouvrir.");
    }
  }

/*   calculateTotalRemiseHT(article: any): number {
    if (article.cda_Quantite > 0 && article.cda_Remise >= 0) {
      const discountFactor = 1 - article.cda_Remise / 100;
      return article.cda_Quantite * article.cda_Art_PrixVente * discountFactor;
    }
    return 0;
  } */
  
}
