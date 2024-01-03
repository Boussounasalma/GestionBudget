import { Budget } from './budget.model';
import { Categorie } from './categorie_depense.model';

export class BudgetCategorie {
  id: number;
  categorie: Categorie;
  budget: Budget;
  montantMensuel: number;
  montantDepense: number;

  constructor(
    id: number,
    categorie: Categorie,
    budget: Budget,
    montantMensuel: number,
    montantDepense: number
  ) {
    this.id = id;
    this.categorie = categorie;
    this.budget = budget;
    this.montantMensuel = montantMensuel;
    this.montantDepense = montantDepense;
  }
}
