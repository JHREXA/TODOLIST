/* Ce code Angular définit un composant TareasComponent utilisé pour afficher une liste de tâches associées à un utilisateur spécifique, en utilisant Angular Material pour la mise en page. Voici un résumé de son fonctionnement :
    1 - Imports
    2 - Définition du Composant
    3 - Template HTML
    4- Logique du composant
    5- Fonctionnement  */
   
    //  1 - Imports
    /* 'Component', 'OnInit' sont importés depuis @angular/core pour déclarer le composant et implémenter l'interface OnInit. */
    import { Component, OnInit } from "@angular/core";
    /* 'WebService' est importé depuis './web.service' pour utiliser les méthodes définies dans le service.*/
    import { WebService } from "./web.service";
    /* 'ActivatedRoute', 'Params' sont importés depuis '@angular/router' pour accéder aux paramètres de l'URL. */
    import { ActivatedRoute, Params } from "@angular/router";

    //  2 - Définition du Composant
    // Le composant est nommé TareasComponent avec le sélecteur 'tareas'.
    @Component({
    selector: 'tareas',
    /* 3 - Template HTML 
        Utilise Angular Material (mat-card, mat-card-title, mat-card-content, routerLink) pour la mise en page et les composants UI.
        Utilise '*ngFor' pour boucler à travers 'tareasLista' et afficher chaque tâche dans un 'mat-card'.
        'routerLink' est utilisé pour créer des liens dynamiques vers les détails de chaque utilisateur basés sur le nom d'utilisateur 'tarea.usuario'.*/
    template: 
    ` <h1>Listado tareas</h1> 
        <mat-card *ngFor="let tarea of tareasLista">
                <mat-card-title [routerLink]="['/tareas', tarea.usuario]">{{tarea.usuario}}</mat-card-title>
                <mat-card-content>
                    {{tarea.trabajo}}
                </mat-card-content>
        </mat-card>`
    
    })
    
    /* 4- Logique du composant
         */
    export class TareasComponent implements OnInit{
    
    username: any;
    tareasLista: any;
    /* Dans le constructeur, WebService et ActivatedRoute sont injectés comme dépendances privées (private webservice: WebService, private rutaActiva: ActivatedRoute). */
    constructor(private webservice: WebService, private rutaActiva: ActivatedRoute){}

    ngOnInit(): void{
        /* 'username' est initialisé avec le paramètre d'URL username via 'this.rutaActiva.snapshot.params['username']' */ 
        this.username = (this.rutaActiva.snapshot.params['username']);
        /* Dans 'ngOnInit()', 'getTask()' du service webservice est appelé pour récupérer les tâches associées à username. */
        this.webservice.getTask(this.username);
        /* tareasSujeto.subscribe() écoute les mises à jour des tâches via webservice.tareasSujeto et met à jour tareasLista avec les nouvelles données. */
        this.webservice.tareasSujeto.subscribe(tareas => {
        this.tareasLista  = tareas;
        });

        this.webservice.getUser().subscribe();
        }
    }

    /* 5- Fonctionnement
        Lorsque le composant est initialisé (ngOnInit), il extrait le nom d'utilisateur de l'URL, récupère les tâches associées à ce nom d'utilisateur via le service, et écoute les mises à jour via 'tareasSujeto'.
        Chaque tâche est affichée dans un mat-card avec un lien cliquable vers les détails de l'utilisateur correspondant. */