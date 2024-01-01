import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../../modules/categorie_depense.model';
import { Compte } from '../../../modules/compte.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CompteService } from '../../../services/compte.service';
import { CategorieService } from '../../../services/categorie.service';
import { DepenseService } from '../../../services/depense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Depense } from '../../../modules/depense.model';

@Component({
  selector: 'app-update-depense',
  templateUrl: './update-depense.component.html',
  styleUrl: './update-depense.component.scss',
})
export class UpdateDepenseComponent {
  depenseForm: FormGroup = this.formBuilder.group({
    id: [''],
    date: ['', Validators.required],
    montant: ['', Validators.required],
    compte: ['', Validators.required],
    libelle: ['', Validators.required],
    description: [''],
    categorie: ['', Validators.required],
  });

  comptes: Compte[] = [];
  categories: Categorie[] = [];
  datepickerConfig: Partial<BsDatepickerConfig>;
  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private categorieService: CategorieService,
    private depenseService: DepenseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.datepickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY-MM-DD',
      }
    );
  }
  ngOnInit() {
    const depenseId = this.route.snapshot.params['id'];
    if (depenseId) {
      this.loadDepenseDetails(depenseId);
    }
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    console.log(userString);
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return parseInt(user.id, 10);
  }

  loadUserCategories() {
    const userId = this.getUserIdFromLocalStorage();

    this.categorieService
      .getCategorieByUserId(userId)
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  loadUserAccounts() {
    const userId = this.getUserIdFromLocalStorage();

    if (!isNaN(userId)) {
      this.compteService.getComptesByUserId(userId).subscribe((comptes) => {
        this.comptes = comptes;
      });
    } else {
      console.error('User ID not available or not logged in');
    }
  }

  loadDepenseDetails(depenseId: number) {
    this.depenseService.getDepenseById(depenseId).subscribe(
      (depense) => {
        this.depenseForm.patchValue({
          id: depense.id,
          date: depense.date,
          montant: depense.montant,
          compte: depense.compte,
          libelle: depense.libelle,
          description: depense.description,
          categorie: depense.categorie,
        });

        console.log(depense);
        this.loadUserCategories();
        this.loadUserAccounts();
      },
      (error) => {
        console.error('Error loading depense details:', error);
      }
    );
  }

  onUpdate() {
    if (this.depenseForm.valid) {
      const updatedDepense: Depense = {
        id: this.depenseForm.value.id,
        date: this.depenseForm.value.date,
        montant: this.depenseForm.value.montant,
        compte: this.depenseForm.value.compte,
        libelle: this.depenseForm.value.libelle,
        description: this.depenseForm.value.description,
        categorie: this.depenseForm.value.categorie,
      };
      console.log(updatedDepense);
      this.depenseService.updateDepense(updatedDepense).subscribe(
        (updatedDepense) => {
          console.log('Depense updated successfully:', updatedDepense);
          this.router.navigate(['/depense']);
        },
        (error) => {
          console.error('Error updating depense:', error);
        }
      );
    }
  }
}
