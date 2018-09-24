import {Sensor} from '../../modelos/sensor';
import {Medicion} from '../../modelos/medicion';
import {SensorService} from '../../servicios/sensor.service';
import {MedicionService} from '../../servicios/medicion.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'dispositivo-propio',
  templateUrl: './dispositivo-propio.component.html',
  styleUrls: ['./dispositivo-propio.component.css'],
  providers: [SensorService, MedicionService]
})
export class DispositivoPropioComponent implements OnInit {
  public titulo: string;
  public dispositivo: Sensor;
  public mediciones: Medicion[];

  constructor(private _route: ActivatedRoute, private _router: Router, private _medicionService: MedicionService,
    private _sensorService: SensorService, private location: Location) {
    this.titulo = "Detalle dispositivo";
    this.dispositivo = new Sensor();
    this. mediciones = [];
  }

  ngOnInit() {
    console.log("Dispositivo propio correctamente");
    this.obtenerSensor();
    this.obtenerMediciones();
  }
    obtenerSensor(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._sensorService.obtenerSensor(id).subscribe(
                response => {
                    console.log(response);
                    this.dispositivo = response;
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }
    obtenerMediciones(){
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._medicionService.obtenerMedicionesSensor(id).subscribe(
                response => {
                    console.log(response);
                    this.mediciones = response;

                    // Junto las fechas, las temperaturas y el C02 de las mediciones Para el Grafico //
                    this.lineChartLabels = [];
                    let temperaturas:number[] = [];
                    let co2s:number[] = [];

                    for (var medicion of this.mediciones){
                        this.lineChartLabels.push(medicion.fecha);
                        temperaturas.push(medicion.temperatura);
                        co2s.push(medicion.dioxidoCarbono);
                        console.log(medicion.fecha);
                    }

                    this.lineChartData = [
                        { data: temperaturas, label: 'Temperatura'}, 
                        { data: co2s, label: 'Dioxido de Carbono'}
                     ];
                    // Fin Fechas, las temperaturas y el C02 de mediciones para Grafico//
                },
                error => {
                    console.log(<any>error);
                }
            );
        });
    }

  
  ////grafico////

            public lineChartData:Array<any>;
         /*   public lineChartData:Array<any> = [
               { data: [65, 59, 80, 81, 56, 55, 40], label: 'Temperatura'}, 
               { data: [28, 48, 40, 19, 86, 27, 90], label: 'Dioxido de Carbono'}
            ];*/
            public lineChartOptions:any = { responsive: true };


            public lineChartLabels:Array<any>;
            //public lineChartLabels:Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            public lineChartType:string = 'line';
            public pieChartType:string = 'pie';

            // Pie
            public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
            public pieChartData:number[] = [300, 500, 100];

            public randomizeType():void {
                this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
                this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
            }

            public chartClicked(e:any):void {
                console.log(e);
            }

            public chartHovered(e:any):void {
                console.log(e);
            }


  //fin grafico///


    volver(){
      this.location.back();
  }
}