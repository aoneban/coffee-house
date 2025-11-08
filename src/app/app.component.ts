import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header></app-header>
    <router-outlet />
    <app-footer></app-footer>
  `,
  styles: '',
})
export class AppComponent {
  title = 'angular-coffee-house';
}
