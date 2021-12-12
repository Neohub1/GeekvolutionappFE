import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  fgValidador:FormGroup=this.fb.group({
    'nombre':["",[Validators.required]],
    'precio':["",[Validators.required]],
    'imagen':["",[Validators.required]],
    'id':["",[Validators.required]],

    })


  id:string="";
  constructor( private fb:FormBuilder, 
    private route: ActivatedRoute,
    private servicioProducto:ProductoService,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarProducto();
  }

  BuscarProducto(){
      this.servicioProducto.ConsultarProductoPorId(this.id).subscribe((datos:ModeloProducto)=>{
        this.fgValidador.controls["nombre"].setValue(datos.nombre);
        this.fgValidador.controls["precio"].setValue(datos.precio);
        this.fgValidador.controls["imagen"].setValue(datos.imagen);
        this.fgValidador.controls["id"].setValue(datos.id);
        
      },(error:any)=>{
        alert("el producto no se registro!")
      })
  }

  EditarProducto(){
    let nombre= this.fgValidador.controls['nombre'].value;
    let precio= parseInt(this.fgValidador.controls['precio'].value);
    let imagen= this.fgValidador.controls['imagen'].value;

    let p= new ModeloProducto();
      p.nombre=nombre;
      p.precio=precio;
      p.imagen=imagen;
      p.id=this.id;
    

    this.servicioProducto.EditarProducto(p).subscribe((datos:ModeloProducto)=>{
      alert ("El producto ha sido editado");
      this.router.navigate(["/administracion/buscar-producto"]);
    },(error:any)=>{
      alert("Error en la edición del producto");
    })
  }
}
