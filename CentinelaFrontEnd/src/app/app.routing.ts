import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Importar componentes
import {AppComponent} from './app.component';
import {UsuariohomeComponent} from './componentes/usuariohome/usuariohome.component';
import {AdministradorhomeComponent} from './componentes/administradorhome/administradorhome.component';
import { DispositivoActivoComponent } from './componentes/dispositivo-activo/dispositivo-activo.component';
import { DispositivoBorrarComponent } from './componentes/dispositivo-borrar/dispositivo-borrar.component';
import { DispositivoCrearComponent } from './componentes/dispositivo-crear/dispositivo-crear.component';
import { DispositivoDetalleComponent } from './componentes/dispositivo-detalle/dispositivo-detalle.component';
import { DispositivoEditarComponent } from './componentes/dispositivo-editar/dispositivo-editar.component';
import { DispositivoPropioComponent } from './componentes/dispositivo-propio/dispositivo-propio.component';
import { DispositivosActivosComponent } from './componentes/dispositivos-activos/dispositivos-activos.component';
import {ErrorComponent} from './componentes/error/error.component';
import {LoginComponent} from './componentes/login/login.component';
import {RegistroComponent} from './componentes/registro/registro.component';
import {DispositivosListComponent} from './componentes/dispositivos-list/dispositivos-list.component';
import { DispositivosPropiosComponent } from './componentes/dispositivos-propios/dispositivos-propios.component';
import { MedicionDetalleComponent } from './componentes/medicion-detalle/medicion-detalle.component';
import { MedicionesDispositivoComponent } from './componentes/mediciones-dispositivo/mediciones-dispositivo.component';
import { UsuarioBorrarComponent } from './componentes/usuario-borrar/usuario-borrar.component';
import { UsuarioEditarComponent } from './componentes/usuario-editar/usuario-editar.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';


const appRoutes: Routes = [
  {path: 'usuario-home', component: UsuariohomeComponent},
  {path: 'dispositivos-propios', component: DispositivosPropiosComponent},
  {path: 'dispositivo-propio/:id', component: DispositivoPropioComponent},
  {path: 'dispositivos-activos', component: DispositivosActivosComponent},
  {path: 'dispositivo-activo/:id', component: DispositivoActivoComponent},

  {path: 'mediciones-dispositivo/:id', component: MedicionesDispositivoComponent},
  {path: 'medicion-detalle/:id', component: MedicionDetalleComponent},


  {path: 'adminhome', component: AdministradorhomeComponent},
  {path: 'usuarios-list', component: UsuariosListComponent},
  {path: 'usuario-detalle/:id', component: UsuarioComponent},
  {path: 'usuario-editar/:id', component: UsuarioEditarComponent},
  {path: 'usuario-borrar/:id', component: UsuarioBorrarComponent},
  
  {path: 'dispositivo-crear', component: DispositivoCrearComponent},
  {path: 'dispositivo-editar/:id', component: DispositivoEditarComponent},
  {path: 'dispositivo-borrar/:id', component: DispositivoBorrarComponent},
  {path: 'dispositivos', component: DispositivosListComponent},
  {path: 'dispositivo-detalle/:id', component: DispositivoDetalleComponent},

  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
