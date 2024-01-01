import { Component } from '@angular/core';
import { Objectif } from '../../modules/objectif.model';
import { ObjectifService } from '../../services/objectif.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objectif',
  templateUrl: './objectif.component.html',
  styleUrl: './objectif.component.scss',
})
export class ObjectifComponent {
  objectifs: Objectif[] = [];

  constructor(
    private objectifService: ObjectifService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadObjectifs();
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return parseInt(user.id, 10);
  }

  loadObjectifs(): void {
    const userId = this.getUserIdFromLocalStorage();
    this.objectifService.getObjectifsByUser(Number(userId)).subscribe(
      (data) => {
        this.objectifs = data;
      },
      (error) => {
        console.error('Error fetching objectives:', error);
      }
    );
  }

  deleteObjectif(objectifId: number): void {
    this.objectifService.deleteObjectif(objectifId).subscribe(
      () => {
        console.log('Compte deleted successfully');
        this.loadObjectifs();
      },
      (error) => {
        console.error('Error deleting compte:', error);
      }
    );
  }

  addNewObjectif() {
    this.router.navigate(['/add-objectif']);
  }

  editObjectif(objectif: number) {
    this.router.navigate(['/update-objectif', objectif]);
  }
}
