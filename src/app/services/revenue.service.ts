import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenue } from '../modules/revenue.model';

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private apiUrl = 'http://localhost:8080/budget/revenu';

  constructor(private http: HttpClient) {}

  addRevenu(revenu: Revenue): Observable<Revenue> {
    return this.http.post<Revenue>(`${this.apiUrl}`, revenu);
  }

  getRevenuById(id: number): Observable<Revenue> {
    return this.http.get<Revenue>(`${this.apiUrl}/id/${id}`);
  }

  getRevenuByUser(userId: number): Observable<Revenue[]> {
    return this.http.get<Revenue[]>(`${this.apiUrl}/user/id/${userId}`);
  }

  updateRevenu(revenu: Revenue): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, revenu);
  }

  deleteRevenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
