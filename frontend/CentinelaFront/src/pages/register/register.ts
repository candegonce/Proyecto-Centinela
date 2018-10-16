import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { UsuarioServiceProvider } from "../../providers/usuario-service/usuario-service";
import { Usuario } from "../../models/usuario";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
  user = {} as User;
  usuario: Usuario;

  constructor(
    public navCtrl: NavController,
    private authFirebase: AngularFireAuth,
    public navParams: NavParams,
    public usuarioService: UsuarioServiceProvider,
    private toast: ToastController
  ) {
    this.usuario = new Usuario();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegisterPage");
  }

  // Se registra en firebase para la autenticación y en nuestra bbdd para manipular los datos asociados.
  async register(user: User, u: Usuario) {
    try {
      const result = await this.authFirebase.auth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
      console.log(result);
      let usuarioNuevo: Usuario = new Usuario();
      usuarioNuevo.email = user.email;
      usuarioNuevo.password = user.password;
      usuarioNuevo.rol = "USUARIO";
      usuarioNuevo.habilitado = true;
      usuarioNuevo.apeynom = u.apeynom;
      usuarioNuevo.sexo = u.sexo;
      this.usuarioService.agregarUsuario(usuarioNuevo).subscribe(
        response => {
          console.log("Usuario creado correctamente.");
          this.toast
            .create({
              message: `Se ha registrado correctamente.`,
              duration: 5000
            })
            .present();
          this.usuario = new Usuario();
          this.user = {} as User;
        },
        error => {
          console.log(<any>error);
          this.toast
            .create({
              message: `Ya existe un usuario con email ${user.email}.`,
              duration: 5000
            })
            .present();
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}
