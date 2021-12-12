import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealizarPedidoComponent } from './realizar-pedido/realizar-pedido.component';

const routes: Routes = [
  {
    path:"realizar-pedido",
    component: RealizarPedidoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
