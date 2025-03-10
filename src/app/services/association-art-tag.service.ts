import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssociationArtTagService {
  private apiUrl = `${environment.apiUrl}/AssociationArticleTag`;

  constructor(private http: HttpClient) {}

  getAllAssociationArticleTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(catchError(this.handleError));
  }

  getAssociationArticleTagById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(catchError(this.handleError));
  }

  createAssociationArticleTag(associationArticleTag: any): Observable<any> {
    return this.http
      .post<any>(this.apiUrl, associationArticleTag)
      .pipe(catchError(this.handleError));
  }

  updateAssociationArticleTag(
    id: number,
    associationArticleTag: any
  ): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .put<any>(url, associationArticleTag)
      .pipe(catchError(this.handleError));
  }

  deleteAssociationArticleTag(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
