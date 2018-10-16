/* global google */
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
  zoom: number = 15;

  constructor(public sensorService: SensorServiceProvider) {

    // configuro la posición inicial
    this.ubicacion.latitud= -34.9204948;
    this.ubicacion.longitud = -57.95356570000001;

    // esto representa uno de los sensores leídos desde la base de datos
    let sensorHardcodeado = new Sensor();
    sensorHardcodeado.estado = "Activo";
    sensorHardcodeado.codigo = 582396;
    sensorHardcodeado.bateria = 98;
    sensorHardcodeado.nombreSensor = "Sensor AF231";
    let latString = "-34.9204948";
    let longString = "-57.95356570000001";
    sensorHardcodeado.ubicacion.latitud = parseFloat(latString);
    sensorHardcodeado.ubicacion.longitud = parseFloat(longString);
    this.sensores.push(sensorHardcodeado);
    // this.obtenerSensores(); --> Descomentar
    console.log(this.sensores);
  }


  obtenerSensores() {

    this.sensorService.obtenerSensores()
      .subscribe((respuesta: Sensor[]) => { this.sensores = respuesta; console.log(this.sensores); });
  }


}
