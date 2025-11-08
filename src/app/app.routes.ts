import { Routes } from '@angular/router';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { MainPageComponent } from './main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'menu', component: MenuPageComponent }
];
