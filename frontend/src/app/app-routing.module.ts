import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home.component';
import { TareasComponent } from './components/pages/components.tareas'; 
import { RegisterComponent } from './components/pages/register/register.component'; 
import { LoginComponent } from './components/pages/login.component'; 
import { ProfileComponent } from './components/pages/profile.component'; 

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
