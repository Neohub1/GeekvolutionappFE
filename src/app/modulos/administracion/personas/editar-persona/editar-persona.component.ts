import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

  fgValidador:FormGroup=this.fb.group({
    'nombre':["",[Validators.required]],
    'apellidos':["",[Validators.required]],
    'correo':["",[Validators.required]],
    'celular':["",[Validators.required]],
    'id':["",[Validators.required]],

    })

  id:string="";
  constructor(private fb:FormBuilder, 
    private route: ActivatedRoute,
    private servicioPersona:PersonaService,
    private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarPersona();
  }
  BuscarPersona(){
      this.servicioPersona.ConsultarPersonaPorId(this.id).subscribe((datos:ModeloPersona)=>{
        this.fgValidador.controls["nombre"].setValue(datos.nombres);
        this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
        this.fgValidador.controls["correo"].setValue(datos.correo);
        this.fgValidador.controls["celular"].setValue(datos.celular);
        this.fgValidador.controls["id"].setValue(datos.id);
        
      },(error:any)=>{
        alert("el producto no se registro!")
      })
  }

  EditarPersona(){
    let nombre= this.fgValidador.controls['nombre'].value;
    let apellidos= this.fgValidador.controls['apellidos'].value;
    let correo= this.fgValidador.controls['correo'].value;
    let celular= this.fgValidador.controls['celular'].value;

    let p= new ModeloPersona();
      p.nombres=nombre;
      p.apellidos=apellidos;
      p.correo=correo;
      p.celular=celular;
      
      p.id=this.id;
    

    this.servicioPersona.EditarPersona(p).subscribe((datos:ModeloPersona)=>{
      alert ("La persona ha sido editada");
      this.router.navigate(["/administracion/buscar-persona"]);
    },(error:any)=>{
      alert("Error en la edición de la persona");
    })
  }
}


