import { User } from './user.model';

// revenue.model.ts
export class Objectif {
  id: number;
  titre: string;
  description: string;
  montantActuel: number;
  montantCible: number;
  dateLimite: Date;
  utilisateur: User;

  constructor(
    id: number,
    titre: string,
    description: string,
    montantActuel: number,
    montantCible: number,
    dateLimite: Date,
    utilisateur: User
  ) {
    this.id = id;
    this.titre = titre;
    this.montantActuel = montantActuel;
    this.montantCible = montantCible;
    this.dateLimite = dateLimite;
    this.utilisateur = utilisateur;
    this.description = description;
  }
}
