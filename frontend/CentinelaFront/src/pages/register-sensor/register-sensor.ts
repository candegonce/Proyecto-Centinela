/* global google */
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, ToastController } from "ionic-angular";

import { SensorServiceProvider } from "../../providers/sensor-service/sensor-service";
import { Sensor } from "../../models/Sensor";
import { Ubicacion } from "../../models/ubicacion";
import { MapaElementosComponent } from "../../components/mapa-elementos/mapa-elementos";

/**
 * Generated class for the RegisterSensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register-sensor",
  templateUrl: "register-sensor.html"
})
export class RegisterSensorPage {
  sensor :Sensor = new Sensor();
  ubicacion : Ubicacion = new Ubicacion();

    /* De esta manera voy a poder obtener los cambios que realiza el componente hijo que tiene el mapa */
    @ViewChild('mapaHijo') mapaHijo: MapaElementosComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sensorService: SensorServiceProvider,
    private toast: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterSensorPage");
    this.mapaHijo.seleccionHabilitada = true;
    this.mapaHijo.emisorDeEvento.subscribe(res => {
      this.ubicacion.latitud = res.latitud;
      this.ubicacion.longitud = res.longitud;
      console.log("Latitud" + this.ubicacion.latitud + " longitud " + this.ubicacion.longitud);
      
    });
  }

  // async register(s: Sensor, u: Ubicacion) {
  //   try {
  //     s.bateria = 100;
  //     s.estado = "ACTIVO";
  //     //pongo valores por defecto en las coordenadas
  //     u.latitud = -34.9204948;
  //     u.longitud = -57.95356570000001;

  //     s.ubicacion = u;
  //     console.log(s);
  //     this.sensorService.agregarSensor(s).subscribe(
  //       response => {
  //         console.log("Sensor creado correctamente:");
  //         this.toast
  //           .create({
  //             message: `${s.nombreSensor} registrado correctamente.`,
  //             duration: 5000
  //           })
  //           .present();
  //       },
  //       error => {
  //         console.log(<any>error);
  //         this.toast
  //           .create({
  //             message: `Sensor con código ${s.codigo} ya existe.`,
  //             duration: 5000
  //           })
  //           .present();
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  
 register(){

  this.sensor.ubicacion.latitud = this.ubicacion.latitud;
  this.sensor.ubicacion.longitud = this.ubicacion.longitud;
  this.sensor.bateria = 100;
  this.sensor.estado = "ACTIVO";

  console.log(this.sensor);
  
  this.sensorService.agregarSensor(this.sensor).subscribe(
    response => {
      console.log("Sensor creado correctamente:");
      this.toast
        .create({
          message: `${this.sensor.nombreSensor} registrado correctamente.`,
          duration: 5000
        })
        .present();
    },
    error => {
      console.log(<any>error);
      this.toast
        .create({
          message: `Sensor con código ${this.sensor.codigo} ya existe.`,
          duration: 5000
        })
        .present();
    }
  );

 }

}
