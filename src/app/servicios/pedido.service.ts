import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPedido } from '../modelos/pedido.modelo';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  RealizarPedido():Observable<ModeloPedido[]>{
    return this.http.get<ModeloPedido[]>("http://localhost:3000/pedidos")}
}
