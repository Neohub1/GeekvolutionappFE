import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { AdministracionService } from 'src/app/servicios/administracion.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  fgCreacion: FormGroup = this.fb.group({
    'nombre': ["",[Validators.required]],
    'apellidos': ["",[Validators.required]],
    'correo': ["",[Validators.required, Validators.email]],
    'celular': ["",[Validators.required]],
  })
  constructor(private fb: FormBuilder,
    private servicioAdministracion:AdministracionService,
    private servicioPersona:PersonaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  CrearUsuario(){
    let nombre= this.fgCreacion.controls['nombre'].value;
    let apellidos= this.fgCreacion.controls['apellidos'].value;
    let correo= this.fgCreacion.controls['correo'].value;
    let celular= this.fgCreacion.controls['celular'].value;

    let p= new ModeloPersona();
    p.nombres=nombre;
    p.apellidos=apellidos;
    p.correo=correo;
    p.celular=celular;

    this.servicioAdministracion.Creacion(nombre, apellidos,correo,celular),
    this.servicioPersona.CrearPersona(p).subscribe((datos:ModeloPersona): void=>{
      alert("Registro almacenado!!!");
      this.router.navigate(["/administracion/buscar-persona"])
    }, (error:any)=>{
      alert("error en el registro y almacenamiento!")
    })
  }

}
