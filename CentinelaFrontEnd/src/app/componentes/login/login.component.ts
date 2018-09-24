import {Usuario} from '../../modelos/usuario';
import {LoginService} from '../../servicios/login.service';
import {UsuarioService} from '../../servicios/usuario.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public titulo: string;
  public usuario: Usuario;
  private baseurl:string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService) {
    this.titulo = "Iniciar Sesion";
    this.usuario = new Usuario();
  }

  ngOnInit() {
    console.log("Login component iniciado correctamente...");
  }

  onSubmit() {
    console.log(this.usuario);
    this._loginService.loguearUsuario(this.usuario).subscribe(
      response => {
        alert('Usuario logueado correctamente...'+ this._loginService.getUser().rol);
        this._router.navigate([this._loginService.home]);
      },
      error => {
        console.log(<any>error);
        if (error.status == 404) {
          alert('Usuario o contraseña incorrectos');
        }
      }
    );

  }

   volver() {
    this._router.navigate(['/']);
  }

}
