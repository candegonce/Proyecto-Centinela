import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'adminhome',
  templateUrl: './administradorhome.component.html',
  styleUrls: ['./administradorhome.component.css']
})
export class AdministradorhomeComponent implements OnInit {

  public titulo: string;

  constructor(private _route: ActivatedRoute, private _router: Router) {
    this.titulo = "Bienvenido administrador";
  }

  ngOnInit() {
    console.log("adminHomeComponent cargado correctamente...");
  }

  volver() {
    this._router.navigate(['/']);
  }

}
