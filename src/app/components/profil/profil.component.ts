import { Component } from '@angular/core';
import { User } from '../../modules/user.model';
import { ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  user: User = { id: 0, username: '', email: '', password: '' };
  updatedUser: User = { id: 0, username: '', email: '', password: '' };
  isEditMode = false;

  constructor(private profilService: ProfilService) {}

  private getUserIdFromSessionStorage(): number {
    const userString = sessionStorage.getItem('auth-user');
    let user;
    if (userString) {
      user = JSON.parse(userString);
    }
    return user ? user.id : 0;
  }

  ngOnInit(): void {
    this.getUserIdFromSessionStorage();
    this.loadUserInfo();
  }

  loadUserInfo() {
    const userId = this.getUserIdFromSessionStorage();
    this.profilService.getUserById(userId).subscribe(
      (userData: User) => {
        this.user = userData;
        this.updatedUser = { ...userData };
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  enterEditMode(): void {
    this.isEditMode = true;
  }

  updateUser(): void {
    this.profilService.updateUser(this.updatedUser).subscribe(
      () => {
        this.isEditMode = false;
        this.loadUserInfo();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  cancelEditMode(): void {
    this.updatedUser = { ...this.user };
    this.isEditMode = false;
  }

  isValidForm(): boolean {
    return (
      this.updatedUser.username.trim().length > 0 &&
      this.updatedUser.email.trim().length > 0
    );
  }
}
