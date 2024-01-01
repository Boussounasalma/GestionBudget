import { Categorie } from './categorie_depense.model';
import { Compte } from './compte.model';

// revenue.model.ts
export class Depense {
  id: number;
  date: string;
  montant: number;
  compte: Compte;
  libelle: string;
  description: string;
  categorie: Categorie;

  constructor(
    id: number,
    date: string,
    montant: number,
    compte: Compte,
    libelle: string,
    description: string,
    categorie: Categorie
  ) {
    this.id = id;
    this.date = date;
    this.montant = montant;
    this.compte = compte;
    this.libelle = libelle;
    this.description = description;
    this.categorie = categorie;
  }
}
