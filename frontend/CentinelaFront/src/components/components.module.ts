import { NgModule } from '@angular/core';
import { MapaElementosComponent } from './mapa-elementos/mapa-elementos';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

/** Es importante considerar que este es un módulo hijo de appmodule, por lo que, si se va a usar el mapa,
 *  debe impostar el AgmCoreModule, aunque la apikey y el 'forRoot' lo debe hacer en el padre.
 * También importo el BrowserModule para usar el ngFor dentro de la componente
*/

@NgModule({
	declarations: [MapaElementosComponent],
	imports: [AgmCoreModule, CommonModule],
	exports: [MapaElementosComponent]
})
export class ComponentsModule {}