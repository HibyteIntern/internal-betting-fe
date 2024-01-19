import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login-alert',
  templateUrl: './login-alert.component.html',
  styleUrls: ['./login-alert.component.scss']
})
export class LoginAlertComponent {
  @Output() login = new EventEmitter<boolean>();
  @Output() cancel = new EventEmitter<boolean>();
}
