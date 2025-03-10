import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/Contact`;

  constructor(private http: HttpClient) {}

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getContactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getContactsByClientAndOrigin(id: number, origine: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/clientfournisseur/${id}/${origine}`
    );
  }
}
