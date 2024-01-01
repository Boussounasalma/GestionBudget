import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-transaction-modal',
  template: `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add Transaction</h4>
          <button
            type="button"
            class="btn-close"
            (click)="closeModal()"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Choose the type of transaction:</p>
          <button class="btn btn-primary" (click)="redirectTo('add-epargne')">
            Add Epargne
          </button>
          <button class="btn btn-primary" (click)="redirectTo('add-depense')">
            Add Depense
          </button>
          <button class="btn btn-primary" (click)="redirectTo('add-revenue')">
            Add Revenue
          </button>
        </div>
      </div>
    </div>
  `,
})
export class AddTransactionModalComponent implements AfterViewInit {
  constructor(
    private activeModal: NgbActiveModal,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    // Add a slight delay before setting the z-index
    setTimeout(() => {
      this.setBackdropZIndex(700);
    }, 100);
  }

  setBackdropZIndex(zIndex: number): void {
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      this.renderer.setStyle(backdropElement, 'z-index', zIndex);
    }
  }

  redirectTo(route: string): void {
    console.log('Redirecting to:', route);
    this.activeModal.close();
    this.router.navigate([route]);
  }

  closeModal(): void {
    this.activeModal.dismiss();
  }
}
