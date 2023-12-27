import { Component } from '@angular/core';
import { User } from '../../../modules/user.model';
import { Revenue } from '../../../modules/revenue.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompteService } from '../../../services/compte.service';
import { RevenueService } from '../../../services/revenue.service';
import { Compte } from '../../../modules/compte.model';

@Component({
  selector: 'app-update-revenue',
  templateUrl: './update-revenue.component.html',
  styleUrl: './update-revenue.component.scss',
})
export class UpdateRevenueComponent {
  user: User = new User(0, '', '', '');
  revenueId!: number;
  selectedRevenue: Revenue = {
    id: 0,
    date: '',
    montant: 0,
    compte: { id: 0, nom: '', solde: 0, utilisateur: this.user },
    sourceRevenu: '',
    categorie: '',
  };
  comptes: Compte[] = [];

  constructor(
    private revenuService: RevenueService,
    private compteService: CompteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    this.route.params.subscribe((params) => {
      this.revenueId = +params['id'];
      this.loadRevenue(this.revenueId);
    });
  }

  loadRevenue(id: number): void {
    this.revenuService.getRevenuById(id).subscribe(
      (data) => {
        this.selectedRevenue = data;
      },
      (error) => {
        console.error('Error loading compte', error);
      }
    );
    this.loadComptes(this.getCurrentUserId());
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
  updateRevenue(): void {
    this.revenuService.updateRevenu(this.selectedRevenue).subscribe(
      () => {
        this.router.navigate(['/revenue']);
      },
      (error) => {
        console.error('Error updating compte:', error);
      }
    );
  }
  private getCurrentUserId(): number {
    try {
      this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
      if (this.user && this.user.id) {
        return this.user.id;
      } else {
        console.error('User ID not found in the stored object.');
      }
    } catch (error) {
      console.error('Error parsing user object from localStorage:', error);
    }
    return 0;
  }
}
