import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  datosUsuarioEnSesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) {
    this.VerificarSesionActual();
   }

  Identificar(usuario: string, clave:string): Observable<ModeloIdentificar>{
    return this.http.post("http://localhost:3000/identificarPersona",{
      usuario: usuario,
      clave: clave
    },{
      headers: new HttpHeaders({

      })
    } )
  }

  RefrescarDatosSesion(datos: ModeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  VerificarSesionActual(){
    let datos = this.ObtenerInformacionSesion();
    if(datos){
      this.RefrescarDatosSesion(datos);
    }
  }
  
  SeHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  AlmacenarDatos(datos: ModeloIdentificar){
    datos.estaIdentificado = true;
    let datosString= JSON.stringify(datos);
    localStorage.setItem("datosSesion", datosString);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSesion(){
    let datosString= localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  ObtenerToken(){
    let datosString= localStorage.getItem("datosSesion");
    if(datosString){
      let datos= JSON.parse(datosString);
      return datos.tk;
    }else{
      return "";
    }
  }


  EliminarSesion(){
    this.RefrescarDatosSesion(new ModeloIdentificar());
    localStorage.removeItem("datosSesion");
  }

}
