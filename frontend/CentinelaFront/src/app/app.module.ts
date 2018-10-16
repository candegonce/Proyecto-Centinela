import { AngularFireAuth, AngularFireAuthModule } from "angularfire2/auth";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//import { AboutPage } from './../pages/about/about';
import { AgmCoreModule } from "@agm/core";
import { AngularFireModule } from "angularfire2";
import { ApplicationPropertiesServiceProvider } from '../providers/application-properties-service/application-properties-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { SensorDetallePage } from '../pages/sensor-detalle/sensor-detalle';
//import { SensoresListaPage } from '../pages/lista-sensores/sensores-lista';
import { ConsultoriosServiceProvider } from '../providers/consultorios-service/consultorios-service';
import { EventoServiceProvider } from '../providers/evento-service/evento-service';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { HTTP } from "@ionic-native/http";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ListPage } from '../pages/list/list';
//import { LoginPage } from './../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
// import { MapaElementosComponent } from '../components/mapa-elementos/mapa-elementos';
import { MyApp } from './app.component';
//import { RegisterPage } from '../pages/register/register';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SubscriptionsProvider } from '../providers/subscriptions/subscriptions';
import { FirebaseMessagingProvider } from '../providers/firebase-messaging/firebase-messaging';
import { SensorServiceProvider } from '../providers/sensor-service/sensor-service';
import { UsuarioServiceProvider } from '../providers/usuario-service/usuario-service';
//import { HomePage } from "../pages/home/home";
import { HomePageModule } from "../pages/home/home.module";
import { ChartsModule } from "ng2-charts";
import { MedicionServiceProvider } from '../providers/medicion-service/medicion-service';
import { RegisterPage } from "../pages/register/register";
import { RegisterSensorPage } from "../pages/register-sensor/register-sensor";
import { RegisterSensorPageModule } from "../pages/register-sensor/register-sensor.module";

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    // LoginPage,
    SensorDetallePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey:"AIzaSyCpszN1Ybdwa0-UtXJGfBrPIXjagB6Jmr4"}),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG), /*--> Para configurar con nuestro proyecto de firebase */
    ComponentsModule,
    LoginPageModule,
    HomePageModule,
    ChartsModule,
    RegisterSensorPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    // LoginPage,
    SensorDetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ConsultoriosServiceProvider,
    HTTP,
    SubscriptionsProvider,
    EventoServiceProvider,
    ApplicationPropertiesServiceProvider,
    AngularFireAuth,
    FirebaseMessagingProvider,
    SensorServiceProvider,
    UsuarioServiceProvider,
    MedicionServiceProvider
  ]
})
export class AppModule {}
