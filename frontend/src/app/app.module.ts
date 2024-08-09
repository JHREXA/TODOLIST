import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Correct import
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareasComponent } from './components.tareas';
import { NuevaTareaComponent } from './nueva-tarea.component';
import { NavComponent } from './nav.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebService } from './web.service';
import { AuthService } from './authService';

@NgModule({
  declarations: [
    AppComponent,
    TareasComponent,
    NuevaTareaComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()), // Correctly use withFetch
    CookieService, // Provide CookieService
    WebService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
