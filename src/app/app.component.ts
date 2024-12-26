import { Component } from '@angular/core';
import { NonoteComponent } from "./nonote/nonote.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [NonoteComponent]
})
export class AppComponent {
  title = 'nonote';
}
