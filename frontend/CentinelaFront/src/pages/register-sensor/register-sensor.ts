import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';
import { Sensor } from '../../models/Sensor';
import { Ubicacion } from '../../models/ubicacion';

/**
 * Generated class for the RegisterSensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-sensor',
  templateUrl: 'register-sensor.html',
})
export class RegisterSensorPage {
  sensor = new Sensor();
  ubicacion = new Ubicacion();

  constructor(public navCtrl: NavController, public navParams: NavParams, public sensorService: SensorServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterSensorPage');
  }

  async register(sensor: Sensor,ubicacion: Ubicacion) {
    try {
      sensor.bateria = 100;
      sensor.estado ="ACTIVO";
      sensor.ubicacion = ubicacion;
      this.sensorService.agregarSensor(sensor)
        .subscribe(response => {
          console.log('Sensor creado correctamente:');
          alert('Sensor registrado correctamente.');
        },
          error => {
            console.log(<any>error);
            if (error.status == 409) {
              alert('Sensor ya existe...');
            }
          }
        )
    } catch (error) {
      console.error(error);
    }

  }

}
