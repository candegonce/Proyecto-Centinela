import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SensorDetallePage } from './sensor-detalle';

@NgModule({
  declarations: [
    SensorDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(SensorDetallePage),
  ],
})
export class SensorDetallePageModule {}
