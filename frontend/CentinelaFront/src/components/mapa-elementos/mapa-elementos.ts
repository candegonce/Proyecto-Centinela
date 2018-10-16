/* global google */
import { Component, Output, EventEmitter, Input } from '@angular/core';
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

  /* Cuando se invoca la componente se puede enviar [seleccionHabilitada]="true" o "false" para que el mapa
  permita colocar marcador o no */
  @Input() seleccionHabilitada: boolean;

  ubicacion: Ubicacion = new Ubicacion();
  ubicacionSeleccion: Ubicacion = new Ubicacion();

  /* Esto es para que emita las coordenadas al componente padre */
  @Output() emisorDeEvento: EventEmitter<Ubicacion> = new EventEmitter<Ubicacion>();

  // ubicación para centrar el mapa
  zoom: number = 15;

  constructor(public sensorService: SensorServiceProvider) {

    // configuro la posición inicial
    this.ubicacion.latitud = -34.9204948;
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


  ubicacionSeleccionada(event) {
    // capaz tengo que cambiar acá de tipo antes de emitirlo
    this.ubicacionSeleccion.latitud = Number(event.coords.lat);
    this.ubicacionSeleccion.longitud = Number(event.coords.lng);
    this.emisorDeEvento.emit(this.ubicacionSeleccion);
  }

}
