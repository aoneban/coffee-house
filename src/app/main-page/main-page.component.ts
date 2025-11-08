import { Component } from '@angular/core';
import { EnjoyComponent } from './enjoy/enjoy.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AboutComponent } from './about/about.component';
import { MobileComponent } from './mobile/mobile.component';

@Component({
  selector: 'app-main-page',
  imports: [EnjoyComponent, FavoritesComponent, AboutComponent, MobileComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
