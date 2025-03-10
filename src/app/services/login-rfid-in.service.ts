import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginRfidInService {
  private apiUrl = `${environment.apiUrl}/Utilisateur`;

  constructor(private http: HttpClient) {}

  getUtilisateurById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getUtilisateurByLogin(login: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login/${login}`);
  }

  authenticateUtilisateur(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, {
      login,
      password,
    });
  }
}
