import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'Inicio', component:InicioComponent},
  {path:'Home',component:HomeComponent},
  {path:'**',pathMatch:'full',redirectTo:'/Home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
