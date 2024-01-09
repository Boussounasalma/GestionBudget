import { Component } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { User } from '../../modules/user.model';
import { Compte } from '../../modules/compte.model';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../modules/categorie_depense.model';
import { BudgetCategorie } from '../../modules/budgetCategorie.model';
import { Budget } from '../../modules/budget.model';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss',
})
export class BudgetComponent {
  budgetCategorie: BudgetCategorie = {
    id: 0,
    categorie: {
      id: 0,
      nom: '',
      user: { id: 0, username: '', email: '', password: '' },
    },
    budget: {
      id: 0,
      mois: 0,
      annee: 0,
      utilisateur: { id: 0, username: '', email: '', password: '' },
    },
    montantMensuel: 0,
    montantDepense: 0,
  };
  storedUser!: User;
  categories: Categorie[] = [];

  constructor(
    private budgetCategorieService: BudgetService,
    private categorieService: CategorieService
  ) {}

  ngOnInit() {
    this.loadUserCategories();
  }

  loadUserCategories() {
    const userId = this.getUserIdFromLocalStorage();

    this.categorieService
      .getCategorieByUserId(userId)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return parseInt(user.id, 10);
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

  addBudgetCategorie() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const budget: Budget = {
      // Create a new Budget object
      id: 0,
      mois: currentMonth,
      annee: currentYear,
      utilisateur: {
        id: this.getCurrentUserId(),
        username: '',
        email: '',
        password: '',
      },
    };

    this.budgetCategorie.budget = budget;

    this.budgetCategorieService
      .addBudgetCategorie(this.budgetCategorie)
      .subscribe(
        (response) => {
          console.log('BudgetCategorie added successfully:', response);
        },
        (error) => {
          console.error('Error adding BudgetCategorie:', error);
        }
      );
  }
}
