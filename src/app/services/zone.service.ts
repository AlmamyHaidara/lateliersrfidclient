import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  private apiUrl = `${environment.apiUrl}/Zone`;
  constructor(private http: HttpClient) {}

  getZoneById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllZones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/All`);
  }

  insertZone(zone: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Insert`, zone);
  }

  updateZone(zone: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Update`, zone);
  }

  getZoneByDesignation(designation: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Designation/${designation}`);
  }

  deleteZone(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getMaxIdZone(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/MaxId`);
  }
}
