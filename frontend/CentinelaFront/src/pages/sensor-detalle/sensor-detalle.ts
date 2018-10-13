import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { Sensor } from '../../models/Sensor';
import { MedicionServiceProvider } from '../../providers/medicion-service/medicion-service';
import { Medicion } from '../../models/medicion';
import { Chart } from "chart.js";
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

/**
 * Generated class for the SensorDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sensor-detalle',
  templateUrl: 'sensor-detalle.html',
})
export class SensorDetallePage {

  @ViewChild('lineCanvas') lineCanvas;
  sensorParam: Sensor;
  public mediciones: Medicion[] = [];
  lineChart: any;
  estaLogueado : boolean = false;

  // variables para el grafico
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  // fin variables para el grafico

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public medicionService: MedicionServiceProvider,
    public usuarioService : UsuarioServiceProvider) {

    this.sensorParam = navParams.get("sensorP");
    if (this.usuarioService.usuarioLogueado.email != null){
      this.estaLogueado = true;
    }
    else{
      this.estaLogueado = false;
    }
    console.log(this.estaLogueado);
    console.log(this.usuarioService.usuarioLogueado.email);
    console.log(this.sensorParam.nombreSensor);

  }

  ionViewDidLoad() {
    this.armarGrafico();
    console.log('ionViewDidLoad SensorDetallePage');
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  armarGrafico() {

    if (false) {
      // ver que no traiga todas sino las últimas 5 ponele
      this.medicionService.obtenerMedicionesSensor(this.sensorParam.idSensor).subscribe(
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

            this.lineChart = new Chart(this.lineCanvas.nativeElement, {
              type: 'line',
              data: {
                labels: this.lineChartLabels,
                datasets: [
                  {
                    label: "CO2",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: co2s,
                    spanGaps: false,
                  },
                  {
                    label: "Temperatura",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(100,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: temperaturas,
                    spanGaps: false,
                  }
                ]
              }
            });

          }

        },
        error => {
          console.log(<any>error);
        }
      );

    } //end if trucho
    else {
      // Version hardcodeada
      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        type: 'line',
        data: {
          labels: [10, 20, 30, 40, 50, 10, 20, 30, 40, 50],
          datasets: [
            {
              label: "CO2",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [10, 50, 100, 75, 89, 75, 50, 100, 75, 89],
              spanGaps: false,
            },
            {
              label: "Temperatura",
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(112, 1, 147,0.4)",
              borderColor:  "rgba(157, 1, 147,1)",
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [23, 18, 25, 30, 12, 23, 18, 25, 30, 12],
              spanGaps: false,
            }
          ]
        }
      });
    }
  }


agregarSensor(){
  this.usuarioService.usuarioLogueado.dispositivos.push(this.sensorParam);
  this.usuarioService.editarUsuario(this.usuarioService.usuarioLogueado).subscribe(
    (response : any) => {
      if(response.status == 200){
        console.log('Sensor agregado a la lista del usuario correctamente.');
        
        localStorage.setItem('sensoresDelUsuario', JSON.stringify(this.usuarioService.usuarioLogueado.dispositivos)); //podría prescindir si un web service me retorna la coleccion bajo demanda.
        alert('Sensor agregado a la lista del usuario correctamente.')
      }
  },
  error => {
      console.log(<any>error);
      if(error.status == 409)
          alert('No se pudo agregar el sensor a la lista del usuario.')
      }
  );

  console.log("sensor"+this.sensorParam.nombreSensor + " ha sido añadido al usuario "+this.usuarioService.usuarioLogueado.email);
}

tengoDispositivo(): boolean {
  let misDispositivos = this.usuarioService.usuarioLogueado.dispositivos;
  for (var s of misDispositivos) {
    if (s.idSensor == this.sensorParam.idSensor) 
        return true;
  }
  return false;
}



}
