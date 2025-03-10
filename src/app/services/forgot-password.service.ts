import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = `${environment.apiUrl}/ForgotPassword`;

  constructor(private http: HttpClient) { }

  sendMail(email:string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/check-email`,{email}).pipe(
      catchError((error) => {
        return throwError(error);
      }))
  }
}
