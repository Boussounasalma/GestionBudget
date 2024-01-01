import { Compte } from './compte.model';
import { User } from './user.model';

// revenue.model.ts
export class Transaction {
  id: number;
  date: Date;
  montant: number;
  compte: Compte;
  TYPE: string;

  constructor(
    id: number,
    date: Date,
    montant: number,
    compte: Compte,
    TYPE: string
  ) {
    this.id = id;
    this.date = date;
    this.montant = montant;
    this.compte = compte;
    this.TYPE = TYPE;
  }
}
