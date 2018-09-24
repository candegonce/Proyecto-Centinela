import {Usuario} from '../modelos/usuario';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {
  public url: string;
  constructor(public _http: Http) {
    this.url = 'http://localhost:8080/ProyectoCentinela/controladores/usuarios';
    //this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/usuarios';
  }

  obtenerUsuarios() {
    return this._http.get(this.url + '/listar').map(res => res.json());
  }

  obtenerUsuario(id: number) {
    return this._http.get(this.url + '/obtener/' + id).map(res => res.json());
  }

  obtenerUsuarioPorEmail(email: string) {
    return this._http.get(this.url + '/obtenerPorEmail/' + email).map(res => res.json());
  }

  agregarUsuario(usuario: Usuario) {
    return this._http.post(this.url + '/crear', usuario);
  }

  editarUsuario(usuario: Usuario) {
    return this._http.put(this.url + '/editar', usuario);
  }

  borrarUsuario(id: number) {
    return this._http.delete(this.url + '/borrar/' + id).map(res => res.json());
  }

}
