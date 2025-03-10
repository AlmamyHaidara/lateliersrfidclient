import { Component, OnInit } from '@angular/core';
import {CommentSectionComponent} from "../comment-section/comment-section.component";
import {IconComponent} from "../icon/icon.component";
import {UploadSectionComponent} from "../upload-section/upload-section.component";
import {SubmitButtonComponent} from "../submit-button/submit-button.component";
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commande-history-list',
  templateUrl: './commande-history-list.component.html',
  standalone: true,
  imports: [
    CommonModule,
    CommentSectionComponent,
    IconComponent,
    UploadSectionComponent,
    SubmitButtonComponent,
    NzCardModule,

  ],
  styleUrl: './commande-history-list.component.scss'
})
export class CommandeHistoryListComponent implements OnInit{
  clique1:boolean = false;
  clique2:boolean = false;
  clique3:boolean = false;
  clique4:boolean = false;
  clique5:boolean = false;
  clique6:boolean = false;

  Icones = [
    {iconSrc: "/assets/commandes/camion.png", iconText: "Livré avec soin"},
    {iconSrc: "/assets/commandes/Attente.png", iconText: "Au delà de mes attentes"},
    {iconSrc: "/assets/commandes/verifier.png", iconText: "Articles conformes"},
  ]

  Icones2 = [
    {iconSrc: "/assets/commandes/completed-task.png", iconText: "Respect des instructions"},
    {iconSrc: "/assets/commandes/chronometres.png", iconText: "Dans les délais"},
    {iconSrc: "/assets/commandes/qualite.png", iconText: "Articles de qualité"},
  ]
  ngOnInit(): void {
    if(this.Icones.length > 2){
    } 
  }

  cliquer1(mot:string):void{
    this.clique1 = !this.clique1;
    console.log("Vous avez cliquer sur "+mot);  
    
  }
  cliquer2(mot:string):void{
    this.clique2 = !this.clique2;
    console.log("Vous avez cliquer sur "+mot);  
    
  }
  cliquer3(mot:string):void{
    this.clique3 = !this.clique3;
    console.log("Vous avez cliquer sur "+mot);  
    
  }
  cliquer4(mot:string):void{
    this.clique4 = !this.clique4;
    console.log("Vous avez cliquer sur "+mot);  
    
  }
  cliquer5(mot:string):void{
    this.clique5 = !this.clique5;
    console.log("Vous avez cliquer sur "+mot);  
    
  }
  cliquer6(mot:string):void{
    this.clique6 = !this.clique6
    console.log("Vous avez cliquer sur "+mot);  
    
  }
}
