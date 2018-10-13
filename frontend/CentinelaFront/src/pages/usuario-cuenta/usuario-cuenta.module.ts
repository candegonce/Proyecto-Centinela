import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioCuentaPage } from './usuario-cuenta';

@NgModule({
  declarations: [
    UsuarioCuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioCuentaPage),
  ],
})
export class UsuarioCuentaPageModule {}
