import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objectif } from '../modules/objectif.model';

@Injectable({
  providedIn: 'root',
})
export class ObjectifService {
  private baseUrl = 'http://localhost:8080/budget/objectif';

  constructor(private http: HttpClient) {}

  createObjectif(objectif: Objectif): Observable<Objectif> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Objectif>(`${this.baseUrl}`, objectif, { headers });
  }

  getAllObjectifs(): Observable<Objectif[]> {
    return this.http.get<Objectif[]>(`${this.baseUrl}s`);
  }

  getObjectifById(id: number): Observable<Objectif> {
    return this.http.get<Objectif>(`${this.baseUrl}/id/${id}`);
  }

  getObjectifsByUser(userId: number): Observable<Objectif[]> {
    return this.http.get<Objectif[]>(`${this.baseUrl}/user/id/${userId}`);
  }

  deleteObjectif(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateObjectif(objectif: Objectif): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.baseUrl}`, objectif, { headers });
  }
}
