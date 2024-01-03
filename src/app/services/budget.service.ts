import { Injectable } from '@angular/core';
import { BudgetCategorie } from '../modules/budgetCategorie.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private baseUrl = 'http://localhost:8080/budget';

  constructor(private http: HttpClient) {}

  addBudgetCategorie(budgetCategorie: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/budgetCategorie`, budgetCategorie);
  }

  getBudgetCategoriesForCurrentMonthAndUser(
    utilisateur: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/budgetCategories/currentMonth/${utilisateur}`
    );
  }
}
