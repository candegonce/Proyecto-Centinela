import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mediciones-dispositivo',
  templateUrl: './mediciones-dispositivo.component.html',
  styleUrls: ['./mediciones-dispositivo.component.css']
})
export class MedicionesDispositivoComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  volver(){
      this.location.back();
  }
}
