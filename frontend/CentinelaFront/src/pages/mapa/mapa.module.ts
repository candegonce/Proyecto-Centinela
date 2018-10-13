import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MapaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
    ComponentsModule
  ],
})
export class MapaPageModule {}
