import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  APIURL = 'http://localhost:7070/auth';
  userInfo: any;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router) {}

  get name(): any {
    return this.getFromLocalStorage('nombre');
  }

  get identificado(): boolean {
    return !!this.getFromLocalStorage('token');
  }

  login(logindata: any) {
    this.http.post<any[]>(this.APIURL + '/login', logindata).subscribe(res => {
      this.identificacion(res);
    });
  }

  logout() {
    localStorage.clear();
  }

  register(user: any) {
    delete user.cpassword;
    this.http.post<any[]>(this.APIURL + '/register', user).subscribe(
      res => {
        this.identificacion(res);
      },
      _error => {
        this.manejadorErrores('No se ha podido registrar el usuario');
      }
    );
  }

  identificacion(res: any) {
    this.userInfo = res;
    this.setToLocalStorage('token', this.userInfo.token);
    this.setToLocalStorage('nombre', this.userInfo.nombre);
    this.router.navigate(['/']);
  }

  private manejadorErrores(error: any) {
    this._snackBar.open(error, 'Cerrar', { duration: 2000 });
  }

  private getFromLocalStorage(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setToLocalStorage(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

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
