import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Test} from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  create(test: Test): any {
    return this.http.post(`${environment.apiUrl}/tests`, test);
  }

  getAll(page = 1, per = 9999): any {
    return this.http.get(`${environment.apiUrl}/tests`, {
      params: new HttpParams()
        .set('per', per.toString())
        .set('page', page.toString())
    });
  }

  getById(id: number): any {
    return this.http.get<Test>(`${environment.apiUrl}/tests/${id}`);
  }

  update(id, params): any {
    return this.http.put(`${environment.apiUrl}/tests/${id}`, params);
  }

  delete(id: number): any {
    return this.http.delete(`${environment.apiUrl}/tests/${id}`);
  }
}
