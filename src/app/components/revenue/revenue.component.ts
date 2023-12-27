import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Revenue } from '../../modules/revenue.model';
import { Observable } from 'rxjs';
import { RevenueService } from '../../services/revenue.service';
import { User } from '../../modules/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss',
})
export class RevenueComponent {
  revenus: Revenue[] = [];
  storedUser: User = new User(0, '', '', '');

  constructor(private revenuService: RevenueService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.getCurrentUserId();
    this.loadRevenus(userId);
  }

  loadRevenus(userId: number): void {
    this.revenuService.getRevenuByUser(userId).subscribe(
      (data) => {
        this.revenus = data;
      },
      (error) => {
        console.error('Error loading revenus', error);
      }
    );
  }

  updateRevenu(id: number): void {
    this.router.navigate(['/update-revenue', id]);
  }

  deleteRevenu(revenuId: number): void {
    this.revenuService.deleteRevenu(revenuId).subscribe(
      () => {
        console.log('Compte deleted successfully');
        this.loadRevenus(this.getCurrentUserId());
      },
      (error) => {
        console.error('Error deleting compte:', error);
      }
    );
  }

  addRevenue(): void {
    this.router.navigate(['/add-revenue']);
  }

  private getCurrentUserId(): number {
    try {
      this.storedUser = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      if (this.storedUser && this.storedUser.id) {
        console.log('User ID:', this.storedUser.id);
        return this.storedUser.id;
      } else {
        console.error('User ID not found in the stored object.');
      }
    } catch (error) {
      console.error('Error parsing user object from localStorage:', error);
    }
    return 0;
  }
}
