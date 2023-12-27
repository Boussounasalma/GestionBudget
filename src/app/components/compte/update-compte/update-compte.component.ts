import { Component } from '@angular/core';
import { User } from '../../../modules/user.model';
import { Compte } from '../../../modules/compte.model';
import { CompteService } from '../../../services/compte.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-compte',
  templateUrl: './update-compte.component.html',
  styleUrl: './update-compte.component.scss',
})
export class UpdateCompteComponent {
  user: User = new User(0, '', '', '');
  selectedCompte: Compte = { id: 0, nom: '', solde: 0, utilisateur: this.user };
  compteId!: number;
  constructor(
    private compteService: CompteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');

    this.route.params.subscribe((params) => {
      this.compteId = +params['id'];
      this.loadCompte(this.compteId);
    });
  }

  loadCompte(id: number): void {
    this.compteService.getCompteById(id).subscribe(
      (data) => {
        this.selectedCompte = data;
      },
      (error) => {
        console.error('Error loading compte', error);
      }
    );
  }

  updateCompte(): void {
    this.compteService.updateCompte(this.selectedCompte).subscribe(
      () => {
        console.log('Compte updated successfully');
        this.router.navigate(['/compte']);
      },
      (error) => {
        console.error('Error updating compte:', error);
      }
    );
  }
}
