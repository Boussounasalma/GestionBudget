import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../modules/categorie_depense.model';

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private apiUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) {}

  createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/categorie`, categorie);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categories`);
  }

  getCategorieById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.apiUrl}/categorie/id/${id}`);
  }

  getCategorieByUserId(id: number): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/categorie/user/id/${id}`);
  }

  deleteCategorie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categorie/${id}`);
  }

  updateCategorie(categorie: Categorie): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/categorie`, categorie);
  }
}
