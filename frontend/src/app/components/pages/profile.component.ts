import { Component, OnInit } from "@angular/core";
import { WebService } from "../../services/web.service"; 

@Component({
  selector: 'profile',
  template: ` 
    <mat-card>
      <mat-card-content>
        <mat-card-title>Editar perfil</mat-card-title>
        <mat-form-field class="example-full-width">
          <mat-label>Nombre:</mat-label>
          <input [(ngModel)]="memberObj.nombre" matInput placeholder="Nombre">
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Email:</mat-label>
          <input [(ngModel)]="memberObj.email" matInput placeholder="Email">
        </mat-form-field>

        <mat-form-field class="example-full-width">
          <mat-label>Password:</mat-label>
          <input type="password" [(ngModel)]="memberObj.password" matInput placeholder="Contraseña">
        </mat-form-field>
        
        <button (click)="post()" mat-flat-button color="primary">Guardar</button>
      </mat-card-content>
    </mat-card>
  `
})

export class ProfileComponent implements OnInit {
  memberObj: Member = new Member();
  errorMessage: string = '';

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.webService.getUser().subscribe(
        (res: any) => {
            console.log('Response from getUser:', res);  
          if (res && typeof res === 'object') {
            this.memberObj.nombre = res.nombre || '';
            this.memberObj.email = res.email || '';
            this.memberObj.password = res.password || '';
          } else {
            console.error('Response is null or not an object.');
            // Handle the case where res is not valid
          }
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
          // Handle error, e.g., show a user-friendly message or retry logic
          this.errorMessage = 'Failed to fetch user data. Please try again later.';
        }
      );
      
      
  }

  post(){
    this.webService.saveUser(this.memberObj).subscribe();
    
  }
}

export class Member {
    nombre: string;
    email: string;
    password: string;

    constructor(){
        this.nombre = '';
        this.email = '';
        this.password = '';
    }
}