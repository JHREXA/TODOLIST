import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Correct import
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TareasComponent } from './components/pages/components.tareas'; 
import { NuevaTareaComponent } from './components/partials/nueva-tarea.component'; 
import { NavComponent } from './components/partials/nav.component';
import { HomeComponent } from './components/pages/home.component';
import { RegisterComponent } from './components/pages/register/register.component'; 
import { LoginComponent } from './components/pages/login.component'; 
import { ProfileComponent } from './components/pages/profile.component'; 

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
import { WebService } from './services/web.service';
import { AuthService } from './services/authService';

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
