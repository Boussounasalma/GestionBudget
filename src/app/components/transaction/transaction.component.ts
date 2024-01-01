import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../modules/transaction.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddTransactionModalComponent } from './add-transaction-modal/add-transaction-modal.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  transactions: Transaction[] = [];
  montantFilter: number | null = null;
  dateFilter: string | null = null;
  filterType: 'date' | 'montant' = 'date';
  private addTransactionModalRef: NgbModalRef | null = null;

  constructor(
    private transactionService: TransactionService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    if (this.filterType === 'montant') {
      this.loadTransactionsByMontant();
    } else if (this.filterType === 'date') {
      this.loadTransactionsByDate();
    }
  }

  loadTransactionsByMontant(): void {
    if (this.montantFilter !== null) {
      this.transactionService
        .getTransactionsByMontant(this.montantFilter!)
        .subscribe((transactions) => (this.transactions = transactions));
    } else {
      this.transactionService
        .getAllTransactions()
        .subscribe((transactions) => (this.transactions = transactions));
    }
  }

  loadTransactionsByDate(): void {
    if (this.dateFilter !== null) {
      this.transactionService
        .getTransactionsByDate(this.dateFilter!)
        .subscribe((transactions) => (this.transactions = transactions));
    } else {
      this.transactionService
        .getAllTransactions()
        .subscribe((transactions) => (this.transactions = transactions));
    }
  }

  applyFilterByMontant(montant: number | null): void {
    this.montantFilter = montant;
    this.loadTransactionsByMontant();
  }

  clearFilterByMontant(): void {
    this.montantFilter = null;
    this.loadTransactions();
  }

  applyFilterByDate(date: string | null): void {
    this.dateFilter = date;
    this.loadTransactionsByDate();
  }

  clearFilterByDate(): void {
    this.dateFilter = null;
    this.loadTransactions();
  }

  onFilterTypeChange(): void {
    this.montantFilter = null;
    this.dateFilter = null;
    this.loadTransactions();
  }

  openAddTransactionModal(): void {
    this.addTransactionModalRef = this.modalService.open(
      AddTransactionModalComponent,
      {
        centered: true,
      }
    );

    this.addTransactionModalRef.result.then(
      (result) => {
        console.log('Modal closed with result:', result);
      },
      (reason) => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }
}
