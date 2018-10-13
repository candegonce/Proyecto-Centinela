import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventoVO } from '../../models/EventoVO';
import { ApplicationPropertiesServiceProvider } from '../application-properties-service/application-properties-service';

/*
  Generated class for the EventoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoServiceProvider {

  constructor(public http: HttpClient, private properties : ApplicationPropertiesServiceProvider) {
    console.log('Hello EventoServiceProvider Provider');
  }

  public eventoActual : EventoVO = new EventoVO();

  get(eventoId) : Observable<EventoVO> {
    //return this.http.get<EventoVO>("https://demo2156175.mockable.io/evento/1");
    this.http.get<EventoVO>(this.properties.getUrlEvento()+ "/" + eventoId)
    .subscribe((ev : EventoVO) => { 
      this.eventoActual = ev;
      this.eventoActual.fecha_fin_votacion["month"] += 1;
    });
    return this.http.get<EventoVO>(this.properties.getUrlEvento()+ "/" + eventoId);
  }

}
