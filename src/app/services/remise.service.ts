import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RemiseService {
  private apiUrl = `${environment.apiUrl}/Remise`;

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer toutes les remises
  getAllRemises(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Méthode pour récupérer une remise par son ID
  getRemiseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour récupérer les remises par ID client
  getRemiseByIdClient(idClient: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${idClient}`);
  }

  // Méthode pour récupérer les remises par ID client et article
  getRemiseByIdClientIdArticle(
    idClient: number,
    idArticle: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/client/${idClient}/article/${idArticle}`
    );
  }

  // Méthode pour récupérer les remises par type (famille, collection, etc.)
  getRemisesByIdClientByType(idClient: number, type: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${idClient}/${type}`);
  }

  // Méthode pour insérer une nouvelle remise
  postRemise(remise: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, remise);
  }

  // Méthode pour mettre à jour une remise par ID
  updateRemise(id: number, remise: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, remise);
  }

  // Méthode pour supprimer une remise par ID
  deleteRemise(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  applyRemiseToArticle(idClient: number, idArticle: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${idClient}/article/${idArticle}/apply-remise`);
  }

}
