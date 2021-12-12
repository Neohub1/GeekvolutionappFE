import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from './guardianes/validador-sesion.guard';
import { ErrorComponent } from './plantilla/error/error.component';
import { InicioComponent } from './plantilla/inicio/inicio.component';

const routes: Routes = [
  {
  path: "inicio",
  component: InicioComponent
  },
  {
    path: "",
    pathMatch:"full",
    redirectTo:"/inicio"
  },
  {
    path:"administracion",
    loadChildren:()=> import("./modulos/administracion/administracion.module").then(x=>x.AdministracionModule),
    canActivate:[ValidadorSesionGuard]
    
  },
  {
    path: "",
    pathMatch:"full",
    redirectTo:"/inicio"
  },
  {
    path:"pedidos",
    loadChildren:()=> import("./modulos/pedidos/pedidos.module").then(x=>x.PedidosModule),
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: "",
    pathMatch:"full",
    redirectTo:"/inicio"
  },

  {
    path:"seguridad",
    loadChildren:()=> import("./modulos/seguridad/seguridad.module").then(x=>x.SeguridadModule),
    canActivate:[ValidadorSesionGuard]
  },
  {
    path: "",
    pathMatch:"full",
    redirectTo:"/inicio"
  },
  {
    path:"**",
    component:ErrorComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
