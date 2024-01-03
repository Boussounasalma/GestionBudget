import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ObjectifService } from '../../services/objectif.service';
import { Objectif } from '../../modules/objectif.model';
import { Revenue } from '../../modules/revenue.model';
import { RevenueService } from '../../services/revenue.service';
import { User } from '../../modules/user.model';
import { Depense } from '../../modules/depense.model';
import { DepenseService } from '../../services/depense.service';
import { Epargne } from '../../modules/epargne.model';
import { EpargneService } from '../../services/epargne.service';
import { CompteService } from '../../services/compte.service';
import { BudgetCategorie } from '../../modules/budgetCategorie.model';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  revenues: Revenue[] = [];
  objectifs: Objectif[] = [];
  depenses: Depense[] = [];
  epargnes: Epargne[] = [];
  budgetCategories: BudgetCategorie[] = [];

  storedUser: User = new User(0, '', '', '');

  totalUserAccounts: number = 0;
  totalSavings: number = 0;

  // Objectif chart
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { min: 0, max: 100 } },
    plugins: {
      legend: { display: false },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };
  barChartLabels: string[] = [];
  barChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  barChartType: ChartType = 'bar';

  // Revenue chart
  revenueChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { min: 0, max: 100 } },
    plugins: { legend: { display: false } },
    elements: { bar: { borderWidth: 1 } },
  };
  revenueChartLabels: string[] = [];
  revenueChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  revenueChartType: ChartType = 'bar';

  // Depense chart
  depenseChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { min: 0, max: 100 } },
    plugins: {
      legend: { display: false },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
  };
  depenseChartLabels: string[] = [];
  depenseChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  depenseChartType: ChartType = 'bar';

  // Epargne chart
  epargneChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { min: 0, max: 100 } },
    plugins: { legend: { display: false } },
    elements: { bar: { borderWidth: 1 } },
  };
  epargneChartLabels: string[] = [];
  epargneChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  epargneChartType: ChartType = 'bar';

  //  Budget Percentage chart
  percentageChartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true, max: 100 } },
    plugins: { legend: { display: false } },
    elements: { bar: { borderWidth: 1 } },
  };
  percentageChartLabels: string[] = [];
  percentageChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  percentageChartType: ChartType = 'bar';

  // Budget by Category chart
  budgetChartOptions: ChartOptions = {
    responsive: true,
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: false } },
    elements: { bar: { borderWidth: 1 } },
  };
  budgetChartLabels: string[] = [];
  budgetChartData: ChartDataset[] = [{ data: [], backgroundColor: [] }];
  budgetChartType: ChartType = 'bar';

  percentageExceeded: boolean = false;

  constructor(
    private objectifService: ObjectifService,
    private revenueService: RevenueService,
    private depenseService: DepenseService,
    private epargneService: EpargneService,
    private compteService: CompteService,
    private budgetService: BudgetService
  ) {}
  ngOnInit(): void {
    this.loadObjectifs();
    this.loadRevenues();
    this.loadDepenses();
    this.loadEpargnes();
    this.loadUserAccounts();
    this.loadEpargneTotal();
    this.loadBudgetCategories();
  }

  loadObjectifs() {
    this.objectifService.getAllObjectifs().subscribe(
      (data) => {
        this.objectifs = data;
        this.calculerPourcentages();
      },
      (error) => {
        console.error('Erreur lors de la récupération des objectifs :', error);
      }
    );
  }

  calculerPourcentages(): void {
    this.barChartLabels = this.objectifs.map((objectif) => objectif.titre);
    this.barChartData[0].data = this.objectifs.map(
      (objectif) => (objectif.montantActuel / objectif.montantCible) * 100 || 0
    );

    // Define your color logic here
    this.barChartData[0].backgroundColor = this.objectifs.map((objectif) => {
      const percentage =
        (objectif.montantActuel / objectif.montantCible) * 100 || 0;

      // Define your color thresholds here
      if (percentage >= 80) {
        return 'blue'; // Change the color to blue
      } else if (percentage >= 50) {
        return 'orange';
      } else {
        return 'red';
      }
    });
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

  loadRevenues() {
    const userId = this.getCurrentUserId();
    this.revenueService.getRevenuByUser(userId).subscribe(
      (data) => {
        this.revenues = data;
        this.calculerRevenuesParMois();
      },
      (error) => {
        console.error('Error fetching revenue data:', error);
      }
    );
  }

  calculerRevenuesParMois(): void {
    const monthsMap = new Map<string, number>();

    this.revenues.forEach((revenue) => {
      const monthKey = revenue.date.toLocaleString('default', {
        month: 'long',
      });
      const currentTotal = monthsMap.get(monthKey) || 0;
      monthsMap.set(monthKey, currentTotal + revenue.montant);
    });

    this.revenueChartLabels = Array.from(monthsMap.keys());
    this.revenueChartData[0].data = Array.from(monthsMap.values());
    this.revenueChartData[0].backgroundColor = this.generateRandomColors(
      this.revenueChartLabels.length
    );
  }

  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );
    }
    return colors;
  }

  loadDepenses() {
    const userId = this.getCurrentUserId();
    this.depenseService.getDepensesByCurrentMonthAndUser(userId).subscribe(
      (data) => {
        this.depenses = data;
        console.log(data);
        this.calculateStatistics();
      },
      (error) => {
        console.error('Error fetching expense data:', error);
      }
    );
  }

  calculateStatistics(): void {
    const categoriesMap = new Map<string, number>();

    this.depenses.forEach((depense) => {
      const categoryKey = depense.categorie.nom;
      const currentTotal = categoriesMap.get(categoryKey) || 0;
      categoriesMap.set(categoryKey, currentTotal + depense.montant);
    });

    this.depenseChartLabels = Array.from(categoriesMap.keys());
    this.depenseChartData[0].data = Array.from(categoriesMap.values());
    this.depenseChartData[0].backgroundColor =
      this.generateRandomColorsForDepense(this.depenseChartLabels.length);
  }

  generateRandomColorsForDepense(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );
    }
    return colors;
  }

  loadEpargnes() {
    const userId = this.getCurrentUserId();
    this.epargneService.getEpargneByUserId(userId).subscribe(
      (data) => {
        this.epargnes = data;
        console.log(data);
        this.calculerEpargnesParDate();
      },
      (error) => {
        console.error('Error fetching epargne data:', error);
      }
    );
  }

  calculerEpargnesParDate(): void {
    const datesMap = new Map<string, number>();

    this.epargnes.forEach((epargne) => {
      const dateKey = new Date(epargne.date).toLocaleDateString();
      const currentTotal = datesMap.get(dateKey) || 0;
      datesMap.set(dateKey, currentTotal + epargne.montant);
    });

    this.epargneChartLabels = Array.from(datesMap.keys());
    this.epargneChartData[0].data = Array.from(datesMap.values());
    this.epargneChartData[0].backgroundColor = this.generateRandomColors(
      this.epargneChartLabels.length
    );
  }

  loadUserAccounts() {
    const userId = this.getCurrentUserId();
    this.compteService.getComptesByUserId(userId).subscribe(
      (data) => {
        const total = data.reduce((sum, compte) => sum + compte.solde, 0);
        this.totalUserAccounts = total;
      },
      (error) => {
        console.error('Error fetching user accounts:', error);
      }
    );
  }

  loadEpargneTotal() {
    const userId = this.getCurrentUserId();
    this.epargneService.getEpargneByUserId(userId).subscribe(
      (data) => {
        const total = data.reduce((sum, epargne) => sum + epargne.montant, 0);
        this.totalSavings = total;
      },
      (error) => {
        console.error('Error fetching epargne data:', error);
      }
    );
  }

  loadBudgetCategories() {
    const utilisateurId = this.getCurrentUserId();
    this.budgetService
      .getBudgetCategoriesForCurrentMonthAndUser(utilisateurId)
      .subscribe((categories) => {
        this.budgetCategories = categories;
        this.calculatePercentages();
      });
  }

  calculatePercentages(): void {
    this.percentageChartLabels = this.budgetCategories.map(
      (category) => category.categorie.nom
    );
    this.percentageChartData[0].data = this.budgetCategories.map(
      (category) =>
        (category.montantDepense / category.montantMensuel) * 100 || 0
    );
    this.percentageChartData[0].backgroundColor = this.generateRandomColors(
      this.percentageChartLabels.length
    );
  }
  generateRandomColorsForBudget(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );
    }
    return colors;
  }
}
