import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FonctionContactService {
  private baseUrl = `${environment.apiUrl}/Fonction`;

  constructor(private http: HttpClient) {}

  getAllFonctionContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getFonctionContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
