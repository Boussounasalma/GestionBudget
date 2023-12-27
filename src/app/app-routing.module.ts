import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CompteComponent } from './components/compte/compte.component';
import { AddModalComponent } from './components/compte/add-modal/add-modal.component';
import { UpdateCompteComponent } from './components/compte/update-compte/update-compte.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { AddRevenueComponent } from './components/revenue/add-revenue/add-revenue.component';
import { UpdateRevenueComponent } from './components/revenue/update-revenue/update-revenue.component';

// app-routing.module.ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'add-compte', component: AddModalComponent },
  { path: 'update-compte/:id', component: UpdateCompteComponent },
  { path: 'revenue', component: RevenueComponent },
  { path: 'add-revenue', component: AddRevenueComponent },
  { path: 'update-revenue/:id', component: UpdateRevenueComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'board', component: BoardComponent, canActivate: [AuthGuardService] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}