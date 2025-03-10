import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompteAdminService {
  private apiUrl = `${environment.apiUrl}/Employe`;

  constructor(private http: HttpClient) {}

  getEmployeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllNonAdminEmployees(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nonAdminEmployees/${id}`);
  }

  insertEmploye(employe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, employe);
  }

  updateEmploye(id: number, employe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, employe);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  authenticateEmploye(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, {
      email,
      password,
    });
  }

  getEmployePasswordById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getpassword/${id}`);
  }

  updateEmployePassword(
    id: number,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updatepassword/${id}`, {
      oldPassword,
      newPassword,
    });
  }
  getNonAdminEmployeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nonadmin/${id}`);
  }

  getAllEmployes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  uploadFileEmploye(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(`${this.apiUrl}/uploadEmploye`, formData);
  }
}
