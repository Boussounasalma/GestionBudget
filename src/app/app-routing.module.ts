import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CompteComponent } from './components/compte/compte.component';
import { AddModalComponent } from './components/compte/add-modal/add-modal.component';
import { UpdateCompteComponent } from './components/compte/update-compte/update-compte.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { AddRevenueComponent } from './components/revenue/add-revenue/add-revenue.component';
import { UpdateRevenueComponent } from './components/revenue/update-revenue/update-revenue.component';
import { DepenseComponent } from './components/depense/depense.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AddDepenseComponent } from './components/depense/add-depense/add-depense.component';
import { UpdateDepenseComponent } from './components/depense/update-depense/update-depense.component';
import { ObjectifComponent } from './components/objectif/objectif.component';
import { EpargneComponent } from './components/epargne/epargne.component';
import { AddObjectifComponent } from './components/objectif/add-objectif/add-objectif.component';
import { UpdateObjectifComponent } from './components/objectif/update-objectif/update-objectif.component';
import { AddEpargneComponent } from './components/epargne/add-epargne/add-epargne.component';
import { UpdateEpargneComponent } from './components/epargne/update-epargne/update-epargne.component';
import { ProfilComponent } from './components/profil/profil.component';
import { TransactionComponent } from './components/transaction/transaction.component';

// app-routing.module.ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'compte',
    component: CompteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-compte',
    component: AddModalComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-compte/:id',
    component: UpdateCompteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'revenue',
    component: RevenueComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-revenue',
    component: AddRevenueComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-revenue/:id',
    component: UpdateRevenueComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'categorie',
    component: CategorieComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'depense',
    component: DepenseComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-depense',
    component: AddDepenseComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-depense/:id',
    component: UpdateDepenseComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'objectif',
    component: ObjectifComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-objectif',
    component: AddObjectifComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-objectif/:id',
    component: UpdateObjectifComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'epargne',
    component: EpargneComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'add-epargne',
    component: AddEpargneComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'update-epargne/:id',
    component: UpdateEpargneComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
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
