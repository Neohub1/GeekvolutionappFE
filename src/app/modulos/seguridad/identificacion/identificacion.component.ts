import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import *as cryptoJS from 'crypto-js';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {


sitekey:string="";

  fgValidador: FormGroup = this.fb.group({
    'usuario':['',[Validators.required, Validators.email]],
    'clave': ['',[Validators.required]],
    'captcha':['',[Validators.required]]          
  })
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) {
      this.sitekey="6LcJ85MdAAAAAG8ctwWx7R1kNLaAf1rTO8KtNLYb";
     }

  ngOnInit(): void {
    
  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls['usuario'].value;
    let clave = this.fgValidador.controls['clave'].value;
    let claveCifrada= cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any)=>{
      //ok
      this.servicioSeguridad.AlmacenarDatos(datos);
      this.router.navigate(["/inicio"]);
    }, (error:any)=>{
      //ko
      alert("Usuario o contraseña no validos")
    })
  }
}
