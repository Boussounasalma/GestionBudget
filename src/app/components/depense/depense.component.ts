import { Component } from '@angular/core';
import { DepenseService } from '../../services/depense.service';
import { Depense } from '../../modules/depense.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depense',
  templateUrl: './depense.component.html',
  styleUrl: './depense.component.scss',
})
export class DepenseComponent {
  depenses: Depense[] = [];
  selectedDepenseId: number | null = null;
  isAddingOrEditing = false;

  constructor(private depenseService: DepenseService, private router: Router) {}

  ngOnInit(): void {
    this.loadDepenses();
  }

  loadDepenses() {
    this.depenseService.getAllDepenses().subscribe(
      (data) => {
        this.depenses = data;
      },
      (error) => {
        console.log('Erreur lors du chargement des dépenses', error);
      }
    );
  }

  goToAddDepense() {
    this.router.navigate(['/add-depense']);
  }
  editDepense(depense: Depense) {
    this.isAddingOrEditing = true;
    this.selectedDepenseId = depense.id;
    this.router.navigate([`/update-depense/${depense.id}`]);
  }

  deleteDepense(id: number) {
    this.depenseService.deleteDepense(id).subscribe(
      () => {
        console.log('Depense deleted successfully');
        this.loadDepenses();
      },
      (error) => {
        console.error('Error deleting depense', error);
      }
    );
  }
}
