import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { Component, ViewChild } from "@angular/core";
import { Sensor } from "../../models/Sensor";
import { MedicionServiceProvider } from "../../providers/medicion-service/medicion-service";
import { Medicion } from "../../models/medicion";
//import { Chart } from "chart.js";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";
import { Observable, Subscription } from "rxjs/Rx";

/**
 * Generated class for the SensorDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-sensor-detalle",
  templateUrl: "sensor-detalle.html"
})
export class SensorDetallePage {
  @ViewChild("lineCanvas")
  lineCanvas;
  sensorParam: Sensor;
  public mediciones: Medicion[] = [];
  estaLogueado: boolean = false;

  timer = Observable.timer(10000, 1000);
  subscription : Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicionService: MedicionServiceProvider,
    public usuarioService: UsuarioServiceProvider,
    private toast: ToastController
  ) {
    this.sensorParam = navParams.get("sensorP");
    if (this.usuarioService.usuarioLogueado.email != null) {
      this.estaLogueado = true;
    } else {
      this.estaLogueado = false;
    }
    console.log(this.estaLogueado);
    console.log(this.usuarioService.usuarioLogueado.email);
    console.log(this.sensorParam.nombreSensor);
  }

  ionViewDidLoad() {
   this.subscription = this.timer.subscribe( t => this.armarGrafico());
    // this.armarGrafico();
    console.log("ionViewDidLoad SensorDetallePage");
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
    console.log("ionViewDidLeave SensorDetallePage");
  }

  armarGrafico() {
    // ver que no traiga todas sino las últimas 5 ponele
    this.medicionService
      .obtenerMedicionesSensor(this.sensorParam.idSensor)
      .subscribe(
        (response: Medicion[]) => {
          console.log(response);
          if (response != null) {
            this.mediciones = response;

            // Junto las fechas, las temperaturas y el C02 de las mediciones Para el Grafico //
            this.lineChartLabels = [];
            let temperaturas: number[] = [];
            let co2s: number[] = [];

            for (var medicion of this.mediciones) {
              this.lineChartLabels.push(medicion.fecha);
              temperaturas.push(medicion.temperatura);
              co2s.push(medicion.dioxidoCarbono);
              console.log(medicion.fecha);
            }

            this.lineChartData = [
              { data: temperaturas, label: "Temperatura" },
              { data: co2s, label: "CO2" }
            ];
          }
        },
        error => {
          console.log(<any>error);
        }
      );
  }

  ////grafico////

  public lineChartData: Array<any>;
  public data = [];

  public lineChartOptions: any = { responsive: true };

  public lineChartLabels: Array<any>;

  public lineChartType: string = "line";
  public pieChartType: string = "pie";

  public tipoIcono: string = "ios-stats";

  // Pie
  public pieChartLabels: string[] = [
    "Download Sales",
    "In-Store Sales",
    "Mail Sales"
  ];
  public pieChartData: number[] = [300, 500, 100];

  public randomizeType(): void {
    this.lineChartType = this.lineChartType === "line" ? "bar" : "line";
    this.pieChartType = this.pieChartType === "doughnut" ? "pie" : "doughnut";
    this.tipoIcono = this.tipoIcono === "analytics" ? "ios-stats" : "analytics";
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //fin grafico///

  agregarSensor() {
    this.usuarioService.usuarioLogueado.dispositivos.push(this.sensorParam);
    this.usuarioService
      .editarUsuario(this.usuarioService.usuarioLogueado)
      .subscribe(
        (response: any) => {
          // if (response.status == 200) {
          console.log("Sensor agregado a la lista del usuario correctamente.");
          //podría prescindir si un web service me retorna la coleccion bajo demanda.
          localStorage.setItem(
            "sensoresDelUsuario",
            JSON.stringify(this.usuarioService.usuarioLogueado.dispositivos)
          );
          this.toast
            .create({
              message: `${
                this.sensorParam.nombreSensor
                } agregado a mis sensores correctamente.`,
              duration: 5000
            })
            .present();
          //    }
        },
        error => {
          console.log(<any>error);
          //  if (error.status == 409)
          this.toast
            .create({
              message: `No se pudo agregar ${
                this.sensorParam.nombreSensor
                } a mis sensores.`,
              duration: 5000
            })
            .present();
        }
      );
  }

  tengoDispositivo(): boolean {
    let misDispositivos = (JSON.parse(localStorage.getItem('sensoresDelUsuario')));
    for (var s of misDispositivos) {
      if (s.idSensor == this.sensorParam.idSensor) return true;
    }
    return false;
  }

  quitarSensor() {
    console.log(this.usuarioService.usuarioLogueado.dispositivos);
    let pos = -1;
    for (pos = 0; pos < this.usuarioService.usuarioLogueado.dispositivos.length; pos++) {
      if (this.usuarioService.usuarioLogueado.dispositivos[pos].idSensor === this.sensorParam.idSensor)
        break;
    }
    console.log(pos);

    if (pos > -1) {
      this.usuarioService.usuarioLogueado.dispositivos.splice(pos, 1);
      console.log(this.usuarioService.usuarioLogueado.dispositivos);
      this.usuarioService
        .editarUsuario(this.usuarioService.usuarioLogueado)
        .subscribe(
          (response: any) => {
            console.log(
              "sensor" +
              this.sensorParam.nombreSensor +
              " se ha quitado de la lista del usuario " +
              this.usuarioService.usuarioLogueado.email
            );
            localStorage.setItem(
              "sensoresDelUsuario",
              JSON.stringify(this.usuarioService.usuarioLogueado.dispositivos)
            );
            this.toast
              .create({
                message: `${
                  this.sensorParam.nombreSensor
                  } quitado de mis sensores correctamente.`,
                duration: 5000
              })
              .present();
          },
          error => {
            console.log(<any>error);
            this.toast
              .create({
                message: `No se pudo quitar ${
                  this.sensorParam.nombreSensor
                  } de mis sensores.`,
                duration: 5000
              })
              .present();
          }
        );
    }
  }
}
