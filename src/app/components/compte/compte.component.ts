import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CompteService } from '../../services/compte.service';
import { Compte } from '../../modules/compte.model';
import { Router } from '@angular/router';
import { User } from '../../modules/user.model';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrl: './compte.component.scss',
})
export class CompteComponent {
  comptes: Compte[] = [];
  storedUser: User = new User(0, '', '', '');
  constructor(private compteService: CompteService, private router: Router) {}

  ngOnInit(): void {
    const userId = this.getCurrentUserId();
    this.loadComptes(userId);
  }

  loadComptes(userId: number): void {
    this.compteService.getComptesByUserId(userId).subscribe(
      (data) => {
        this.comptes = data;
      },
      (error) => {
        console.error('Error loading comptes', error);
      }
    );
  }

  deleteCompte(id: number): void {
    this.compteService.deleteCompte(id).subscribe(
      () => {
        console.log('Compte deleted successfully');
        this.loadComptes(this.getCurrentUserId());
      },
      (error) => {
        console.error('Error deleting compte:', error);
      }
    );
  }

  updateCompte(id: number): void {
    this.router.navigate(['/update-compte', id]);
  }

  addCompte(): void {
    this.router.navigate(['/add-compte']);
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
