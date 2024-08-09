/* Le 'AuthService' gère les opérations d'authentification telles que la connexion, la déconnexion et l'enregistrement des utilisateurs. Il utilise 'HttpClient' pour communiquer avec l'API backend, 'MatSnackBar' pour afficher les messages d'erreur, et 'Router' pour naviguer entre les pages. Les méthodes pour accéder et modifier le 'localStorage' sont encapsulées pour assurer leur disponibilité, et des méthodes supplémentaires gèrent les erreurs et stockent les informations utilisateur. 

1 - Importations
2 - Définition du Service
3 - Méthodes et Propriétés du Service
    3.1 - 'name'
    3.2 - 'identificado'
    3.3 - 'login()'
    3.4 - 'logout()'
    3.5 - 'register()
    3.6 - 'identificacion()'
   
4 - Méthodes privées
    4.1 - 'manejadorErrores()'
    4.2 - 'getFromLocalStorage()'
    4.3 - 'setToLocalStorage()'
    4.4 - 'isLocalStorageAvailable()'
*/

/* 1 - Importations */
// 'HttpClient' : Pour effectuer des requêtes HTTP.
import { HttpClient } from '@angular/common/http';
// 'Injectable' : Pour rendre ce service injectable dans d'autres composants ou services.
import { Injectable } from '@angular/core';
// 'MatSnackBar' : Pour afficher des messages temporaires (snack-bars) à l'utilisateur.
import { MatSnackBar } from '@angular/material/snack-bar';
// 'Router' : Pour naviguer entre les routes Angular.
import { Router } from '@angular/router';

/* 2 - Définition du Service */
// '@Injectable({ providedIn: 'root' })' : Rend ce service disponible à l'échelle de l'application.
@Injectable({ providedIn: 'root' })
export class AuthService {
  // 'APIURL' : URL de base de l'API d'authentification.  
  APIURL = 'http://localhost:7070/auth';
  // 'userInfo' : Stocke les informations de l'utilisateur authentifié.
  userInfo: any;
  // 'constructor' : Injecte 'HttpClient', 'MatSnackBar' et 'Router'.
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  /* 3 - Méthodes et Propriétés du Service */
  /* 3.1 - 'name' : Propriété qui retourne le nom de l'utilisateur à partir du localStorage. */
  get name(): any {
    return this.getFromLocalStorage('nombre');
  }
  
  /* 3.2 - 'identificado' : Propriété qui vérifie si un token est présent dans le localStorage, indiquant que l'utilisateur est identifié (connecté). */
  get identificado(): boolean {
    return !!this.getFromLocalStorage('token');
  }

  /* 3.3 - 'login()' : Méthode pour authentifier l'utilisateur.
        Envoie une requête POST à l'API de login avec les données de connexion.
        En cas de succès, appelle la méthode identificacion pour traiter la réponse. */
  login(logindata: any){
    this.http.post<any[]>(this.APIURL + '/login', logindata).subscribe(
        res => {
            this.identificacion(res);
        });     
  }
  /* 3.4 - 'logout()' : Méthode pour déconnecter l'utilisateur en effaçant le localStorage. */
  logout() {
    localStorage.clear();
  }
  /* 3.5 - 'register()' : Méthode pour enregistrer un nouvel utilisateur.
        Supprime le champ cpassword des données utilisateur.
        Envoie une requête POST à l'API de registre avec les données utilisateur.
        En cas de succès, appelle la méthode identificacion.
        En cas d'erreur, affiche un message d'erreur avec manejadorErrores. */
  register(user: any) {
    delete user.cpassword; // ?
    this.http.post<any[]>(this.APIURL + '/register', user).subscribe(
      res => {  
        this.identificacion(res);
      }, error => {
        this.manejadorErrores('No se ha podido registrar el usuario');
      }
    );
  }
  /* 3.6 - 'identificacion()' : Méthode pour traiter la réponse de l'API après une        connexion ou un enregistrement.
    Stocke les informations utilisateur dans userInfo.
    Enregistre le token et le nom de l'utilisateur dans le localStorage.
    Navigue vers la page d'accueil ('/'). */
  identificacion(res: any){
    this.userInfo = res;
    this.setToLocalStorage('token', this.userInfo.token);
    this.setToLocalStorage('nombre', this.userInfo.nombre);
    this.router.navigate(['/']);
  }
  /* 4.1 - 'manejadorErrores()' : Affiche un message d'erreur à l'utilisateur à l'aide de MatSnackBar. */
  private manejadorErrores(error: any) {
    this._snackBar.open(error, 'Cerrar', { duration: 2000 });
  }
  /* 4.2 - 'getFromLocalStorage()' : Récupère une valeur du localStorage si celui-ci est disponible. */
  private getFromLocalStorage(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /* 4.3 - 'setToLocalStorage()' : Enregistre une valeur dans le localStorage si celui-ci est disponible. */
  private setToLocalStorage(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }
  /* 4.4 - 'isLocalStorageAvailable()' : Vérifie si le localStorage est disponible en essayant de lire et d'écrire une clé de test. */
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
