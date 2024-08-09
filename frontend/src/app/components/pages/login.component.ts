import { Component } from "@angular/core";
import { AuthService } from "../../services/authService"; 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  template: `
    <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
      <mat-card-title>Acceso miembros</mat-card-title>
      <mat-form-field class="example-full-width">
        <mat-label>Email:</mat-label>
        <input [(ngModel)]="logindata.email" matInput placeholder="Email" name="email" [ngModelOptions]="{standalone: true}" required email>
        <mat-error *ngIf="loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched">
          Please enter a valid email.
        </mat-error>
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Password:</mat-label>
        <input [(ngModel)]="logindata.password" matInput placeholder="Password" name="password" type="password" [ngModelOptions]="{standalone: true}" required minlength="6">
        <mat-error *ngIf="loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched">
          Password is required (minimum 6 characters).
        </mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">Enviar</button>
    </form>
  `,
  styles: `
    .example-full-width {
      width: 100%;
    }
  `
})
export class LoginComponent {
  logindata = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) {}

  login(form: NgForm) {
    if (form.valid) {
      this.auth.login(this.logindata);
    }
  }
}
