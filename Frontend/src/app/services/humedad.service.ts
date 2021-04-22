import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HumedadService {

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get('http://localhost:3000/humedad');
  }

}
