import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../modules/transaction.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/budget/';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(
      this.apiUrl + 'transaction',
      transaction
    );
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl + 'transactions');
  }

  getTransactionsByUser(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.apiUrl + `transaction/user/id/${userId}`
    );
  }

  getTransactionsByDate(date: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.apiUrl + `transaction/date/${date}`
    );
  }

  getTransactionsByMontant(montant: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(
      this.apiUrl + `transaction/montant/${montant}`
    );
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(this.apiUrl + `transaction/id/${id}`);
  }

  updateTransaction(transaction: Transaction): Observable<void> {
    return this.http.put<void>(this.apiUrl + 'transaction', transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + `transaction/${id}`);
  }
}
