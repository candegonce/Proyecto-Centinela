import * as firebase from 'firebase/app';

import { AlertController, Events, IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { Observable } from 'rx';
import { Usuario } from '../../models/usuario';
import { UsuarioServiceProvider } from '../../providers/usuario-service/usuario-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;
  // registerCredentials = { email: '', password: '' };
  // user = {} as User;
  user: Usuario = new Usuario();
  firebaseUserObs: Observable<firebase.User>;

  constructor(public navCtrl: NavController,
    public authFirebase: AngularFireAuth,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public event: Events,
    public usuarioService: UsuarioServiceProvider) { }


  async webGoogleLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const credential = await this.authFirebase.auth.signInWithPopup(provider);
      if (credential != null) {
        console.log("Ingresa con credenciales");
        this.event.publish('user:logueado');
      }
      console.log("CREDENCIALES, USUARIO GOOGLE----->");
      console.log(credential.user);
      this.navCtrl.setRoot('HomePage').catch((error: any) => {
        console.log(`Didn't set nav root: ${error}`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async webFacebookLogin(): Promise<void> {
    try {
      const provider = new firebase.auth.FacebookAuthProvider();
      const credential = await this.authFirebase.auth.signInWithPopup(provider);
      console.log("CREDENCIALES FACEBOOK----->");
      console.log(credential);
      this.navCtrl.setRoot('HomePage');
    } catch (error) {
      console.log(error);
    }
  }

  async login(user: User) {  /* Es async porque es un promise */

    const result = this.authFirebase.auth.signInWithEmailAndPassword(user.email, user.password);
    if (result) {
      console.log("RESULT SOLO ::::::::::::");
      console.log(result);
      this.showLoading();
      // no le pregunto por el password porque supuestamente firebase lo chequeó con el UID
      this.usuarioService.obtenerUsuarioPorEmail(user.email)
        .subscribe((usr: Usuario) => {
          this.usuarioService.usuarioLogueado = usr;
          console.log(usr);
          console.log("El usuario logueado que se guardo en el service es:" + this.usuarioService.usuarioLogueado.email);
          localStorage.setItem('sensoresDelUsuario', JSON.stringify(usr.dispositivos)); // Esto lo hago así porque vi que lo están usado así, pero guardar el usuario en el localstorage es una guasada
          this.event.publish('user:logueado');
          this.navCtrl.setRoot(HomePage);
          this.loading.dismissAll();
        });
    }
    else {
      this.showError("Los datos ingresados son incorrectos");
    }
  }

  irARegistro() {
    this.navCtrl.push('RegisterPage');
  }

  public showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }



  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }

  // public login() {
  //   this.showLoading()
  //   this.auth.login(this.registerCredentials).subscribe(allowed => {
  //     if (allowed) {        
  //       this.navCtrl.setRoot("ConsultoriosPage");
  //     } else {
  //       this.showError("Access Denied");
  //     }
  //   },
  //     error => {
  //       this.showError(error);
  //     });
  // }

}