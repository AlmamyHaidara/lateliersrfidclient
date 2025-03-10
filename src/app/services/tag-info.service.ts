import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TagInfoService {
  private baseUrl = `${environment.apiUrl}/TagInfo`;

  constructor(private http: HttpClient) {}

  getAllTagInfos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getTagInfoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  insertTagInfo(tagInfo: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tagInfo);
  }

  updateTagInfo(id: number, tagInfo: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, tagInfo);
  }

  deleteTagInfo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getMaxIdTagInfo(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/MaxId`);
  }
  getTagInfoByReference(reference: string): Observable<any> {
    const url = `${this.baseUrl}/api/TagInfo/${reference}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    console.error("Une erreur s'est produite : ", error);
    return throwError('Erreur de service. Veuillez réessayer plus tard.');
  }
}
