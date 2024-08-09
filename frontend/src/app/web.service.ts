import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WebService {
  APIURL = 'http://localhost:7070/api';
  tareasDB: any[] = [];
  errorHttp!: boolean;
  tareasSujeto = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getTask(username: string) {
    username = username ? '/' + username : '';
    return this.http.get(this.APIURL + '/tareas' + username).subscribe({
        next: (res: any) => {this.tareasDB = res; },
        error: (res: Response) => {
            this.manejadorErrores('No se ha podido obtener tareas');
        }
    });
}

  async postTask(_tarea: any): Promise<void> {
    try {
      const respuesta = await this.http.post<any>(this.APIURL + '/tareas', _tarea);
      this.tareasDB.push(respuesta);
      this.tareasSujeto.next(this.tareasDB);
    } catch (error) {
      this.manejadorErrores('No se ha podido publicar tareas');
    }
  }

  getAllTasks() {
    return this.http.get<any[]>(this.APIURL + '/tareas').subscribe({
      next: (res) => {
        this.tareasDB = res;
        this.tareasSujeto.next(this.tareasDB);
      },
      error: (error) => {
        this.manejadorErrores('No se ha podido obtener todas las tareas');
      }
    });
  }

  getUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.get(this.APIURL + '/users/yop', { headers }).pipe(map(res => res));
      } else {
        this.manejadorErrores('No se encontró el token en el local storage');
        return of(null);
      }
    } else {
      this.manejadorErrores('No se puede acceder al local storage');
      return of(null);
    }
  }

  saveUser(usermodel: any): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + token
        });
        return this.http.post(this.APIURL + '/users/yop', usermodel, { headers }).pipe(map(res => res));
      } else {
        this.manejadorErrores('No se encontró el token en el local storage');
        return of(null);
      }
    } else {
      this.manejadorErrores('No se puede acceder al local storage');
      return of(null);
    }
  }

  private manejadorErrores(error: string) {
    this._snackBar.open(error, 'Cerrar', { duration: 2000 });
  }
}
