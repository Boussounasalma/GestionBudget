import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compte } from '../../../modules/compte.model';
import { Categorie } from '../../../modules/categorie_depense.model';
import { CompteService } from '../../../services/compte.service';
import { CategorieService } from '../../../services/categorie.service';
import { Depense } from '../../../modules/depense.model';
import { DepenseService } from '../../../services/depense.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-depense',
  templateUrl: './add-depense.component.html',
  styleUrl: './add-depense.component.scss',
})
export class AddDepenseComponent {
  depenseForm: FormGroup = this.formBuilder.group({
    date: ['', Validators.required],
    montant: ['', Validators.required],
    compte: [null, Validators.required],
    libelle: ['', Validators.required],
    description: [''],
    categorie: [null, Validators.required],
  });

  comptes: Compte[] = [];
  categories: Categorie[] = [];
  datepickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private formBuilder: FormBuilder,
    private compteService: CompteService,
    private categorieService: CategorieService,
    private depenseService: DepenseService,
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
    this.loadUserCategories();
    this.loadUserAccounts();
  }

  private getUserIdFromLocalStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
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
  onSubmit() {
    if (this.depenseForm.valid) {
      const newDepense: Depense = {
        id: 0,
        date: this.depenseForm.value.date,
        montant: this.depenseForm.value.montant,
        compte: this.depenseForm.value.compte,
        libelle: this.depenseForm.value.libelle,
        description: this.depenseForm.value.description,
        categorie: this.depenseForm.value.categorie,
      };

      this.depenseService.addDepense(newDepense).subscribe(
        (addedDepense) => {
          console.log('Depense added successfully:', addedDepense);
          this.router.navigate(['/depense']);
        },
        (error) => {
          console.error('Error adding depense:', error);
        }
      );
    }
  }
}
