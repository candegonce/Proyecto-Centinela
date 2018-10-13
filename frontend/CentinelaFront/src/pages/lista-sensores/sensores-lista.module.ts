import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensoresListaPage } from './sensores-lista';


@NgModule({
  declarations: [
    SensoresListaPage,
  ],
  imports: [
    IonicPageModule.forChild(SensoresListaPage),
    
  ],
})
export class SensoresListaPageModule {}
