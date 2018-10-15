import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { ApplicationPropertiesServiceProvider } from '../application-properties-service/application-properties-service';
import { Sensor } from '../../models/Sensor';

/*
  Generated class for the SensorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SensorServiceProvider {

  public sensores: Sensor[] = [];
  sensor : Sensor = new Sensor();
  public url : string;

  constructor(public http: HttpClient) {
    this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores';
    // this.url = 'https://104.248.230.8/ProyectoCentinela/controladores/sensores';
    console.log('Hello SensorServiceProvider Provider');
   }

  obtenerSensores() {
    return this.http.get(this.url + '/listar');
    // .subscribe((res : Sensor[]) => this.sensores = res);
  }

  obtenerSensor(id: number) {
    return this.http.get(this.url + '/obtener/' + id).subscribe((res : Sensor) => this.sensor = res);
  }

  // obtenerIdSensor(codigo: number) {
  //   return this.http.get(this.application + '/obtenerId/' + codigo).subscribe(res => res.json());
  // }  
  
  agregarSensor(sensor: Sensor) {
    return this.http.post(this.url + '/crear', sensor);
  }

  editarSensor(sensor: Sensor) {
    return this.http.put(this.url + '/editar', sensor);
  }

  borrarSensor(id: number) {
    return this.http.delete(this.url + '/borrar/' + id).subscribe(res => console.log(res));
  }

}
