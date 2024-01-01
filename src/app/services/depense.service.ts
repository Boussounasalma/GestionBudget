import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depense } from '../modules/depense.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepenseService {
  private apiUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) {}

  addDepense(depense: Depense): Observable<Depense> {
    return this.http.post<Depense>(`${this.apiUrl}/depense`, depense);
  }

  getAllDepenses(): Observable<Depense[]> {
    return this.http.get<Depense[]>(`${this.apiUrl}/depenses`);
  }

  getDepenseById(id: number): Observable<Depense> {
    return this.http.get<Depense>(`${this.apiUrl}/depense/id/${id}`);
  }

  updateDepense(depense: Depense): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/depense`, depense);
  }

  deleteDepense(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/depense/${id}`);
  }
}
