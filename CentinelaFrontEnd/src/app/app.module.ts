import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders} from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ErrorComponent } from './componentes/error/error.component';
import { UsuariohomeComponent } from './componentes/usuariohome/usuariohome.component';
import { AdministradorhomeComponent } from './componentes/administradorhome/administradorhome.component';
import { DispositivosListComponent } from './componentes/dispositivos-list/dispositivos-list.component';
import { DispositivosPropiosComponent } from './componentes/dispositivos-propios/dispositivos-propios.component';
import { DispositivoPropioComponent } from './componentes/dispositivo-propio/dispositivo-propio.component';
import { DispositivoActivoComponent } from './componentes/dispositivo-activo/dispositivo-activo.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { SensorService } from './servicios/sensor.service';
import { MedicionService } from './servicios/medicion.service';
import { LoginService } from './servicios/login.service';
import { UsuarioService } from './servicios/usuario.service';
import { UsuarioBorrarComponent } from './componentes/usuario-borrar/usuario-borrar.component';
import { UsuarioEditarComponent } from './componentes/usuario-editar/usuario-editar.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { MedicionDetalleComponent } from './componentes/medicion-detalle/medicion-detalle.component';
import { MedicionesDispositivoComponent } from './componentes/mediciones-dispositivo/mediciones-dispositivo.component';
import { DispositivoBorrarComponent } from './componentes/dispositivo-borrar/dispositivo-borrar.component';
import { DispositivoCrearComponent } from './componentes/dispositivo-crear/dispositivo-crear.component';
import { DispositivoDetalleComponent } from './componentes/dispositivo-detalle/dispositivo-detalle.component';
import { DispositivoEditarComponent } from './componentes/dispositivo-editar/dispositivo-editar.component';
import { DispositivosActivosComponent } from './componentes/dispositivos-activos/dispositivos-activos.component';


@NgModule({
  declarations: [
    AdministradorhomeComponent,
    AppComponent,
    DispositivoActivoComponent,
    DispositivoBorrarComponent,
    DispositivoCrearComponent,
    DispositivoDetalleComponent,
    DispositivoEditarComponent,
    DispositivoPropioComponent,
    DispositivosActivosComponent,
    DispositivosListComponent,
    DispositivosPropiosComponent,    
    ErrorComponent,
    LoginComponent,
    MedicionDetalleComponent,
    MedicionesDispositivoComponent,
    RegistroComponent,
    UsuarioComponent,
    UsuarioBorrarComponent,
    UsuarioEditarComponent,
    UsuariohomeComponent,
    UsuariosListComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    ChartsModule    
  ],
  providers: [appRoutingProviders, UsuarioService, SensorService, MedicionService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
