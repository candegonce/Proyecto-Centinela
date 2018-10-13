import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, hasChildren:boolean}>;

  firebaseUser : firebase.User;

  constructor(public navCtrl: NavController, private authFirebase: AngularFireAuth,
     private toast: ToastController, private authService : AuthServiceProvider) { }

  ionViewDidLoad() {
    this.authFirebase.authState.subscribe((firebaseUserRes) => {
      this.firebaseUser = firebaseUserRes;
      if (firebaseUserRes && firebaseUserRes.email && firebaseUserRes.uid) {
        this.toast.create({
          message: `Bienvenido al sistema Centinela de medición de CO2 ${firebaseUserRes.email}`,
          duration: 5000
        }).present();
      }
      else{
        this.toast.create({
          message: 'Al parecer no tiene la sesión iniciada, vuelva a loguearse',
          duration:5000
        }).present();
      }
    });
  }
}
