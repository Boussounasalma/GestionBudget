import { User } from './user.model';

export class Compte {
  id: number;
  nom: string;
  solde: number;
  utilisateur: User;

  constructor(id: number, nom: string, solde: number, utilisateur: User) {
    this.id = id;
    this.nom = nom;
    this.solde = solde;
    this.utilisateur = utilisateur;
  }
}
