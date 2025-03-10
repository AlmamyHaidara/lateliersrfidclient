import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocieteClientService {
  private baseUrl = `${environment.apiUrl}/SocieteClientScl`;

  constructor(private http: HttpClient) {}

  getAllSocieteClientScl(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getSocieteClientSclById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  insertSocieteClientScl(societeClientScl: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, societeClientScl);
  }

  updateSocieteClientScl(id: number, societeClientScl: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, societeClientScl);
  }

  deleteSocieteClientScl(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
