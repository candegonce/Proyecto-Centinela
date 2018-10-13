import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Sensor } from '../../models/Sensor';

/*
  Generated class for the UsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioServiceProvider {
  
  public url : string;
  public misSensores : Sensor[] = [];
  public usuarioLogueado : Usuario = new Usuario();

  constructor(public http: HttpClient) {
    this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/usuarios';
    // this.url = 'https://104.248.230.8/ProyectoCentinela/controladores/usuarios';
    console.log('Hello UsuarioServiceProvider Provider');
  }

  obtenerUsuarios() {
    return this.http.get(this.url + '/listar');
  }

  obtenerUsuario(id: number) {
    return this.http.get(this.url + '/obtener/' + id);
  }

  obtenerUsuarioPorEmail(email: string) {
    return this.http.get(this.url + '/obtenerPorEmail/' + email);
  }

  agregarUsuario(usuario: Usuario) {
    return this.http.post(this.url + '/crear', usuario);
  }

  editarUsuario(usuario: Usuario) {
    return this.http.put(this.url + '/editar', usuario);
  }

  borrarUsuario(id: number) {
    return this.http.delete(this.url + '/borrar/' + id);
  }

}
