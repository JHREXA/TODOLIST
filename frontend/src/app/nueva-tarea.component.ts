/* Ce code Angular définit un composant NuevaTareaComponent utilisé pour ajouter une nouvelle tâche via une interface utilisateur. Voici un résumé de son fonctionnement :

1. Imports
2. Template HTML
3. Logique du Composant
4. Fonctionnement
*/

/* 1. Imports*/
/*Component est importé depuis '@angular/core' pour déclarer le composant Angular.*/
import { Component } from "@angular/core";
/* WebService est importé depuis './web.service' pour utiliser les méthodes de service définies.  */
import { WebService } from "./web.service";
import { AuthService } from "./authService";


@Component({
  selector: 'nueva-tarea',
  /* 2. Template HTML 
        Utilise le module Angular Material (mat-card, mat-card-content, mat-form-field, mat-label, mat-input, mat-card-title, mat-flat-button) pour la mise en page et les composants UI.
        Les champs de formulaire pour saisir le nom d'utilisateur (tarea.usuario) et la description de la tâche (tarea.trabajo) sont liés à la propriété tarea via [(ngModel)].
        Un bouton "Envoyer" (<button (click)="post()" mat-flat-button color="primary">Enviar</button>) déclenche la méthode post() lorsqu'il est cliqué.*/
  template: ` 
      <mat-card>
        <mat-card-content>
            <mat-card-title>Añadir tarea</mat-card-title>
                <mat-form-field class="example-full-width">
                    <mat-label>Nombre usuario:</mat-label>
                    <input [(ngModel)]="tarea.usuario" matInput placeholder="username">
                </mat-form-field>

                <mat-form-field class="example-full-width">
                    <mat-label>Tarea:</mat-label>
                    <textarea [(ngModel)]="tarea.trabajo" matInput placeholder="Introduzca su tarea"></textarea>
                </mat-form-field>
             <button (click)="post()" mat-flat-button color="primary">Enviar</button>
        </mat-card-content>
     </mat-card>`

})

/* 3. Logique du Composant
    Dans le constructeur, WebService est injecté en tant que dépendance privée (private webservice: WebService).
    'tarea' est initialisé comme un objet avec deux propriétés vides (trabajo et usuario).
    'post()' appelle la méthode 'postTask()' du service webservice, en passant l'objet 'tarea' pour ajouter une nouvelle tâche. */
export class NuevaTareaComponent{

  constructor(private webservice: WebService, private auth: AuthService){}
   
  tarea = {trabajo: '', usuario: this.auth.name};
  post(){
    this.webservice.postTask(this.tarea);
  }

}

/* 4. Fonctionnement 
L'utilisateur remplit les champs et clique sur "Envoyer".
Les données saisies 'tarea' sont envoyées au service 'WebService' via 'postTask()'.
Ce service peut gérer la logique d'envoi des données au serveur, comme l'ajout de la tâche dans une base de données.*/