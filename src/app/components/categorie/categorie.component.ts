import { Component } from '@angular/core';
import { Categorie } from '../../modules/categorie_depense.model';
import { CategorieService } from '../../services/categorie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../modules/user.model';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss'],
})
export class CategorieComponent {
  categories: Categorie[] = [];
  isAddingOrEditing = false;
  selectedCategoryId: number | null = null;
  user: User = new User(0, '', '', '');
  newCategorie: Categorie = new Categorie(0, '', this.user);
  newCategorieForm: FormGroup;

  constructor(
    private categorieService: CategorieService,
    private formBuilder: FormBuilder
  ) {
    this.newCategorieForm = this.formBuilder.group({
      nom: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.loadCategories();
    this.user = JSON.parse(sessionStorage.getItem('auth-user') || '{}');
  }

  loadCategories() {
    this.categorieService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.log('Erreur lors du chargement des catégories', error);
      }
    );
  }

  resetForm() {
    this.newCategorieForm.reset();
    this.selectedCategoryId = null;
  }

  toggleAddingOrEditing() {
    this.isAddingOrEditing = !this.isAddingOrEditing;
    this.resetForm();
  }
  addCategorie() {
    const newCategorie: Categorie = {
      id: 0,
      nom: this.newCategorieForm.value.nom,
      user: this.user,
    };
    console.log(newCategorie);
    this.categorieService.createCategorie(newCategorie).subscribe(
      () => {
        this.loadCategories();
        this.toggleAddingOrEditing();
      },
      (error) => {
        console.log("Erreur lors de l'ajout de la catégorie", error);
      }
    );
  }

  editCategorie(categorie: Categorie) {
    this.isAddingOrEditing = true;
    this.selectedCategoryId = categorie.id;
    this.newCategorieForm.setValue({
      nom: categorie.nom,
    });
  }

  updateCategorie() {
    const updatedCategorie: Categorie = {
      id: this.selectedCategoryId || 0,
      nom: this.newCategorieForm.value.nom,
      user: this.user,
    };

    this.categorieService.updateCategorie(updatedCategorie).subscribe(
      () => {
        this.loadCategories();
        this.toggleAddingOrEditing();
      },
      (error) => {
        console.log('Erreur lors de la mise à jour de la catégorie', error);
      }
    );
  }

  deleteCategorie(id: number) {
    this.categorieService.deleteCategorie(id).subscribe(
      () => {
        this.loadCategories();
      },
      (error) => {
        console.log('Erreur lors de la suppression de la catégorie', error);
      }
    );
  }
}
