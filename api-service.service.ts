import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  // apiURL= "http://localhost:8080/api/"
     apiURL="http://localhost:8080/api/"
  selectedItem: any;
  items: any;
  constructor(
    public http : HttpClient
  ) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  // HttpClient API get() method => Fetch employees list
  getStudentDetails(): Observable<any> {
    return this.http
      .get<any>(this.apiURL + 'AllStudent')
      .pipe(retry(1), catchError(this.handleError));
  }
   
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
