import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SensorService } from '../../servicios/sensor.service';
import {LoginService} from '../../servicios/login.service';
import {UsuarioService} from '../../servicios/usuario.service';
import { Sensor } from '../../modelos/sensor';
import { Ubicacion } from '../../modelos/ubicacion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dispositivo-crear',
  templateUrl: './dispositivo-crear.component.html',
  styleUrls: ['./dispositivo-crear.component.css'],
  providers: [SensorService, LoginService, UsuarioService]
})
export class DispositivoCrearComponent implements OnInit {

  public titulo: string;
  public sensor: Sensor;
  
  constructor( private _route: ActivatedRoute, private _router: Router, 
    private _loginService: LoginService, private _usuarioService: UsuarioService,
               private _sensorService: SensorService, private location: Location){
      this.titulo = "Alta de dispositivo.";
      this.sensor = new Sensor();
      this.sensor.ubicacion = new Ubicacion();
  }

  ngOnInit(){
      console.log("CrearDispositivo componente cargado correctamente.");
  }

  onSubmit(){
      console.log(this.sensor);
      this.sensor.estado ="ACTIVO";
      this._sensorService.agregarSensor(this.sensor).subscribe(
          response => {
           alert('Sensor creado correctamente.');
                  this.sensor = new Sensor();
                  this.sensor.ubicacion = new Ubicacion();
       
          },
          error => {
              console.log(<any>error);
              if ( error.status == 409){
                  alert('El Sensor ya existe...');
              }
          }
       );
  }

  volver(){
      this.location.back();
  }

}
