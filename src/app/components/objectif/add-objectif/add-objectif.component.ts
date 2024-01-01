import { Component } from '@angular/core';
import { Objectif } from '../../../modules/objectif.model';
import { ObjectifService } from '../../../services/objectif.service';
import { User } from '../../../modules/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-objectif',
  templateUrl: './add-objectif.component.html',
  styleUrl: './add-objectif.component.scss',
})
export class AddObjectifComponent {
  objectifs: Objectif[] = [];
  newObjective: Objectif = {
    id: 0,
    titre: '',
    description: '',
    montantActuel: 0,
    montantCible: 0,
    dateLimite: new Date(),
    utilisateur: { id: 0, username: '', email: '', password: '' },
  };
  constructor(
    private objectifService: ObjectifService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadObjectifs();
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
  getUserFromLocalStorage(): User | null {
    const userString = sessionStorage.getItem('auth-user');
    return userString ? JSON.parse(userString) : null;
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return parseInt(user.id, 10);
  }
  onSubmit(): void {
    const u = this.getUserFromLocalStorage();

    if (u) {
      const user: User = new User(
        this.getUserIdFromLocalStorage(),
        u.email!,
        u.username!,
        u.password!
      );
      this.newObjective.utilisateur = user;
      this.objectifService.createObjectif(this.newObjective).subscribe(
        (data) => {
          console.log('Objective added successfully:', data);
          this.router.navigate(['/objectif']);
        },

        (error) => {
          console.error('Error adding objective:', error);
        }
      );
    } else {
      console.error('User object is null.');
    }
  }
}
