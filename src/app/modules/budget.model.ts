import { User } from './user.model';

export class Budget {
  id: number;
  mois: number;
  annee: number;
  utilisateur: User;

  constructor(id: number, mois: number, annee: number, utilisateur: User) {
    this.id = id;
    this.mois = mois;
    this.annee = annee;
    this.utilisateur = utilisateur;
  }
}
