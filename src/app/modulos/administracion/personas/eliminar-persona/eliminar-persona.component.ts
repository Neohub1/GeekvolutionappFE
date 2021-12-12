import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-eliminar-persona',
  templateUrl: './eliminar-persona.component.html',
  styleUrls: ['./eliminar-persona.component.css']
})
export class EliminarPersonaComponent implements OnInit {

  id:string="";
  constructor(private servicioPersona:PersonaService,
    private route:ActivatedRoute,
    private router:Router) { 
      this.id=this.route.snapshot.params["id"];
    }

  ngOnInit(): void {
    this.EliminarPersona();
    this.router.navigate(["/administracion/buscar-persona"]);
  }


  EliminarPersona(){
    this.servicioPersona.EliminarPersona(this.id).subscribe((datos:ModeloPersona)=>{
      alert("la persona se ha eliminado del registro!")
        this.router.navigate(["/administracion/buscar-persona"]);
    },(error:any)=>{
      alert("Error no se pudo eliminar!");
    })
  }
}
