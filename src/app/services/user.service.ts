import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const API_URL = 'http://localhost:8080/budget';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {}

  getPublicContent(): void {
    // this.router.navigate(['/home']);
  }

  getUserBoard(): void {
    //  this.router.navigate(['/board']);
  }
}
