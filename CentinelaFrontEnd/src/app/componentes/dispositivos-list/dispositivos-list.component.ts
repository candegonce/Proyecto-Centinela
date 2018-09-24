import {Sensor} from '../../modelos/sensor';
import {SensorService} from '../../servicios/sensor.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'dispositivos-list',
  templateUrl: './dispositivos-list.component.html',
  styleUrls: ['./dispositivos-list.component.css']
})
export class DispositivosListComponent implements OnInit {

  public titulo: string;
  public dispositivos: Sensor[];

  constructor(private _route: ActivatedRoute, private _router: Router,
    private _sensorService: SensorService, private location: Location) {
    this.titulo = "Listado de dispositivos";
  }

  ngOnInit() {
    console.log("Listado de dispositivos correctamente");
    this._sensorService.obtenerSensores().subscribe(
      result => {
        this.dispositivos = result;
        console.log(this.dispositivos);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  activar(sensor: Sensor){
    sensor.estado = "ACTIVO";
    this._sensorService.editarSensor(sensor)
      .subscribe();
  }

  desactivar(sensor: Sensor) {
    sensor.estado = "INACTIVO";
    this._sensorService.editarSensor(sensor)
    .subscribe();
  }
  
   volver(){
      this.location.back();
  }

}
