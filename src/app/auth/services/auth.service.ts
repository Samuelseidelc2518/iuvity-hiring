import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(auth: Auth) {
    return this.http
      .post('http://localhost:3000/api/v1/auth/login', auth)
      .toPromise();
  }

  register(auth: Auth) {
    return this.http
      .post('http://localhost:3000/api/v1/auth/register', auth)
      .toPromise();
  }
}
