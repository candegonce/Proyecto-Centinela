import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medicion } from '../../models/medicion';

/*
  Generated class for the MedicionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedicionServiceProvider {

  url : string = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/mediciones';
  // url : string = 'https://104.248.230.8/ProyectoCentinela/controladores/mediciones'

  constructor(public http: HttpClient) {
    console.log('Hello MedicionServiceProvider Provider');
  }

  obtenerMediciones() {
    return this.http.get(this.url + '/listar');
  }

  obtenerMedicionesSensor(idSensor: number) {
    return this.http.get(this.url + '/medicionesSensor/' + idSensor);
  }

  obtenerMedicion(id: number) {
    return this.http.get(this.url + '/obtener/' + id);
  }

  agregarMedicion(medicion: Medicion) {
    return this.http.post(this.url + '/crear', medicion);
  }

  editarMedicion(medicion: Medicion) {
    return this.http.put(this.url + '/editar', medicion);
  }

  borrarMedicion(id: number) {
    return this.http.delete(this.url + '/borrar/' + id);
  }

}
