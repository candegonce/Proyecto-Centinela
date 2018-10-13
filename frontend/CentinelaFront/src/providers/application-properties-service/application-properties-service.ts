import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationPropertiesServiceProvider {

  // private url : string = 'https://test.dat.cespi.unlp.edu.ar/elektu-core';
  // private url : string = 'http://localhost:8080/elektu-core'; 
  public url : 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores';
  // public url : 'https://104.248.230.8/ProyectoCentinela/controladores'

  private header : HttpHeaders = new HttpHeaders({
                                          'Content-Type':  'application/json',
                                      });

  constructor(public http: HttpClient) {
    console.log('Hello ApplicationPropertiesServiceProvider Provider');
  }

  getUrlBasic(): string{
    return this.url;
  }

  getElementoVotablePublicoUrl() : string{
    return '/loged/elementoVotable/';
  }

  getUrlParametros() : string{
    return this.url+'/parametros';
  }

  postUsuarioOrganizador() :string{
    return this.url+'/usuario';
  }
  
  getUrlElementoVotable() : string{
    return this.url+'/elementoVotable';
  }
  
  getUrlElementoVotablePublico() : string{
    return this.url+'/public';
  }

  getUrlRol() : string{
    return this.url+'/rol';
  }

  getUrlPermiso() : string{
    return this.url+'/permiso';
  }

  getUrlUsuario() : string{
    return this.url+'/usuario';
  }

  getUrlLogin() : string{
    return this.url+'/login';
  }

  getUrlSession() : string{
    return this.url+'/session';
  }

  getUrlSolicitud() : string{
    return this.url+'/evento/solicitud';
  }

  getUrlEvento() : string{
    return this.url+'/evento';
  }

  getUrlEventosPorRol() : string{
    return this.url+'/usuario/eventos';
  }

  getUrlSolcial() : string{
    return this.url+'/social';
  }

  getHeader():any{
      return this.header;
  }

  addHeadOption(name:string,value:string){
    this.header.set(name,value);
  }

  getUrlVotos() : string{
    return this.url+'/voto';
  }

  getUrlImage() : string{
    return this.url+'/image';
  }

  getUnicoEventoCreadoId() : number{
    return 1;
  }

}
