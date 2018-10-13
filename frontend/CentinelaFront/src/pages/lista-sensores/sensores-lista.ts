import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { SensorDetallePage } from '../sensor-detalle/sensor-detalle';
import { Sensor } from '../../models/Sensor';
import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';

/**
 * Generated class for the ConcursanteListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sensores-lista',
  templateUrl: 'sensores-lista.html',
})

export class SensoresListaPage {

  sensores: Sensor[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sensorService: SensorServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SensoresListaPage');
    this.sensorService.obtenerSensores()
      .subscribe((respuesta: Sensor[]) => this.sensores = respuesta);
  }

  verDetalleSensor(sensor: Sensor) {
    this.navCtrl.push(SensorDetallePage,{sensorP : sensor})
      .catch((error: any) => {
        console.log(`Didn't set nav root: ${error}`);
      });
  }

}
