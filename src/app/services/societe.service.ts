import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
  private apiUrl = `${environment.apiUrl}/Societe`;

  constructor(private http: HttpClient) {}

  getSocieteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllSocietes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  insertSociete(societe: any): Observable<number> {
    return this.http.post<number>(this.apiUrl, societe);
  }

  updateSociete(id: number, societe: any): Observable<number> {
    return this.http.put<number>(`${this.apiUrl}/${id}`, societe);
  }

  deleteSociete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${id}`);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }
}
