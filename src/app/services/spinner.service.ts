import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private isSpinning = false;

  constructor(private message: NzMessageService) {}

  showSpinner(): void {
    this.isSpinning = true;
    this.message.loading('Déconnexion en cours...', { nzDuration: 0 });
  }

  hideSpinner(): void {
    this.isSpinning = false;
    this.message.remove();
  }

  isSpinnerVisible(): boolean {
    return this.isSpinning;
  }
}
