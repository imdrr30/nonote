import { Component, Input } from '@angular/core';
import { NonoteComponent } from '../nonote/nonote.component';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {


  @Input()
  nonote: NonoteComponent | undefined

  ngOnInit(){
    // Initialize all tooltips on page load
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  save(){
    this.nonote?.saveAsJson();
  }

  password(){
    this.nonote?.toggleAndChangePasswordProtection();
  }

  open(){
    this.nonote?.openFileDialog();
  }
}
