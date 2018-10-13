import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSensorPage } from './register-sensor';

@NgModule({
  declarations: [
    RegisterSensorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterSensorPage),
  ],
})
export class RegisterSensorPageModule {}
