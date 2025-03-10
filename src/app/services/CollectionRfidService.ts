import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CollectionRfidService {
  private apiUrl = `${environment.apiUrl}/CollectionRfid`;

  constructor(private http: HttpClient) {}

  getCollectionByFamilleId(
    familleId: number,
    page: number,
    pageSize: number
  ): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/Famille/${familleId}/Page/${page}`
    );
  }

  getCouleurByCollectionId(collectionId: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/Couleur/${collectionId}`)
      .pipe(catchError(this.handleError));
  }

  getArticleByCollectionIdAndGammeId(
    collectionId: number,
    gammeId: number
  ): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/Article/${collectionId}/${gammeId}`)
      .pipe(
        map((articles) => {
          articles.forEach((article) => {
            article.Dimensions = this.extractDimensions(
              article.art_designation
            );
          });
          return articles;
        }),
        catchError(this.handleError)
      );
  }

  getAllArticles(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/Articles`)
      .pipe(catchError(this.handleError));
  }

  private extractDimensions(designation: string): string {
    const positionX = designation.toUpperCase().indexOf('X');

    if (designation.includes('LITEAUX') || designation.includes('TORCHON')) {
      return '35X70';
    }
    if (positionX >= 0) {
      if (designation.toUpperCase().includes('X1000')) {
        return designation.substring(positionX - 3, 8);
      } else {
        return designation.substring(positionX - 3, 7);
      }
    } else {
      return designation;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error("Une erreur s'est produite :", error);
    return throwError('Une erreur est survenue, veuillez réessayer.');
  }
}
