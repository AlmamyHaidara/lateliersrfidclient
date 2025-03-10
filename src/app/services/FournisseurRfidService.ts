import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FournisseurRfidService {
  private apiUrl = `${environment.apiUrl}/FournisseurRfid`;

  constructor(private http: HttpClient) {}

  getFournisseurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getFournisseurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  ajouterFournisseur(fournisseur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, fournisseur);
  }

  mettreAJourFournisseur(id: number, fournisseur: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, fournisseur);
  }

  supprimerFournisseur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
