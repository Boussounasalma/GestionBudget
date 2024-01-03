import { Compte } from './compte.model';

// revenue.model.ts
export class Revenue {
  id: number;
  date: Date;
  montant: number;
  compte: Compte;
  sourceRevenu: string;
  categorie: string;

  constructor(
    id: number,
    date: Date,
    montant: number,
    compte: Compte,
    sourceRevenu: string,
    categorie: string
  ) {
    this.id = id;
    this.date = date;
    this.montant = montant;
    this.compte = compte;
    this.sourceRevenu = sourceRevenu;
    this.categorie = categorie;
  }
}
