import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeSocieteService {
  private apiUrl = `${environment.apiUrl}/EmployeSociete`;

  constructor(private http: HttpClient) {}

  enregistrerEmployeEtSociete(employe: any, societe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { employe, societe });
  }
}
