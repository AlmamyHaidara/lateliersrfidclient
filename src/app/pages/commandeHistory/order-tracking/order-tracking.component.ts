import { Component, Input, OnInit } from '@angular/core';
import { NzStepComponent, NzStepsComponent } from "ng-zorro-antd/steps";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { CommonModule, CurrencyPipe, NgForOf } from "@angular/common";
import { CommentaireService } from '../../../services/commentaire.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  standalone: true,
  imports: [
    NzStepComponent,
    NzStepsComponent,
    NzButtonComponent,
    CurrencyPipe,
    NgForOf,
    CommonModule
  ],
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit{

  constructor( private commentaireService : CommentaireService){}

  @Input() commande: any;  

  currentStep = 3; 
  get orderItems() {
    return this.commande?.articles || []; 
  }

  ngOnInit(): void {
  }

  ecrireCommentaire(){
    this.commentaireService.ecrireCommentaire(this.commande.cde_Id);
  }

}
