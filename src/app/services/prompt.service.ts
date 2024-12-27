import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private userInputSubject: Subject<string> = new Subject<string>();
  modal: any;

  getUserInput() {
    return this.userInputSubject.asObservable();
  }

  registerModal(modal: any) {
    this.modal = modal
  }

  prompt(message: string): Promise<string> {
    return new Promise((resolve) => {
      
        this.modal.openModal();
        this.modal.message = message;
        this.modal.inputSubmitted.subscribe((input: string) => {
          this.userInputSubject.next(input);
          resolve(input);
        });
      }
    );
  }
}
