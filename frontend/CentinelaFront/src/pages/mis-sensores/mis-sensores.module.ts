import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MisSensoresPage } from './mis-sensores';

@NgModule({
  declarations: [
    MisSensoresPage,
  ],
  imports: [
    IonicPageModule.forChild(MisSensoresPage),
  ],
})
export class MisSensoresPageModule {}
