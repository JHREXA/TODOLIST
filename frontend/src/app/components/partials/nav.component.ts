/* Le composant NavComponent implémente une barre de navigation avec un menu déroulant et des liens vers différentes sections de l'application. Il utilise le service d'authentification pour gérer l'état de connexion de l'utilisateur, afficher le nom de l'utilisateur connecté, et permettre la déconnexion. Ce composant combine les fonctionnalités d'Angular Material pour le style et les interactions utilisateur avec la logique d'authentification fournie par AuthService.

1 - Importations
2 - Définition du Composant
3 - Classe 'NavComponent'
*/

/* 1 - Importations */
// 'Component' : Module Angular pour définir les composants.
// 'OnInit' : Interface Angular qui permet d'implémenter la méthode ngOnInit.
import { Component, OnInit} from "@angular/core";
// 'AuthService' : Service d'authentification importé pour gérer les actions liées à l'utilisateur, comme la connexion et la déconnexion.
import { AuthService } from "../../services/authService"; 


/* 2 - Définition du Composant */
@Component({
  // 'selector' : Le sélecteur HTML pour ce composant, nav.
  selector: 'nav',
  // 'template' : Le template HTML inline pour ce composant.
  template: `
             <mat-toolbar color="primary"> 
                    To do List 
                <button mat-icon-button [matMenuTriggerFor]="menu" aria-label="Example icon-button with a menu">
                <mat-icon>more_vert</mat-icon>
                </button>
                    <mat-menu #menu="matMenu">
                    <button mat-menu-item routerLink="/">
                        <mat-icon>home</mat-icon>
                        <span>Inicio</span>
                </button>
                <button mat-menu-item routerLink="/tareas">
                    <mat-icon>assignment_turned_in</mat-icon>
                    <span>Tareas</span>
                </button>
                <button mat-menu-item routerLink="/login">
                    <mat-icon>assignment_ind</mat-icon>
                    <span>Identificarse</span>
                </button>
                <button mat-menu-item routerLink="/register">
                    <mat-icon>assignment_ind</mat-icon>
                    <span>Registrarse</span>
                </button>
                <button mat-menu-item routerLink="/" (click)="logout()">
                    <mat-icon>highlight_off</mat-icon>
                    <span>Cerrar</span>
                </button>
                </mat-menu>
                <span style="flex: 1 1 auto"></span>
                <span *ngIf="ident" style="cursor:pointer" routerLink="/profile" > Bienvenido {{name}}</span>
            </mat-toolbar>`,
            // 'styles' : Les styles CSS spécifiques à ce composant (vide dans ce cas).
            styles: ''
             

})
/* 3 - Classe 'NavComponent' */
export class NavComponent implements OnInit{
  // Proriétés
  // 'name' : Stocke le nom de l'utilisateur.
  name!: string;
  // ident : Indique si l'utilisateur est identifié (connecté).
  ident!: boolean;
  
  // 'constructor(private auth: AuthService)' : Le constructeur injecte le service d'authentification AuthService.
  constructor(private auth: AuthService){ }

  /* 'ngOnInit()' : Méthode de cycle de vie Angular qui est appelée après l'initialisation du composant.
  Initialise 'name' et 'ident' avec les valeurs du service d'authentification. */
  ngOnInit(): void {
    this.name = this.auth.name;
    this.ident = this.auth.identificado;
  }
  // logout() : Méthode pour déconnecter l'utilisateur en appelant 'logout()' du service d'authentification.
  logout(){
    this.auth.logout();
  }

}