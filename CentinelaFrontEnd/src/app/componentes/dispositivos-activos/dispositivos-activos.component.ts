import { Sensor } from "../../modelos/sensor";
import { SensorService } from "../../servicios/sensor.service";
import { LoginService } from "../../servicios/login.service";
import { UsuarioService } from "../../servicios/usuario.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "dispositivos-activos",
  templateUrl: "./dispositivos-activos.component.html",
  styleUrls: ["./dispositivos-activos.component.css"],
  providers: [SensorService, LoginService, UsuarioService]
})
export class DispositivosActivosComponent implements OnInit {
  public titulo: string;
  public dispositivos: Sensor[];
  public misDispositivos: Sensor[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _usuarioService: UsuarioService,
    private _sensorService: SensorService,
    private location: Location
  ) {
    this.titulo = "Listado de dispositivos";
  }

  ngOnInit() {
    console.log("Listado dispositivos activos correctamente");
    this.misDispositivos = this._loginService.getUser().dispositivos;
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

  seleccionar(sensor: Sensor) {
    //    Hay que agregar el sensor a la lista del usuario
    let usuario = this._loginService.getUser();
    usuario.dispositivos.push(sensor);
    this._usuarioService.editarUsuario(usuario).subscribe(
      response => {
        if (response.status == 200) {
          alert("Sensor agregado a la lista del usuario correctamente.");
          localStorage.setItem("currentUser", JSON.stringify(usuario));
          this.misDispositivos = usuario.dispositivos;
        }
      },
      error => {
        console.log(<any>error);
        if (error.status == 409)
          alert("No se pudo agregar el sensor a la lista del usuario.");
      }
    );
  }

  quitar(sensor: Sensor) {
    /*    alert("entre a quitar");
    let usuario = this._loginService.getUser();
    for (var i = 0; i < usuario.dispositivos.length; i++) {
      if (usuario.dispositivos[i].idSensor === sensor.idSensor) {
      //  usuario.dispositivos = usuario.dispositivos.slice(i, 1);
        alert("encontre y borre" + usuario.dispositivos.slice(i, 1));
        i--;

        this._usuarioService.editarUsuario(usuario).subscribe(
          response => {
            if(response.status == 200){
              alert('Sensor quitado de la lista del usuario correctamente.');
              localStorage.setItem('currentUser', JSON.stringify(usuario));
              this.misDispositivos = usuario.dispositivos;
            }
          },
          error => {
            console.log(<any>error);
            if(error.status == 409)
              alert('No se pudo quitar el sensor de la lista del usuario.')
          }
        );

      }
    }*/
  }

  tengoDispositivo(sensor: Sensor): boolean {
    for (var s of this.misDispositivos) {
      if (s.idSensor == sensor.idSensor) return true;
    }
    return false;
  }

  volver() {
    this.location.back();
  }
  
}
