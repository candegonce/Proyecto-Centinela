import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dispositivo-activo',
  templateUrl: './dispositivo-activo.component.html',
  styleUrls: ['./dispositivo-activo.component.css']
})
export class DispositivoActivoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

    volver(){
      this.location.back();
  }

}
