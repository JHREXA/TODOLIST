import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TareasComponent } from './components.tareas';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{
    path: '',
    component: HomeComponent
},
{
    path: 'tareas',
    component: TareasComponent,
},   
{
     path: ':tareas/:username',
    component: TareasComponent
},

{
   path: 'register',
   component: RegisterComponent
},

{
    path: 'login',
    component: LoginComponent
 },

 {
    path: 'profile',
    component: ProfileComponent

 }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
