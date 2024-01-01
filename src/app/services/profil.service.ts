import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modules/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private baseUrl = 'http://localhost:8080/budget/utilisateur';

  constructor(private httpClient: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/id/${userId}`);
  }

  updateUser(user: User): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put<void>(`${this.baseUrl}`, user, { headers });
  }
}
