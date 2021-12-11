import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {

  id:string="";

  constructor(private servicioProducto:ProductoService,
    private route:ActivatedRoute,
    private router:Router) {
      this.id=this.route.snapshot.params["id"];
      
     }

  ngOnInit(): void {
    this.EliminarProducto();
    this.router.navigate(["/administracion/buscar-producto"]);

  }

  EliminarProducto(){
    this.servicioProducto.EliminarProducto(this.id).subscribe((datos:ModeloProducto)=>{
      alert("el Producto se ha eliminado!")
      this.router.navigate(["/administracion/buscar-producto"]);
    },(error:any)=>{
      alert("Error no se pudo eliminar!");
    })
  }

}
