import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  private apiUrl = `${environment.apiUrl}/Devis`;

  constructor(private http: HttpClient) {}

  createDevisLegerPortal(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/CreatePortal`, request);
  }
}
