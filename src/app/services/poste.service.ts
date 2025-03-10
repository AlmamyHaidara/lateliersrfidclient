import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PosteService {
  private baseUrl = `${environment.apiUrl}/Poste`;

  constructor(private http: HttpClient) {}

  getPostes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/postes`);
  }
}
