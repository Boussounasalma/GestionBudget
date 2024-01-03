import { Component } from '@angular/core';
import { Compte } from '../../../modules/compte.model';
import { User } from '../../../modules/user.model';
import { CompteService } from '../../../services/compte.service';
import { Router } from '@angular/router';
import { RevenueService } from '../../../services/revenue.service';

@Component({
  selector: 'app-add-revenue',
  templateUrl: './add-revenue.component.html',
  styleUrl: './add-revenue.component.scss',
})
export class AddRevenueComponent {
  comptes: Compte[] = [];
  selectedCompte: number = 0;
  selectedSourceRevenu: string = '';
  selectedDate: Date = new Date();
  selectedMontant: number = 0;
  selectedCategory: string = '';
  storedUser: User = new User(0, '', '', '');

  constructor(
    private compteService: CompteService,
    private router: Router,
    private revenueService: RevenueService
  ) {}

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
  submitForm(): void {
    this.compteService.getCompteById(this.selectedCompte).subscribe(
      (selectedCompte) => {
        const newRevenu = {
          id: generateUniqueId(),
          date: this.selectedDate,
          montant: this.selectedMontant,
          compte: selectedCompte,
          sourceRevenu: this.selectedSourceRevenu,
          categorie: this.selectedCategory,
        };

        console.log(newRevenu);

        this.revenueService.addRevenu(newRevenu).subscribe(
          (createdRevenu) => {
            console.log('Revenu created successfully:', createdRevenu);
            this.router.navigate(['/revenue']);
          },
          (error) => {
            console.error('Error creating revenu:', error);
          }
        );
      },
      (error) => {
        console.error('Error getting compte:', error);
      }
    );
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
function generateUniqueId(): number {
  return Math.floor(Math.random() * 1000);
}
