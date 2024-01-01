import { Component, OnInit } from '@angular/core';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'nc-layout-11', class: '' },
  { path: '/compte', title: 'Compte', icon: 'nc-bank', class: '' },
  {
    path: '/transactions',
    title: 'Transaction',
    icon: 'nc-vector',
    class: '',
  },
  { path: '/revenue', title: 'Revenu', icon: 'nc-money-coins', class: '' },
  { path: '/depense', title: 'Depense', icon: 'nc-credit-card', class: '' },
  { path: '/categorie', title: 'Categorie', icon: 'nc-tile-56', class: '' },
  { path: '/epargne', title: 'Epargne', icon: 'nc-tile-56', class: '' },

  {
    path: '/objectif',
    title: 'Objectif',
    icon: 'nc-bullet-list-67',
    class: '',
  },
  { path: '/user', title: 'Profil', icon: 'nc-single-02', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
}
