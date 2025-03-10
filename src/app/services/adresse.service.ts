import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  private apiUrl = `${environment.apiUrl}/Adresse`;

  constructor(private http: HttpClient) {}

  getAllAdresses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getAdresseById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  adresses: any[] = [];

  updateAdress(tableau: any[]): void {
    this.adresses = tableau;
  }

  setAdress(tableau: any[]): void {
    this.adresses = tableau;
  }

  getAdress(): any[] {
    return this.adresses;
  }

  getAdressesByIdClientFournisseur(
    id: number,
    origine: string
  ): Observable<any[]> {
    const url = `${this.apiUrl}/clientfournisseur/${id}/${origine}`;
    return this.http.get<any[]>(url);
  }

  addAdresse(adresse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, adresse);
  }

  updateAdresse(id: number, adresse: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, adresse);
  }

  deleteAdresse(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }


  getClientById(cliId: number): Observable<any> {
    const url = `${this.apiUrl}/client/${cliId}`;
    return this.http.get<any>(url);
  }
}
