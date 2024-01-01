import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from '../helpers/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardComponent } from './components/board/board.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CompteComponent } from './components/compte/compte.component';
import { AddModalComponent } from './components/compte/add-modal/add-modal.component';
import { UpdateCompteComponent } from './components/compte/update-compte/update-compte.component';
import { RevenueComponent } from './components/revenue/revenue.component';
import { AddRevenueComponent } from './components/revenue/add-revenue/add-revenue.component';
import { UpdateRevenueComponent } from './components/revenue/update-revenue/update-revenue.component';
import { DepenseComponent } from './components/depense/depense.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { AddDepenseComponent } from './components/depense/add-depense/add-depense.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UpdateDepenseComponent } from './components/depense/update-depense/update-depense.component';
import { ObjectifComponent } from './components/objectif/objectif.component';
import { EpargneComponent } from './components/epargne/epargne.component';
import { AddObjectifComponent } from './components/objectif/add-objectif/add-objectif.component';
import { UpdateObjectifComponent } from './components/objectif/update-objectif/update-objectif.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    BoardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    CompteComponent,
    AddModalComponent,
    UpdateCompteComponent,
    RevenueComponent,
    AddRevenueComponent,
    UpdateRevenueComponent,
    DepenseComponent,
    CategorieComponent,
    AddDepenseComponent,
    UpdateDepenseComponent,
    ObjectifComponent,
    EpargneComponent,
    AddObjectifComponent,
    UpdateObjectifComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
