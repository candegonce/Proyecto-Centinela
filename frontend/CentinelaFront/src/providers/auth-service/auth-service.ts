import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Events } from "ionic-angular";

export class User {
  name: string;
  email: string;
 
  constructor( email: string, name: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {

  constructor(private authFirebase : AngularFireAuth, public event: Events,){}

  currentUser: User;

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
     
  signOut() {
    this.authFirebase.auth.signOut();
    this.event.publish('user:logout');
    console.log(this.authFirebase.auth.currentUser);
  }

//// Agregado de funciones para probar el correcto cambio de menus segun 
//// este logueado o no este loguado
HAS_LOGGED_IN : boolean = false;

// hasLoggedIn():Promise<boolean> {
//   console.log("ingresa al HasLoggedIn")
// return this.storage.get("Inicio_session").then((value) => {
//   return value;
// }).catch(error => {console.log(error)}) ;
// }

}
