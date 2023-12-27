import { Component } from '@angular/core';
import { Compte } from '../../../modules/compte.model';
import { User } from '../../../modules/user.model';
import { CompteService } from '../../../services/compte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent {
  user: User = new User(0, '', '', '');
  newCompte: Compte = new Compte(0, '', 0, this.user);

  constructor(private compteService: CompteService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }
  addCompte(): void {
    const nomFromForm = this.newCompte.nom;
    const soldeFromForm = this.newCompte.solde;
    const compteToAdd: Compte = {
      id: generateUniqueId(),
      nom: nomFromForm,
      solde: soldeFromForm,
      utilisateur: this.user,
    };

    this.compteService.createCompte(compteToAdd).subscribe(
      (response) => {
        console.log('Compte added successfully on the server:', response);
        this.router.navigate(['/compte']);
      },
      (error) => {
        console.error('Error adding compte on the server:', error);
      }
    );
  }
}
function generateUniqueId(): number {
  return Math.floor(Math.random() * 1000);
}
