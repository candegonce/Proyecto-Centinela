import { Medicion } from '../modelos/medicion';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicionService {

   public url: string;
  constructor(public _http: Http) {
    this.url = 'http://localhost:8080/ProyectoCentinela/controladores/mediciones';
    //this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/mediciones';
  }

  obtenerMediciones() {
    return this._http.get(this.url + '/listar').map(res => res.json());
  }

  obtenerMedicionesSensor(idSensor: number) {
    return this._http.get(this.url + '/medicionesSensor/' + idSensor).map(res => res.json());
  }

  obtenerMedicion(id: number) {
    return this._http.get(this.url + '/obtener/' + id).map(res => res.json());
  }

  agregarMedicion(medicion: Medicion) {
    return this._http.post(this.url + '/crear', medicion);
  }

  editarMedicion(medicion: Medicion) {
    return this._http.put(this.url + '/editar', medicion);
  }

  borrarMedicion(id: number) {
    return this._http.delete(this.url + '/borrar/' + id).map(res => res.json());
  }

}
