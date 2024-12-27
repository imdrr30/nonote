import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NonoteComponent } from '../nonote/nonote.component';
import { CommonModule } from '@angular/common';
import { TooltipService } from '../services/tooltip.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements AfterViewInit {


  @Input()
  nonote: NonoteComponent | undefined

  @ViewChild("navBar")
  navBar?: ElementRef
  constructor(private readonly tooltipService: TooltipService) {
  }

  public theme: string = localStorage.getItem("theme") ?? "light";

  mainKey(): string {
    return navigator.platform.includes('Mac') ? 'CMD' : 'Ctrl';
  }

  ngAfterViewInit(): void {
    this.switchTheme();
    this.tooltipService.initiatToolTip();
  }

  save(){
    this.nonote?.saveAsJson();
  }

  connectToCloud(){
    this.nonote?.connectToFirestore();
  }

  getCloudPath(){
    return window.location.href;
  }

  password(){
    this.nonote?.toggleAndChangePasswordProtection();
  }

  open(){
    this.nonote?.openFileDialog();
  }

  deleteNote(){
    this.nonote?.deleteCurrentNote();
  }

  toggleTheme(){
    this.theme = (this.theme=="light")? "dark": "light";
    localStorage.setItem("theme", this.theme);
    this.switchTheme();
  }

  switchTheme(){
    document.querySelector("html")?.setAttribute("data-bs-theme", this.theme)
    this.navBar?.nativeElement.setAttribute("class",`navbar navbar-expand-lg navbar-${this.theme} bg-${this.theme} fixed-top`)
  }
}
