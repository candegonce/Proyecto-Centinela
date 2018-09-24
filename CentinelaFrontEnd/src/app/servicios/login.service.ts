import { Usuario } from '../modelos/usuario';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService {

      public url: string;
      public user:Usuario;
      public home:string;

    constructor(public _http: Http,private route: ActivatedRoute,private router: Router){
         this.url = 'http://localhost:8080/ProyectoCentinela/controladores/usuarios';
    //this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/usuarios';
    }

    loguearUsuario(usuario : Usuario){
        return this._http.post(this.url + '/login',usuario).map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
            if (user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                 localStorage.setItem('currentUser', JSON.stringify(user));
                if(user.rol =="ADMINISTRADOR")
                    this.home = "/adminhome";
                else
                    this.home = "/usuario-home";

            }
            return user;
        });
     }

  logout() {
        this.user=this.getUser();
        localStorage.removeItem('currentUser');
        this.router.navigate(['login']);
    }
    getUser():Usuario{
       return Usuario.fromJSON(JSON.parse(localStorage.getItem('currentUser')));
    }
isLogged():boolean{
        if(localStorage.getItem('currentUser'))
            return true;
        return false;    
    }



}
