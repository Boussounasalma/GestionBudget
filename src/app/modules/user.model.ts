export class User {
  id: number;
  username: String;
  email: String;
  password: String;

  constructor(id: number, username: String, email: String, password: String) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
