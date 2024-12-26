import { Component } from '@angular/core';
import { NonoteComponent } from "./nonote/nonote.component";
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NonoteComponent, NavbarComponent]
})
export class AppComponent {
  title = 'nonote';
}
