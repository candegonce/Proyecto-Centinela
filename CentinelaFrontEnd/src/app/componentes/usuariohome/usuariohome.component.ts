import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'usuario-home',
  templateUrl: './usuariohome.component.html',
  styleUrls: ['./usuariohome.component.css']
})
export class UsuariohomeComponent implements OnInit {
  public titulo: string;
  public login: boolean;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this.titulo = "Bienvenid@!";
    this.login = true;
  }

  ngOnInit() {
    console.log("Usuario logueado correctamente.");
  }

  volver() {
    this._router.navigate(['/']);
  }

}
