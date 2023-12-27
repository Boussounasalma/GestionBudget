import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compte } from '../modules/compte.model';

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  private apiUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) {}

  createCompte(compte: Compte): Observable<Compte> {
    console.log(compte);
    return this.http.post<Compte>(`${this.apiUrl}/compte`, compte);
  }

  getAllComptes(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.apiUrl}/comptes`);
  }

  getCompteById(id: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.apiUrl}/compte/id/${id}`);
  }

  deleteCompte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/compte/${id}`);
  }

  updateCompte(compte: Compte): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/compte`, compte);
  }

  getComptesByUserId(userId: number): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.apiUrl}/compte/user/id/${userId}`);
  }
}
