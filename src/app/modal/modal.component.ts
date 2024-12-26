import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PromptService } from '../prompt.service';
declare var bootstrap: any;

@Component({
  selector: 'app-modal',
  imports: [FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  userInput: string = '';
  message: string = '';
  @Output() inputSubmitted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private readonly promptService: PromptService) {}

  openModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('inputModal')!);
    modal.show();
  }

  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('inputModal')!);
    modal.hide();
    this.userInput = '';
  }

  ngOnInit(): void {
    this.promptService.registerModal(this);
  }

  submitInput(): void {
    this.inputSubmitted.emit(this.userInput);
    this.closeModal();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.submitInput();
    }
  }
}
