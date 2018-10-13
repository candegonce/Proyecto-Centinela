import { Component, ViewChild, OnInit } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';

import { AboutPage } from './../pages/about/about';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
//import { SensorDetallePage } from './../pages/sensor-detalle/sensor-detalle';
import { RegisterSensorPage } from '../pages/register-sensor/register-sensor';
import { SensoresListaPage } from '../pages/lista-sensores/sensores-lista';
//import { HomePage } from './../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { MapaPage } from './../pages/mapa/mapa';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { UsuarioCuentaPage } from '../pages/usuario-cuenta/usuario-cuenta';
import { isNullOrUndefined } from 'util';
import { MisSensoresPage } from '../pages/mis-sensores/mis-sensores';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  paginasComunes: PageInterface[] = [
    { title: 'Sensores', name: 'SensoresListaPage', component: SensoresListaPage, tabComponent: SensoresListaPage, index: 0, icon: 'analytics' },
    { title: 'Registrar Sensor', name: 'RegisterSensorPage', component: RegisterSensorPage, tabComponent: RegisterSensorPage, index: 1, icon: 'analytics' },
    { title: 'Mapa', name: 'MapaPage', component: MapaPage, tabComponent: MapaPage, index: 2, icon: 'map' },
    { title: 'Acerca de', name: 'AboutPage', component: AboutPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' }
  ]
  loggedOutPages: PageInterface[] = [
    { title: 'Iniciar Sesión', name: 'LoginPage', component: LoginPage, index: 0, icon: 'log-in' }
  ]
  loggedInPages: PageInterface[] = [
    { title: 'Mis sensores', name: 'MisSensoresPage', component: MisSensoresPage, index: 0, icon: 'bookmarks'},
    { title: 'Cuenta', name: 'UsuarioCuentaPage', component: UsuarioCuentaPage, index: 1, icon: 'contact' },
    { title: 'Cerrar Sesión', name: 'LoginPage', component: LoginPage, index: 2, icon: 'log-out'}
  ]



  constructor(
              public platform: Platform,
              public events: Events,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public auth: AuthServiceProvider,
              public menu: MenuController,
              private authFirebase: AngularFireAuth) 
              {
    this.rootPage = LoginPage;
    if (isNullOrUndefined(this.authFirebase.auth.currentUser)){
      console.log("No hay una sesion iniciada");
      this.enableMenu(false);
    }else{
      console.log("Hay una sesion iniciada");
      this.enableMenu(true);
    }
    this.initializeApp();
    this.listenToLoginEvents();
  }


  ngOnInit(){

  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }


  listenToLoginEvents() {
    this.events.subscribe('user:logueado', () => {
      console.log("El usuario acaba de iniciar sesion");
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      console.log("El usuario acaba de cerrar sesion");
      this.enableMenu(false);
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  signOut(){
    this.auth.signOut();
    this.events.publish('user:logout');
    this.nav.setRoot(LoginPage).catch((err: any) => {
      console.log(`Didn't set nav root: ${err}`);
    });
  }

  openPage(page: PageInterface) {
  
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      console.log("entro al else de openPage");
      console.log(page.title == "Cerrar Sesión");
      if (page.title == "Cerrar Sesión"){
        console.log("Se cerrara la sesion");
        this.signOut()
      }else{
        this.nav.setRoot(page.name, params).catch((err: any) => {
          console.log(`Didn't set nav root: ${err}`);
        });
      }
    }


  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }


}