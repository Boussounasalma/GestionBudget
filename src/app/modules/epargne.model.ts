import { Compte } from './compte.model';
import { Objectif } from './objectif.model';

// revenue.model.ts
export class Epargne {
  id: number;
  date: Date;
  montant: number;
  compte: Compte;
  objectif: Objectif;

  constructor(
    id: number,
    date: Date,
    montant: number,
    compte: Compte,
    objectif: Objectif
  ) {
    this.id = id;
    this.date = date;
    this.montant = montant;
    this.compte = compte;
    this.objectif = objectif;
  }
}
