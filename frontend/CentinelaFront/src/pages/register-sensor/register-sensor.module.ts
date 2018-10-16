import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterSensorPage } from './register-sensor';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    RegisterSensorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterSensorPage),
    ComponentsModule
  ]
})
export class RegisterSensorPageModule {}
