import { Component } from '@angular/core';
import { Epargne } from '../../modules/epargne.model';
import { EpargneService } from '../../services/epargne.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-epargne',
  templateUrl: './epargne.component.html',
  styleUrls: ['./epargne.component.scss'],
})
export class EpargneComponent {
  epargnes: Epargne[] = [];

  constructor(private epargneService: EpargneService, private router: Router) {}

  ngOnInit(): void {
    this.loadEpargnesForCurrentUser();
  }

  private getUserIdFromSessionStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return user ? user.id : 0;
  }

  loadEpargnesForCurrentUser(): void {
    const userId = this.getUserIdFromSessionStorage();
    this.epargneService.getEpargneByUserId(userId).subscribe(
      (data) => {
        this.epargnes = data;
      },
      (error) => {
        console.error('Error fetching Epargnes:', error);
      }
    );
  }

  navigateToAddEpargne(): void {
    this.router.navigate(['/add-epargne']);
  }

  onEdit(epargneId: number): void {
    this.router.navigate([`/update-epargne/${epargneId}`]);
  }

  onDelete(epargneId: number): void {
    this.epargneService.deleteEpargne(epargneId).subscribe(
      () => {
        this.epargnes = this.epargnes.filter((e) => e.id !== epargneId);
        console.log(`Epargne with ID ${epargneId} deleted successfully.`);
        this.loadEpargnesForCurrentUser();
      },
      (error) => {
        console.error(`Error deleting epargne with ID ${epargneId}:`, error);
      }
    );
  }
}
