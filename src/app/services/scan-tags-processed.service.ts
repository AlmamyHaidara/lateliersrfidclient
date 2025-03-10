import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScanTagsProcessedService {
  private baseUrl = `${environment.apiUrl}/ScanTagsProcessed`;

  constructor(private http: HttpClient) {}

  getMaxScanProcessedId(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/maxId`);
  }

  getNewScansProcessedByIdZone(
    maxId: number,
    zoneId: number,
    idArticle: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/newScans/${maxId}/${zoneId}/${idArticle}`
    );
  }

  simulateScan(): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/simulateScan`, {});
  }
}
