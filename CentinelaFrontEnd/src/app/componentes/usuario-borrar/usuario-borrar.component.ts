import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-borrar',
  templateUrl: './usuario-borrar.component.html',
  styleUrls: ['./usuario-borrar.component.css']
})
export class UsuarioBorrarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  volver(){
      this.location.back();
  }
}
