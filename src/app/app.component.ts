import { Component } from '@angular/core';
import { NonoteComponent } from "./nonote/nonote.component";
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from "./modal/modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    NonoteComponent,
    NavbarComponent,
    ModalComponent,
    
  ]
})
export class AppComponent {
  title = 'nonote';
}
