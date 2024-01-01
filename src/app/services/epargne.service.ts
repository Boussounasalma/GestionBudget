import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Epargne } from '../modules/epargne.model';

@Injectable({
  providedIn: 'root',
})
export class EpargneService {
  private baseUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) {}

  addEpargne(epargne: Epargne): Observable<Epargne> {
    return this.http.post<Epargne>(`${this.baseUrl}/epargne`, epargne);
  }

  getAllEpargnes(): Observable<Epargne[]> {
    return this.http.get<Epargne[]>(`${this.baseUrl}/epargnes`);
  }

  getEpargneById(id: number): Observable<Epargne> {
    return this.http.get<Epargne>(`${this.baseUrl}/epargne/id/${id}`);
  }

  getEpargneByUserId(userId: number): Observable<Epargne[]> {
    return this.http.get<Epargne[]>(
      `${this.baseUrl}/epargne/user/id/${userId}`
    );
  }

  updateEpargne(epargne: Epargne): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/epargne`, epargne);
  }

  deleteEpargne(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/epargne/${id}`);
  }
}
