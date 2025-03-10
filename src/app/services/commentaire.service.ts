import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Commentaire } from '../models/commentaire';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {

  private apiUrl = `${environment.apiUrl}/Commentaire`;

  constructor(
    private http: HttpClient,
    private router : Router) { }

  idCommande !: number ;

  ecrireCommentaire(id:number):void{
    this.idCommande = id;
    console.log(id);
    this.router.navigateByUrl("/comment");
  }

  getID():number{
    return this.idCommande;
  }

  createCommentaire(commentaire: Commentaire): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateCommentaire`, commentaire);
  }

}
