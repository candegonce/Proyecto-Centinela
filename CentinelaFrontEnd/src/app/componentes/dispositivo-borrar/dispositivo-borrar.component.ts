import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivo-borrar',
  templateUrl: './dispositivo-borrar.component.html',
  styleUrls: ['./dispositivo-borrar.component.css']
})
export class DispositivoBorrarComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

    volver(){
      this.location.back();
  }
}
