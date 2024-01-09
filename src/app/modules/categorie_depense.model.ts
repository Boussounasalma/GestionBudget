import { User } from './user.model';

export class Categorie {
  id: number;
  nom: string;
  user: User;

  constructor(id: number, nom: string, user: User) {
    this.id = id;
    this.nom = nom;
    this.user = user;
  }
}
