import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sensor } from '../../models/Sensor';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';
import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';

/**
 * Generated class for the MisSensoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-sensores',
  templateUrl: 'mis-sensores.html',
})
export class MisSensoresPage {

 
  sensores: Sensor[] = [];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private sensorService: SensorServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSensoresPage');
    // this.sensorService.obtenerSensores()
    //   .subscribe((respuesta: Sensor[]) => this.sensores = respuesta);
    
    console.log(localStorage.getItem('sensoresDelUsuario')); // esto se carga cuando se loguea, aunque debería ser un servicio...yo lo cargo sin localstorage
    // la onda sería hacer obtenerSensores(idUsuarioLogueado)
    this.sensores = (JSON.parse(localStorage.getItem('sensoresDelUsuario')));
  }

  verDetalleSensor(sensor: Sensor) {
    this.navCtrl.push(SensorDetallePage,{sensorP : sensor})
      .catch((error: any) => {
        console.log(`Didn't set nav root: ${error}`);
      });
  }

}
