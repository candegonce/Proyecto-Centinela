import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HTTP } from "@ionic-native/http";

/*
  Generated class for the ConsultoriosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConsultoriosServiceProvider {

  
  headers : Headers = new Headers({'Content-type':'Application/json'});
  token : string = 'dXNlcl9ndWFyYW5pOjEyMzQ1Ng==';
  /* Está hardcodeado el usuario y contraseña en la url para probar, después ver como mando bien los headers */
  url : string = 'https://helmut-test.dat.cespi.unlp.edu.ar/api/helmut/';
  
  
  constructor(public httpClient: HttpClient, public http : HTTP) {
    console.log('Hello ConsultoriosServiceProvider Provider');
    this.headers.append('Authorization', 'Basic '+ this.token);
    this.headers.append('Accept', 'Application/json');

    let authorization = this.http.getBasicAuthHeader('user_guarani','123456');
    console.log(authorization);
    // this.http.setHeader(this.url, 'Authorization', Authorization);
  }

  obtenerConsultorios(): Observable<Consultorio[]>{
    return this.httpClient.post<Consultorio[]>(this.url + 'consultorios', {headers : this.headers});
  }

  // obtenerSensores() : Observable <Sensor[]>{
  //   this.http.get("http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores/listar", '', '')
  //   .then((data)=>{
  //     console.log(data.data);
  //     console.log(data.headers);
  //     console.log(data.status);
  //   })
  //   .catch(error =>{
  //     console.log(error.status);
  //     console.log(error.error); // error message as string
  //     console.log(error.headers);
  //   });
    
  //   return this.httpClient.get<Sensor[]>("http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores/listar");
  // }
}