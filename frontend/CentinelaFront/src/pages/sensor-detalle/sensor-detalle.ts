import { IonicPage, NavController, NavParams } from "ionic-angular";

import { Component, ViewChild } from "@angular/core";
import { Sensor } from "../../models/Sensor";
import { MedicionServiceProvider } from "../../providers/medicion-service/medicion-service";
import { Medicion } from "../../models/medicion";
//import { Chart } from "chart.js";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public medicionService: MedicionServiceProvider,
    public usuarioService: UsuarioServiceProvider
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
    this.armarGrafico();
    console.log("ionViewDidLoad SensorDetallePage");
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
          if (response.status == 200) {
            console.log(
              "Sensor agregado a la lista del usuario correctamente."
            );

            localStorage.setItem(
              "sensoresDelUsuario",
              JSON.stringify(this.usuarioService.usuarioLogueado.dispositivos)
            ); //podría prescindir si un web service me retorna la coleccion bajo demanda.
            alert("Sensor agregado a la lista del usuario correctamente.");
          }
        },
        error => {
          console.log(<any>error);
          if (error.status == 409)
            alert("No se pudo agregar el sensor a la lista del usuario.");
        }
      );

    console.log(
      "sensor" +
        this.sensorParam.nombreSensor +
        " ha sido añadido al usuario " +
        this.usuarioService.usuarioLogueado.email
    );
  }

  tengoDispositivo(): boolean {
    let misDispositivos = this.usuarioService.usuarioLogueado.dispositivos;
    for (var s of misDispositivos) {
      if (s.idSensor == this.sensorParam.idSensor) return true;
    }
    return false;
  }
}
