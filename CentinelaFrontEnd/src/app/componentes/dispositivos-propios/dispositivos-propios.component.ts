import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Sensor} from '../../modelos/sensor';
import {SensorService} from '../../servicios/sensor.service';
import {LoginService} from '../../servicios/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivos-propios',
  templateUrl: './dispositivos-propios.component.html',
  styleUrls: ['./dispositivos-propios.component.css'],
  providers: [SensorService, LoginService]
})
export class DispositivosPropiosComponent implements OnInit {
    public titulo : string;
    public dispositivos: Sensor[];

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService, private _sensorService: SensorService, private location: Location) { 
        this.titulo ="Mis dispositivos";
  }

  ngOnInit() {
     console.log("Mis dispositivos correctamente"); 
     this.dispositivos = this._loginService.getUser().dispositivos;
  }

  volver(){
      this.location.back();
  }
}
