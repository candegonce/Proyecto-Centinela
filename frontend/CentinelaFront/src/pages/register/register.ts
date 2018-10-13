import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';
import { Usuario } from '../../models/usuario';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  usuario: Usuario;

  constructor(public navCtrl: NavController,
    private authFirebase: AngularFireAuth,
    public navParams: NavParams,
    public usuarioService: UsuarioServiceProvider) {
      this.usuario = new Usuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // Se registra en firebase para la autenticación y en nuestra bbdd para manipular los datos asociados.
  async register(user: User, u:Usuario) {
    try {
      const result = await this.authFirebase.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      let usuarioNuevo: Usuario = new Usuario();
      usuarioNuevo.email = user.email;
      usuarioNuevo.password = user.password;
      usuarioNuevo.rol = "USUARIO";
      usuarioNuevo.habilitado = true;
      usuarioNuevo.apeynom = u.apeynom;
      usuarioNuevo.sexo = u.sexo;
      this.usuarioService.agregarUsuario(usuarioNuevo)
        .subscribe(response => {
          console.log('Usuario creado correctamente.');
          this.usuario = new Usuario();
          this.user = {} as User;
          alert('Usuario creado correctamente.');
        },
          error => {
            console.log(<any>error);
            if (error.status == 409) {
              alert('Usuario ya existe...');
            }
          }
        )

    } catch (error) {
      console.error(error);
    }

  }

}
