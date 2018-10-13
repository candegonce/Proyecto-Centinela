import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SubscriptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubscriptionsProvider {

  /** La idea de este provider es tener un arreglo global de subscripciones para agregarlas en cada subscripcion
   *  poder hacer unsuscribe en caso de ser necesario */

  _subscriptions : any[] = [] ;

  constructor(public http: HttpClient) {
    console.log('Hello SubscriptionsProvider Provider');
  }

}
