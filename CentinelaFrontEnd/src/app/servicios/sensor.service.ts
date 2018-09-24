import { Sensor } from '../modelos/sensor';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SensorService {

  public url: string;
  constructor(public _http: Http) {
    this.url = 'http://localhost:8080/ProyectoCentinela/controladores/sensores';
    //this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores';
  }

  obtenerSensores() {
    return this._http.get(this.url + '/listar').map(res => res.json());
  }

  obtenerSensor(id: number) {
    return this._http.get(this.url + '/obtener/' + id).map(res => res.json());
  }

  obtenerIdSensor(codigo: number) {
    return this._http.get(this.url + '/obtenerId/' + codigo).map(res => res.json());
  }  
  
  agregarSensor(sensor: Sensor) {
    return this._http.post(this.url + '/crear', sensor);
  }

  editarSensor(sensor: Sensor) {
    return this._http.put(this.url + '/editar', sensor);
  }

  borrarSensor(id: number) {
    return this._http.delete(this.url + '/borrar/' + id).map(res => res.json());
  }
}
