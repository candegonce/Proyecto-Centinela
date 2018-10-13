
import { Component } from '@angular/core';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';
import { Sensor } from '../../models/Sensor';
import { Ubicacion } from '../../models/ubicacion';

/**
 * Generated class for the MapaElementosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mapa-elementos',
  templateUrl: 'mapa-elementos.html'
})
export class MapaElementosComponent {

  sensores: Sensor[] = [];

  // ubicación para centrar el mapa
  ubicacion: Ubicacion = new Ubicacion();
  zoom: number= 15;

  constructor(public sensorService : SensorServiceProvider) {
    this.ubicacion.latitud = -34.9204948;
    this.ubicacion.longitud = -57.95356570000001;
    this.obtenerSensores();
    
  }


  obtenerSensores(){

  this.sensorService.obtenerSensores()
  .subscribe((respuesta: Sensor[]) => {this.sensores = respuesta; console.log(this.sensores);});
  }


}
