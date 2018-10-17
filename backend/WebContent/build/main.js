webpackJsonp([7],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_medicion_service_medicion_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usuario_service_usuario_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Chart } from "chart.js";


/**
 * Generated class for the SensorDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SensorDetallePage = /** @class */ (function () {
    function SensorDetallePage(navCtrl, navParams, medicionService, usuarioService, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.medicionService = medicionService;
        this.usuarioService = usuarioService;
        this.toast = toast;
        this.mediciones = [];
        this.estaLogueado = false;
        this.timer = __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].timer(10000, 1000);
        this.data = [];
        this.lineChartOptions = { responsive: true };
        this.lineChartType = "line";
        this.pieChartType = "pie";
        this.tipoIcono = "ios-stats";
        // Pie
        this.pieChartLabels = [
            "Download Sales",
            "In-Store Sales",
            "Mail Sales"
        ];
        this.pieChartData = [300, 500, 100];
        this.sensorParam = navParams.get("sensorP");
        if (this.usuarioService.usuarioLogueado.email != null) {
            this.estaLogueado = true;
        }
        else {
            this.estaLogueado = false;
        }
        console.log(this.estaLogueado);
        console.log(this.usuarioService.usuarioLogueado.email);
        console.log(this.sensorParam.nombreSensor);
    }
    SensorDetallePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.subscription = this.timer.subscribe(function (t) { return _this.armarGrafico(); });
        // this.armarGrafico();
        console.log("ionViewDidLoad SensorDetallePage");
    };
    SensorDetallePage.prototype.ionViewDidLeave = function () {
        this.subscription.unsubscribe();
        console.log("ionViewDidLeave SensorDetallePage");
    };
    SensorDetallePage.prototype.armarGrafico = function () {
        var _this = this;
        // ver que no traiga todas sino las últimas 5 ponele
        this.medicionService
            .obtenerMedicionesSensor(this.sensorParam.idSensor)
            .subscribe(function (response) {
            console.log(response);
            if (response != null) {
                _this.mediciones = response;
                // Junto las fechas, las temperaturas y el C02 de las mediciones Para el Grafico //
                _this.lineChartLabels = [];
                var temperaturas = [];
                var co2s = [];
                for (var _i = 0, _a = _this.mediciones; _i < _a.length; _i++) {
                    var medicion = _a[_i];
                    _this.lineChartLabels.push(medicion.fecha);
                    temperaturas.push(medicion.temperatura);
                    co2s.push(medicion.dioxidoCarbono);
                    console.log(medicion.fecha);
                }
                _this.lineChartData = [
                    { data: temperaturas, label: "Temperatura" },
                    { data: co2s, label: "CO2" }
                ];
            }
        }, function (error) {
            console.log(error);
        });
    };
    SensorDetallePage.prototype.randomizeType = function () {
        this.lineChartType = this.lineChartType === "line" ? "bar" : "line";
        this.pieChartType = this.pieChartType === "doughnut" ? "pie" : "doughnut";
        this.tipoIcono = this.tipoIcono === "analytics" ? "ios-stats" : "analytics";
    };
    SensorDetallePage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    SensorDetallePage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    //fin grafico///
    SensorDetallePage.prototype.agregarSensor = function () {
        var _this = this;
        this.usuarioService.usuarioLogueado.dispositivos.push(this.sensorParam);
        this.usuarioService
            .editarUsuario(this.usuarioService.usuarioLogueado)
            .subscribe(function (response) {
            // if (response.status == 200) {
            console.log("Sensor agregado a la lista del usuario correctamente.");
            //podría prescindir si un web service me retorna la coleccion bajo demanda.
            localStorage.setItem("sensoresDelUsuario", JSON.stringify(_this.usuarioService.usuarioLogueado.dispositivos));
            _this.toast
                .create({
                message: _this.sensorParam.nombreSensor + " agregado a mis sensores correctamente.",
                duration: 5000
            })
                .present();
            //    }
        }, function (error) {
            console.log(error);
            //  if (error.status == 409)
            _this.toast
                .create({
                message: "No se pudo agregar " + _this.sensorParam.nombreSensor + " a mis sensores.",
                duration: 5000
            })
                .present();
        });
    };
    SensorDetallePage.prototype.tengoDispositivo = function () {
        var misDispositivos = (JSON.parse(localStorage.getItem('sensoresDelUsuario')));
        for (var _i = 0, misDispositivos_1 = misDispositivos; _i < misDispositivos_1.length; _i++) {
            var s = misDispositivos_1[_i];
            if (s.idSensor == this.sensorParam.idSensor)
                return true;
        }
        return false;
    };
    SensorDetallePage.prototype.quitarSensor = function () {
        var _this = this;
        console.log(this.usuarioService.usuarioLogueado.dispositivos);
        var pos = -1;
        for (pos = 0; pos < this.usuarioService.usuarioLogueado.dispositivos.length; pos++) {
            if (this.usuarioService.usuarioLogueado.dispositivos[pos].idSensor === this.sensorParam.idSensor)
                break;
        }
        console.log(pos);
        if (pos > -1) {
            this.usuarioService.usuarioLogueado.dispositivos.splice(pos, 1);
            console.log(this.usuarioService.usuarioLogueado.dispositivos);
            this.usuarioService
                .editarUsuario(this.usuarioService.usuarioLogueado)
                .subscribe(function (response) {
                console.log("sensor" +
                    _this.sensorParam.nombreSensor +
                    " se ha quitado de la lista del usuario " +
                    _this.usuarioService.usuarioLogueado.email);
                localStorage.setItem("sensoresDelUsuario", JSON.stringify(_this.usuarioService.usuarioLogueado.dispositivos));
                _this.toast
                    .create({
                    message: _this.sensorParam.nombreSensor + " quitado de mis sensores correctamente.",
                    duration: 5000
                })
                    .present();
            }, function (error) {
                console.log(error);
                _this.toast
                    .create({
                    message: "No se pudo quitar " + _this.sensorParam.nombreSensor + " de mis sensores.",
                    duration: 5000
                })
                    .present();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])("lineCanvas"),
        __metadata("design:type", Object)
    ], SensorDetallePage.prototype, "lineCanvas", void 0);
    SensorDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: "page-sensor-detalle",template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\sensor-detalle\sensor-detalle.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Detalles del Sensor</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card>\n    <ion-card-header class="degrade" padding>\n      <ion-title color="dark">{{sensorParam.nombreSensor}} </ion-title>\n    </ion-card-header>\n\n    <ion-card-content class="fondo-elektu" style="margin-top:10%;">\n\n      <div>Estado : {{sensorParam.estado}}</div>\n      <div>Código : {{sensorParam.codigo}}</div>\n      <div>Batería : {{sensorParam.bateria}}</div>\n      <div>Ubicación</div>\n      <div>Calle : {{sensorParam.ubicacion.calle}}</div>\n      <div>Número : {{sensorParam.ubicacion.numero}}</div>\n      <div>Localidad : {{sensorParam.ubicacion.localidad}}</div>\n\n      <!--<canvas #lineCanvas></canvas> -->\n\n      <div *ngIf="mediciones.length> 0; then thenBlock else elseBlock"></div>\n      <ng-template #thenBlock>\n          \n\n        <!-- ** Grafico ** -->\n        <hr>\n        <div class="col-md-6">\n          <canvas baseChart\n            [datasets]="lineChartData"\n            [labels]="lineChartLabels"\n            [options]="lineChartOptions"\n            [chartType]="lineChartType"\n            (chartHover)="chartHovered($event)"\n            (chartClick)="chartClicked($event)">\n          </canvas>\n        </div>\n\n        <div class="col-md-12 text-center" style="margin-top: 10px;height: 50%">\n          <button (click)="randomizeType()" style="display: inline-block" float-right icon-start ion-button round> <ion-icon name="{{tipoIcono}}"></ion-icon> Cambiar</button>\n        </div>\n\n        <!-- ** Fin Grafico **   -->\n      </ng-template>\n      <ng-template #elseBlock><b>Por el momento no se registraron mediciones</b></ng-template>\n      <button *ngIf="estaLogueado == true && !tengoDispositivo()" ion-button\n        round color="secondary" (click)="agregarSensor()">Añadir a mis sensores</button>\n        <button *ngIf="estaLogueado == true && tengoDispositivo()" ion-button\n        round color="danger" (click)="quitarSensor()">Quitar de mis sensores</button>  \n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\sensor-detalle\sensor-detalle.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_medicion_service_medicion_service__["a" /* MedicionServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usuario_service_usuario_service__["a" /* UsuarioServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* ToastController */]])
    ], SensorDetallePage);
    return SensorDetallePage;
}());

//# sourceMappingURL=sensor-detalle.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_usuario__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the UsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UsuarioServiceProvider = /** @class */ (function () {
    function UsuarioServiceProvider(http) {
        this.http = http;
        this.misSensores = [];
        this.usuarioLogueado = new __WEBPACK_IMPORTED_MODULE_2__models_usuario__["a" /* Usuario */]();
        // this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/usuarios';
        this.url = 'http://localhost:8081/ProyectoCentinela/controladores/usuarios';
        // this.url = 'https://104.248.230.8/ProyectoCentinela/controladores/usuarios';
        console.log('Hello UsuarioServiceProvider Provider');
    }
    UsuarioServiceProvider.prototype.obtenerUsuarios = function () {
        return this.http.get(this.url + '/listar');
    };
    UsuarioServiceProvider.prototype.obtenerUsuario = function (id) {
        return this.http.get(this.url + '/obtener/' + id);
    };
    UsuarioServiceProvider.prototype.obtenerUsuarioPorEmail = function (email) {
        return this.http.get(this.url + '/obtenerPorEmail/' + email);
    };
    UsuarioServiceProvider.prototype.agregarUsuario = function (usuario) {
        return this.http.post(this.url + '/crear', usuario);
    };
    UsuarioServiceProvider.prototype.editarUsuario = function (usuario) {
        return this.http.put(this.url + '/editar', usuario);
    };
    UsuarioServiceProvider.prototype.borrarUsuario = function (id) {
        return this.http.delete(this.url + '/borrar/' + id);
    };
    UsuarioServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], UsuarioServiceProvider);
    return UsuarioServiceProvider;
}());

//# sourceMappingURL=usuario-service.js.map

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ubicacion; });
var Ubicacion = /** @class */ (function () {
    function Ubicacion() {
    }
    return Ubicacion;
}());

//# sourceMappingURL=ubicacion.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Usuario.fromJSON = function (json) {
        var object = Object.create(Usuario.prototype);
        Object.assign(object, json);
        return object;
    };
    return Usuario;
}());

//# sourceMappingURL=usuario.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mapa_elementos_mapa_elementos__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




/** Es importante considerar que este es un módulo hijo de appmodule, por lo que, si se va a usar el mapa,
 *  debe impostar el AgmCoreModule, aunque la apikey y el 'forRoot' lo debe hacer en el padre.
 * También importo el BrowserModule para usar el ngFor dentro de la componente
*/
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__mapa_elementos_mapa_elementos__["a" /* MapaElementosComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_2__agm_core__["a" /* AgmCoreModule */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__mapa_elementos_mapa_elementos__["a" /* MapaElementosComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 224:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 224;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		951,
		6
	],
	"../pages/home/home.module": [
		294
	],
	"../pages/lista-sensores/sensores-lista.module": [
		952,
		5
	],
	"../pages/login/login.module": [
		291
	],
	"../pages/mapa/mapa.module": [
		953,
		4
	],
	"../pages/mis-sensores/mis-sensores.module": [
		954,
		3
	],
	"../pages/register-sensor/register-sensor.module": [
		295
	],
	"../pages/register/register.module": [
		955,
		0
	],
	"../pages/sensor-detalle/sensor-detalle.module": [
		957,
		2
	],
	"../pages/usuario-cuenta/usuario-cuenta.module": [
		956,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 272;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedicionServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the MedicionServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var MedicionServiceProvider = /** @class */ (function () {
    // url : string = 'https://104.248.230.8/ProyectoCentinela/controladores/mediciones'
    function MedicionServiceProvider(http) {
        this.http = http;
        // url : string = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/mediciones';
        this.url = 'http://localhost:8081/ProyectoCentinela/controladores/mediciones';
        console.log('Hello MedicionServiceProvider Provider');
    }
    MedicionServiceProvider.prototype.obtenerMediciones = function () {
        return this.http.get(this.url + '/listar');
    };
    MedicionServiceProvider.prototype.obtenerMedicionesSensor = function (idSensor) {
        return this.http.get(this.url + '/medicionesSensor/' + idSensor);
    };
    MedicionServiceProvider.prototype.obtenerMedicion = function (id) {
        return this.http.get(this.url + '/obtener/' + id);
    };
    MedicionServiceProvider.prototype.agregarMedicion = function (medicion) {
        return this.http.post(this.url + '/crear', medicion);
    };
    MedicionServiceProvider.prototype.editarMedicion = function (medicion) {
        return this.http.put(this.url + '/editar', medicion);
    };
    MedicionServiceProvider.prototype.borrarMedicion = function (id) {
        return this.http.delete(this.url + '/borrar/' + id);
    };
    MedicionServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], MedicionServiceProvider);
    return MedicionServiceProvider;
}());

//# sourceMappingURL=medicion-service.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sensor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ubicacion__ = __webpack_require__(158);

var Sensor = /** @class */ (function () {
    function Sensor() {
        this.ubicacion = new __WEBPACK_IMPORTED_MODULE_0__ubicacion__["a" /* Ubicacion */]();
    }
    return Sensor;
}());

//# sourceMappingURL=Sensor.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaElementosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_sensor_service_sensor_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_ubicacion__ = __webpack_require__(158);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* global google */



/**
 * Generated class for the MapaElementosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MapaElementosComponent = /** @class */ (function () {
    function MapaElementosComponent(sensorService) {
        this.sensorService = sensorService;
        this.sensores = [];
        this.icon = {
            url: './assets/imgs/icons8-rfid-signal-100.png',
            scaledSize: {
                height: 40,
                width: 40
            }
        };
        this.ubicacion = new __WEBPACK_IMPORTED_MODULE_2__models_ubicacion__["a" /* Ubicacion */]();
        this.ubicacionSeleccion = new __WEBPACK_IMPORTED_MODULE_2__models_ubicacion__["a" /* Ubicacion */]();
        /* Esto es para que emita las coordenadas al componente padre */
        this.emisorDeEvento = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        // ubicación para centrar el mapa
        this.zoom = 15;
        console.log("ejecutado constructor");
        // configuro la posición inicial
        this.ubicacion.latitud = -34.9204948;
        this.ubicacion.longitud = -57.95356570000001;
    }
    MapaElementosComponent.prototype.ngOnInit = function () {
        console.log("ejecutado ngOnInit");
        if (!this.seleccionHabilitada) {
            this.obtenerSensores();
        }
        else {
            console.log("No entré al if de seleccion habilitada");
        }
        console.log(this.sensores);
    };
    MapaElementosComponent.prototype.obtenerSensores = function () {
        var _this = this;
        this.sensorService.obtenerSensores().subscribe(function (respuesta) {
            _this.sensores = respuesta;
            for (var _i = 0, _a = _this.sensores; _i < _a.length; _i++) {
                var sensor = _a[_i];
                sensor.ubicacion.latitud = parseFloat(sensor.ubicacion.latitud);
                sensor.ubicacion.longitud = parseFloat(sensor.ubicacion.longitud);
            }
            console.log(_this.sensores);
        });
    };
    MapaElementosComponent.prototype.ubicacionSeleccionada = function (event) {
        // capaz tengo que cambiar acá de tipo antes de emitirlo
        this.ubicacionSeleccion.latitud = Number(event.coords.lat);
        this.ubicacionSeleccion.longitud = Number(event.coords.lng);
        this.emisorDeEvento.emit(this.ubicacionSeleccion);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], MapaElementosComponent.prototype, "seleccionHabilitada", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], MapaElementosComponent.prototype, "emisorDeEvento", void 0);
    MapaElementosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "mapa-elementos",template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\components\mapa-elementos\mapa-elementos.html"*/'<agm-map #mapa [latitude]="ubicacion.latitud" [longitude]="ubicacion.longitud"\n\n  [zoom]="zoom" (mapClick)="!seleccionHabilitada ||\n\n  ubicacionSeleccionada($event)">\n\n\n\n  <div *ngIf="!seleccionHabilitada; then thenBlock else elseBlock"></div>\n\n  <ng-template #thenBlock>\n\n\n\n    <agm-marker #marker *ngFor="let sensor of sensores"\n\n      [iconUrl] = "icon"\n\n      [latitude]="sensor.ubicacion.latitud"\n\n      [longitude]="sensor.ubicacion.longitud"\n\n      animation="BOUNCE" [openInfoWindow]="true">\n\n      <agm-info-window [maxWidth]="150">\n\n        <strong style="color:black;">{{sensor.nombreSensor}}</strong>\n\n        <p style="color:darkslategray;">Código: {{sensor.codigo}}</p>\n\n        <p style="color: darkslategray;">Estado: {{sensor.estado}}</p>\n\n        <p style="color:darkslategray;">Batería: {{sensor.bateria}}</p>\n\n      </agm-info-window>\n\n    </agm-marker>\n\n\n\n  </ng-template>\n\n  <ng-template #elseBlock>\n\n    <agm-marker \n\n      [latitude]="ubicacionSeleccion.latitud"\n\n      [longitude]="ubicacionSeleccion.longitud"\n\n      [iconUrl] = "icon"\n\n      animation="BOUNCE" [openInfoWindow]="false">\n\n    </agm-marker>\n\n  </ng-template>\n\n\n\n</agm-map>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\components\mapa-elementos\mapa-elementos.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */]])
    ], MapaElementosComponent);
    return MapaElementosComponent;
}());

//# sourceMappingURL=mapa-elementos.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(292);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_usuario__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_service_usuario_service__ = __webpack_require__(106);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



//import { AuthServiceProvider } from './../../providers/auth-service/auth-service';




var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authFirebase, navParams, alertCtrl, loadingCtrl, event, usuarioService) {
        this.navCtrl = navCtrl;
        this.authFirebase = authFirebase;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.event = event;
        this.usuarioService = usuarioService;
        // registerCredentials = { email: '', password: '' };
        // user = {} as User;
        this.user = new __WEBPACK_IMPORTED_MODULE_5__models_usuario__["a" /* Usuario */]();
    }
    LoginPage.prototype.webGoogleLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, credential, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        provider = new __WEBPACK_IMPORTED_MODULE_0_firebase_app__["auth"].GoogleAuthProvider();
                        return [4 /*yield*/, this.authFirebase.auth.signInWithPopup(provider)];
                    case 1:
                        credential = _a.sent();
                        if (credential != null) {
                            console.log("Ingresa con credenciales");
                            this.event.publish('user:logueado');
                        }
                        console.log("CREDENCIALES, USUARIO GOOGLE----->");
                        console.log(credential.user);
                        this.navCtrl.setRoot('HomePage').catch(function (error) {
                            console.log("Didn't set nav root: " + error);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.webFacebookLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var provider, credential, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        provider = new __WEBPACK_IMPORTED_MODULE_0_firebase_app__["auth"].FacebookAuthProvider();
                        return [4 /*yield*/, this.authFirebase.auth.signInWithPopup(provider)];
                    case 1:
                        credential = _a.sent();
                        console.log("CREDENCIALES FACEBOOK----->");
                        console.log(credential);
                        this.navCtrl.setRoot('HomePage');
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                result = this.authFirebase.auth.signInWithEmailAndPassword(user.email, user.password);
                if (result) {
                    console.log("RESULT SOLO ::::::::::::");
                    console.log(result);
                    this.showLoading();
                    // no le pregunto por el password porque supuestamente firebase lo chequeó con el UID
                    this.usuarioService.obtenerUsuarioPorEmail(user.email)
                        .subscribe(function (usr) {
                        _this.usuarioService.usuarioLogueado = usr;
                        console.log(usr);
                        console.log("El usuario logueado que se guardo en el service es:" + _this.usuarioService.usuarioLogueado.email);
                        // Esto lo hago así porque vi que lo están usado así, pero guardar el usuario en el localstorage es una guasada
                        localStorage.setItem('sensoresDelUsuario', JSON.stringify(usr.dispositivos));
                        _this.event.publish('user:logueado');
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                        _this.loading.dismissAll();
                    });
                }
                else {
                    this.showError("Los datos ingresados son incorrectos");
                }
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.irARegistro = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        this.loading.dismiss();
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> Login </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="login-content" padding>\n\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n     <!-- <img src="../../assets/imgs/icons8-rfid-signal-100.png" style="width: 100%;"/> -->\n      <img src="./assets/imgs/icons8-rfid-signal-100.png" style="width: 100%;"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n\n  <div class="login-box">\n\n    <!-- Esto es para loguearse con usuario y contraseña -->\n\n    <form (ngSubmit)="login(user)" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-icon name="mail" item-start style="margin-left:2%;"></ion-icon> \n              <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-icon name="lock" item-start style="margin-left:2%;"></ion-icon>\n              <ion-input type="password" placeholder="Contraseña" name="password" [(ngModel)]="user.password" required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" color="primary" [disabled]="!registerForm.form.valid">Login</button>\n        </ion-col>\n      </ion-row>\n      \n    </form>\n    \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button full (click)="irARegistro()" color="secondary">Registrarse</button>\n        </ion-col>\n      </ion-row>\n\n    <!-- fin logueo con usuario y contraseña -->\n\n      <!-- <button color="azulado" ion-button icon-start full (click)="webFacebookLogin()">\n        <ion-icon name="logo-facebook"></ion-icon>\n        <p style="margin-left: 10%;"> Ingresar con Facebook</p>\n      </button>\n\n      <button color="danger" ion-button full (click)="webGoogleLogin()">\n        <ion-icon name="logo-googleplus"></ion-icon>\n        <p style="margin-left: 10%;"> Ingresar con google</p>\n      </button>\n\n      <button color="light" ion-button full>\n        <ion-icon name="logo-twitter"></ion-icon>\n        <p style="margin-left: 10%;">Ingresar Twitter</p>\n      </button> -->\n    \n  </div>\n</ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_6__providers_usuario_service_usuario_service__["a" /* UsuarioServiceProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
//import { LoginPage } from '../login/login';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, authFirebase, toast) {
        this.navCtrl = navCtrl;
        this.authFirebase = authFirebase;
        this.toast = toast;
        this.imagenHome = "./assets/imgs/CO2Home.jpg";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.authFirebase.authState.subscribe(function (firebaseUserRes) {
            _this.firebaseUser = firebaseUserRes;
            if (firebaseUserRes && firebaseUserRes.email && firebaseUserRes.uid) {
                _this.toast.create({
                    message: "Bienvenido al sistema Centinela de medici\u00F3n de CO2 " + firebaseUserRes.email,
                    duration: 5000
                }).present();
            }
            else {
                _this.toast.create({
                    message: 'Al parecer no tiene la sesión iniciada, vuelva a loguearse',
                    duration: 5000
                }).present();
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], HomePage.prototype, "nav", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\home\home.html"*/'<!--\n\n  Generated template for the HomePage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header #content>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Inicio</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding class="card-background-page">\n\n  <ion-card style="height: 100%;">\n\n\n\n    <!-- <h1>Bienvenid@</h1> -->\n\n    <img [src]="imagenHome" class="d-block" style="height: 100%;">\n\n    <div class="card-title">Proyecto Centinela</div>\n\n    <div class="card-subtitle">Sistema medidor de dióxido de carbono en el ambiente por medio de sensores</div>\n\n    \n\n  </ion-card>\n\n\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_0__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__home__["a" /* HomePage */]),
            ],
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterSensorPageModule", function() { return RegisterSensorPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_sensor__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var RegisterSensorPageModule = /** @class */ (function () {
    function RegisterSensorPageModule() {
    }
    RegisterSensorPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register_sensor__["a" /* RegisterSensorPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__register_sensor__["a" /* RegisterSensorPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ]
        })
    ], RegisterSensorPageModule);
    return RegisterSensorPageModule;
}());

//# sourceMappingURL=register-sensor.module.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterSensorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sensor_service_sensor_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Sensor__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_ubicacion__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_mapa_elementos_mapa_elementos__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/* global google */






/**
 * Generated class for the RegisterSensorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterSensorPage = /** @class */ (function () {
    function RegisterSensorPage(navCtrl, navParams, sensorService, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorService = sensorService;
        this.toast = toast;
        this.sensor = new __WEBPACK_IMPORTED_MODULE_3__models_Sensor__["a" /* Sensor */]();
        this.ubicacion = new __WEBPACK_IMPORTED_MODULE_4__models_ubicacion__["a" /* Ubicacion */]();
    }
    RegisterSensorPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("ionViewDidLoad RegisterSensorPage");
        this.mapaHijo.seleccionHabilitada = true;
        this.mapaHijo.emisorDeEvento.subscribe(function (res) {
            _this.ubicacion.latitud = res.latitud;
            _this.ubicacion.longitud = res.longitud;
            console.log("Latitud" + _this.ubicacion.latitud + " longitud " + _this.ubicacion.longitud);
        });
    };
    // async register(s: Sensor, u: Ubicacion) {
    //   try {
    //     s.bateria = 100;
    //     s.estado = "ACTIVO";
    //     //pongo valores por defecto en las coordenadas
    //     u.latitud = -34.9204948;
    //     u.longitud = -57.95356570000001;
    //     s.ubicacion = u;
    //     console.log(s);
    //     this.sensorService.agregarSensor(s).subscribe(
    //       response => {
    //         console.log("Sensor creado correctamente:");
    //         this.toast
    //           .create({
    //             message: `${s.nombreSensor} registrado correctamente.`,
    //             duration: 5000
    //           })
    //           .present();
    //       },
    //       error => {
    //         console.log(<any>error);
    //         this.toast
    //           .create({
    //             message: `Sensor con código ${s.codigo} ya existe.`,
    //             duration: 5000
    //           })
    //           .present();
    //       }
    //     );
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    RegisterSensorPage.prototype.register = function () {
        var _this = this;
        this.sensor.ubicacion.latitud = this.ubicacion.latitud;
        this.sensor.ubicacion.longitud = this.ubicacion.longitud;
        this.sensor.bateria = 100;
        this.sensor.estado = "ACTIVO";
        console.log(this.sensor);
        this.sensorService.agregarSensor(this.sensor).subscribe(function (response) {
            console.log("Sensor creado correctamente:");
            _this.toast
                .create({
                message: _this.sensor.nombreSensor + " registrado correctamente.",
                duration: 5000
            })
                .present();
        }, function (error) {
            console.log(error);
            _this.toast
                .create({
                message: "Sensor con c\u00F3digo " + _this.sensor.codigo + " ya existe.",
                duration: 5000
            })
                .present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('mapaHijo'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_5__components_mapa_elementos_mapa_elementos__["a" /* MapaElementosComponent */])
    ], RegisterSensorPage.prototype, "mapaHijo", void 0);
    RegisterSensorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-register-sensor",template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\register-sensor\register-sensor.html"*/'<!--\n\n  Generated template for the RegisterSensorPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Registro de Sensor</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-label>Nombre</ion-label>\n\n      <ion-input type="text" [(ngModel)]="sensor.nombreSensor"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Código</ion-label>\n\n      <ion-input type="number" [(ngModel)]="sensor.codigo"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-list-header>\n\n      Ubicación\n\n    </ion-list-header>\n\n\n\n    <ion-item>\n\n      <ion-label>Calle</ion-label>\n\n      <ion-input type="text" [(ngModel)]="sensor.ubicacion.calle"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Número</ion-label>\n\n      <ion-input type="number" [(ngModel)]="sensor.ubicacion.numero"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Localidad</ion-label>\n\n      <ion-input type="text" [(ngModel)]="sensor.ubicacion.localidad"></ion-input>\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <mapa-elementos #mapaHijo [seleccionHabilitada]="true"></mapa-elementos>\n\n  <!-- <mapa-elementos #mapaHijo></mapa-elementos> -->\n\n\n\n  <div padding>\n\n    <button ion-button block full color="primary" (click)="register()">Registrar sensor</button>\n\n  </div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\register-sensor\register-sensor.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], RegisterSensorPage);
    return RegisterSensorPage;
}());

//# sourceMappingURL=register-sensor.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationPropertiesServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ApplicationPropertiesServiceProvider = /** @class */ (function () {
    function ApplicationPropertiesServiceProvider(http) {
        this.http = http;
        // public url : 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores';
        // public url : 'https://104.248.230.8/ProyectoCentinela/controladores'
        this.header = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
            'Content-Type': 'application/json',
        });
        console.log('Hello ApplicationPropertiesServiceProvider Provider');
    }
    ApplicationPropertiesServiceProvider.prototype.getUrlBasic = function () {
        return this.url;
    };
    ApplicationPropertiesServiceProvider.prototype.getElementoVotablePublicoUrl = function () {
        return '/loged/elementoVotable/';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlParametros = function () {
        return this.url + '/parametros';
    };
    ApplicationPropertiesServiceProvider.prototype.postUsuarioOrganizador = function () {
        return this.url + '/usuario';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlElementoVotable = function () {
        return this.url + '/elementoVotable';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlElementoVotablePublico = function () {
        return this.url + '/public';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlRol = function () {
        return this.url + '/rol';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlPermiso = function () {
        return this.url + '/permiso';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlUsuario = function () {
        return this.url + '/usuario';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlLogin = function () {
        return this.url + '/login';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlSession = function () {
        return this.url + '/session';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlSolicitud = function () {
        return this.url + '/evento/solicitud';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlEvento = function () {
        return this.url + '/evento';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlEventosPorRol = function () {
        return this.url + '/usuario/eventos';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlSolcial = function () {
        return this.url + '/social';
    };
    ApplicationPropertiesServiceProvider.prototype.getHeader = function () {
        return this.header;
    };
    ApplicationPropertiesServiceProvider.prototype.addHeadOption = function (name, value) {
        this.header.set(name, value);
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlVotos = function () {
        return this.url + '/voto';
    };
    ApplicationPropertiesServiceProvider.prototype.getUrlImage = function () {
        return this.url + '/image';
    };
    ApplicationPropertiesServiceProvider.prototype.getUnicoEventoCreadoId = function () {
        return 1;
    };
    ApplicationPropertiesServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ApplicationPropertiesServiceProvider);
    return ApplicationPropertiesServiceProvider;
}());

//# sourceMappingURL=application-properties-service.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var User = /** @class */ (function () {
    function User(email, name) {
        this.name = name;
        this.email = email;
    }
    return User;
}());

var AuthServiceProvider = /** @class */ (function () {
    function AuthServiceProvider(authFirebase, event) {
        this.authFirebase = authFirebase;
        this.event = event;
        //// Agregado de funciones para probar el correcto cambio de menus segun 
        //// este logueado o no este loguado
        this.HAS_LOGGED_IN = false;
    }
    AuthServiceProvider.prototype.login = function (credentials) {
        var _this = this;
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                // At this point make a request to your backend to make a real check!
                var access = (credentials.password === "pass" && credentials.email === "email");
                _this.currentUser = new User('Simon', 'saimon@devdactic.com');
                observer.next(access);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw("Please insert credentials");
        }
        else {
            // At this point store the credentials to your backend!
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.signOut = function () {
        this.authFirebase.auth.signOut();
        this.event.publish('user:logout');
        console.log(this.authFirebase.auth.currentUser);
    };
    AuthServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */]])
    ], AuthServiceProvider);
    return AuthServiceProvider;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\about\about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n		<ion-title> Acerca de ...</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\about\about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensoresListaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sensor_detalle_sensor_detalle__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sensor_service_sensor_service__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ConcursanteListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SensoresListaPage = /** @class */ (function () {
    function SensoresListaPage(navCtrl, navParams, sensorService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorService = sensorService;
        this.sensores = [];
    }
    SensoresListaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad SensoresListaPage');
        this.sensorService.obtenerSensores()
            .subscribe(function (respuesta) { return _this.sensores = respuesta; });
    };
    SensoresListaPage.prototype.verDetalleSensor = function (sensor) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__sensor_detalle_sensor_detalle__["a" /* SensorDetallePage */], { sensorP: sensor })
            .catch(function (error) {
            console.log("Didn't set nav root: " + error);
        });
    };
    SensoresListaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-sensores-lista',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\lista-sensores\sensores-lista.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lista de sensores</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding class="degrade">\n  <ion-list>\n    <button *ngFor="let sensor of sensores" ion-item (click)="verDetalleSensor(sensor)">{{sensor.nombreSensor}}</button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\lista-sensores\sensores-lista.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */]])
    ], SensoresListaPage);
    return SensoresListaPage;
}());

//# sourceMappingURL=sensores-lista.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* global google */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { AgmMap } from '@agm/core';
/**
 * Generated class for the MapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapaPage = /** @class */ (function () {
    // @ViewChild('mapaAGM') mapa: AgmMap;
    function MapaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MapaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapaPage');
        // this.mapa.triggerResize();
    };
    MapaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mapa',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\mapa\mapa.html"*/'<ion-header>\n\n\n\n    <ion-navbar>\n\n        <button ion-button menuToggle>\n\n          <ion-icon name="menu"></ion-icon>\n\n        </button>\n\n        <ion-title> Mapa</ion-title>\n\n      </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <mapa-elementos #mapaAGM [seleccionHabilitada]="false" style="height: 600px; width: 800px;"></mapa-elementos>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\mapa\mapa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisSensoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sensor_detalle_sensor_detalle__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { SensorServiceProvider } from '../../providers/sensor-service/sensor-service';

/**
 * Generated class for the MisSensoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MisSensoresPage = /** @class */ (function () {
    function MisSensoresPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensores = [];
    }
    MisSensoresPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisSensoresPage');
        // this.sensorService.obtenerSensores()
        //   .subscribe((respuesta: Sensor[]) => this.sensores = respuesta);
        // esto se carga cuando se loguea, aunque debería ser un servicio...yo lo cargo sin localstorage
        console.log(localStorage.getItem('sensoresDelUsuario'));
        // la onda sería hacer obtenerSensores(idUsuarioLogueado)
        this.sensores = (JSON.parse(localStorage.getItem('sensoresDelUsuario')));
    };
    MisSensoresPage.prototype.verDetalleSensor = function (sensor) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__sensor_detalle_sensor_detalle__["a" /* SensorDetallePage */], { sensorP: sensor })
            .catch(function (error) {
            console.log("Didn't set nav root: " + error);
        });
    };
    MisSensoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mis-sensores',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\mis-sensores\mis-sensores.html"*/'<ion-header>\n\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Mis sensores</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content no-padding class="degrade">\n    <ion-list>\n      <button *ngFor="let sensor of sensores" ion-item (click)="verDetalleSensor(sensor)">{{sensor.nombreSensor}}</button>\n    </ion-list>\n  </ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\mis-sensores\mis-sensores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], MisSensoresPage);
    return MisSensoresPage;
}());

//# sourceMappingURL=mis-sensores.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioCuentaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UsuarioCuentaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsuarioCuentaPage = /** @class */ (function () {
    function UsuarioCuentaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    UsuarioCuentaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UsuarioCuentaPage');
    };
    UsuarioCuentaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-usuario-cuenta',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\usuario-cuenta\usuario-cuenta.html"*/'<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Cuenta</ion-title>\n      </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\usuario-cuenta\usuario-cuenta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], UsuarioCuentaPage);
    return UsuarioCuentaPage;
}());

//# sourceMappingURL=usuario-cuenta.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(583);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 583:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_application_properties_service_application_properties_service__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_sensor_detalle__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_consultorios_service_consultorios_service__ = __webpack_require__(883);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_evento_service_evento_service__ = __webpack_require__(891);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_firebase_config__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_http__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_list_list__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login_module__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_component__ = __webpack_require__(896);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_subscriptions_subscriptions__ = __webpack_require__(900);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_firebase_messaging_firebase_messaging__ = __webpack_require__(901);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_sensor_service_sensor_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_usuario_service_usuario_service__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_home_home_module__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_charts__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_medicion_service_medicion_service__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_register_sensor_register_sensor_module__ = __webpack_require__(295);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//import { AboutPage } from './../pages/about/about';







//import { SensoresListaPage } from '../pages/lista-sensores/sensores-lista';







//import { LoginPage } from './../pages/login/login';

// import { MapaElementosComponent } from '../components/mapa-elementos/mapa-elementos';

//import { RegisterPage } from '../pages/register/register';






//import { HomePage } from "../pages/home/home";



// import { RegisterPage } from "../pages/register/register";
// import { RegisterSensorPage } from "../pages/register-sensor/register-sensor";

var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_list_list__["a" /* ListPage */],
                // LoginPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_sensor_detalle__["a" /* SensorDetallePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: "AIzaSyCpszN1Ybdwa0-UtXJGfBrPIXjagB6Jmr4" }),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lista-sensores/sensores-lista.module#SensoresListaPageModule', name: 'SensoresListaPage', segment: 'sensores-lista', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa/mapa.module#MapaPageModule', name: 'MapaPage', segment: 'mapa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-sensores/mis-sensores.module#MisSensoresPageModule', name: 'MisSensoresPage', segment: 'mis-sensores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register-sensor/register-sensor.module#RegisterSensorPageModule', name: 'RegisterSensorPage', segment: 'register-sensor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/usuario-cuenta/usuario-cuenta.module#UsuarioCuentaPageModule', name: 'UsuarioCuentaPage', segment: 'usuario-cuenta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sensor-detalle/sensor-detalle.module#SensorDetallePageModule', name: 'SensorDetallePage', segment: 'sensor-detalle', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_26_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_28__pages_register_sensor_register_sensor_module__["RegisterSensorPageModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_list_list__["a" /* ListPage */],
                // LoginPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_sensor_detalle__["a" /* SensorDetallePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_10__providers_consultorios_service_consultorios_service__["a" /* ConsultoriosServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_21__providers_subscriptions_subscriptions__["a" /* SubscriptionsProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_evento_service_evento_service__["a" /* EventoServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_5__providers_application_properties_service_application_properties_service__["a" /* ApplicationPropertiesServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__["a" /* AngularFireAuth */],
                __WEBPACK_IMPORTED_MODULE_22__providers_firebase_messaging_firebase_messaging__["a" /* FirebaseMessagingProvider */],
                __WEBPACK_IMPORTED_MODULE_23__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_usuario_service_usuario_service__["a" /* UsuarioServiceProvider */],
                __WEBPACK_IMPORTED_MODULE_27__providers_medicion_service_medicion_service__["a" /* MedicionServiceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 883:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultoriosServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(343);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the ConsultoriosServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ConsultoriosServiceProvider = /** @class */ (function () {
    function ConsultoriosServiceProvider(httpClient, http) {
        this.httpClient = httpClient;
        this.http = http;
        this.headers = new Headers({ 'Content-type': 'Application/json' });
        this.token = 'dXNlcl9ndWFyYW5pOjEyMzQ1Ng==';
        /* Está hardcodeado el usuario y contraseña en la url para probar, después ver como mando bien los headers */
        this.url = 'https://helmut-test.dat.cespi.unlp.edu.ar/api/helmut/';
        console.log('Hello ConsultoriosServiceProvider Provider');
        this.headers.append('Authorization', 'Basic ' + this.token);
        this.headers.append('Accept', 'Application/json');
        var authorization = this.http.getBasicAuthHeader('user_guarani', '123456');
        console.log(authorization);
        // this.http.setHeader(this.url, 'Authorization', Authorization);
    }
    ConsultoriosServiceProvider.prototype.obtenerConsultorios = function () {
        return this.httpClient.post(this.url + 'consultorios', { headers: this.headers });
    };
    ConsultoriosServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
    ], ConsultoriosServiceProvider);
    return ConsultoriosServiceProvider;
}());

//# sourceMappingURL=consultorios-service.js.map

/***/ }),

/***/ 891:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventoServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_EventoVO__ = __webpack_require__(892);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application_properties_service_application_properties_service__ = __webpack_require__(336);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the EventoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var EventoServiceProvider = /** @class */ (function () {
    function EventoServiceProvider(http, properties) {
        this.http = http;
        this.properties = properties;
        this.eventoActual = new __WEBPACK_IMPORTED_MODULE_2__models_EventoVO__["a" /* EventoVO */]();
        console.log('Hello EventoServiceProvider Provider');
    }
    EventoServiceProvider.prototype.get = function (eventoId) {
        var _this = this;
        //return this.http.get<EventoVO>("https://demo2156175.mockable.io/evento/1");
        this.http.get(this.properties.getUrlEvento() + "/" + eventoId)
            .subscribe(function (ev) {
            _this.eventoActual = ev;
            _this.eventoActual.fecha_fin_votacion["month"] += 1;
        });
        return this.http.get(this.properties.getUrlEvento() + "/" + eventoId);
    };
    EventoServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__application_properties_service_application_properties_service__["a" /* ApplicationPropertiesServiceProvider */]])
    ], EventoServiceProvider);
    return EventoServiceProvider;
}());

//# sourceMappingURL=evento-service.js.map

/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventoVO; });
var EventoVO = /** @class */ (function () {
    function EventoVO() {
    }
    return EventoVO;
}());

//# sourceMappingURL=EventoVO.js.map

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
/** Para configurar la inicialización de firebase */
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyDFnMxuZ2xpW6ap8UVUfLgW4Agda42nCSU",
    authDomain: "centinelafront.firebaseapp.com",
    databaseURL: "https://centinelafront.firebaseio.com",
    projectId: "centinelafront",
    storageBucket: "centinelafront.appspot.com",
    messagingSenderId: "24599960754"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');
        // Let's populate this page with some filler content for funzies
        this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
            'american-football', 'boat', 'bluetooth', 'build'];
        this.items = [];
        for (var i = 1; i < 11; i++) {
            this.items.push({
                title: 'Item ' + i,
                note: 'This is item #' + i,
                icon: this.icons[Math.floor(Math.random() * this.icons.length)]
            });
        }
    }
    ListPage_1 = ListPage;
    ListPage.prototype.itemTapped = function (event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(ListPage_1, {
            item: item
        });
    };
    var ListPage_1;
    ListPage = ListPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-list',template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lista de ejemplo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 896:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_about_about__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_register_sensor_register_sensor__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_lista_sensores_sensores_lista__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_mapa_mapa__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_usuario_cuenta_usuario_cuenta__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_util__ = __webpack_require__(897);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_mis_sensores_mis_sensores__ = __webpack_require__(479);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { SensorDetallePage } from './../pages/sensor-detalle/sensor-detalle';


//import { HomePage } from './../pages/home/home';







var MyApp = /** @class */ (function () {
    function MyApp(platform, events, statusBar, splashScreen, auth, menu, authFirebase) {
        this.platform = platform;
        this.events = events;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.auth = auth;
        this.menu = menu;
        this.authFirebase = authFirebase;
        this.paginasComunes = [
            { title: 'Sensores', name: 'SensoresListaPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_lista_sensores_sensores_lista__["a" /* SensoresListaPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_6__pages_lista_sensores_sensores_lista__["a" /* SensoresListaPage */], index: 0, icon: 'analytics' },
            { title: 'Registrar Sensor', name: 'RegisterSensorPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_register_sensor_register_sensor__["a" /* RegisterSensorPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_5__pages_register_sensor_register_sensor__["a" /* RegisterSensorPage */], index: 1, icon: 'add-circle' },
            { title: 'Mapa', name: 'MapaPage', component: __WEBPACK_IMPORTED_MODULE_8__pages_mapa_mapa__["a" /* MapaPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_8__pages_mapa_mapa__["a" /* MapaPage */], index: 2, icon: 'map' },
            { title: 'Acerca de', name: 'AboutPage', component: __WEBPACK_IMPORTED_MODULE_2__pages_about_about__["a" /* AboutPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_2__pages_about_about__["a" /* AboutPage */], index: 3, icon: 'information-circle' }
        ];
        this.loggedOutPages = [
            { title: 'Iniciar Sesión', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */], index: 0, icon: 'log-in' }
        ];
        this.loggedInPages = [
            { title: 'Mis sensores', name: 'MisSensoresPage', component: __WEBPACK_IMPORTED_MODULE_13__pages_mis_sensores_mis_sensores__["a" /* MisSensoresPage */], index: 0, icon: 'bookmarks' },
            { title: 'Cuenta', name: 'UsuarioCuentaPage', component: __WEBPACK_IMPORTED_MODULE_11__pages_usuario_cuenta_usuario_cuenta__["a" /* UsuarioCuentaPage */], index: 1, icon: 'contact' },
            { title: 'Cerrar Sesión', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */], index: 2, icon: 'log-out' }
        ];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */];
        if (Object(__WEBPACK_IMPORTED_MODULE_12_util__["isNullOrUndefined"])(this.authFirebase.auth.currentUser)) {
            console.log("No hay una sesion iniciada");
            this.enableMenu(false);
        }
        else {
            console.log("Hay una sesion iniciada");
            this.enableMenu(true);
        }
        this.initializeApp();
        this.listenToLoginEvents();
    }
    MyApp.prototype.ngOnInit = function () {
    };
    MyApp.prototype.enableMenu = function (loggedIn) {
        this.menu.enable(loggedIn, 'loggedInMenu');
        this.menu.enable(!loggedIn, 'loggedOutMenu');
    };
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe('user:logueado', function () {
            console.log("El usuario acaba de iniciar sesion");
            _this.enableMenu(true);
        });
        this.events.subscribe('user:signup', function () {
            _this.enableMenu(true);
        });
        this.events.subscribe('user:logout', function () {
            console.log("El usuario acaba de cerrar sesion");
            _this.enableMenu(false);
        });
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.signOut = function () {
        this.auth.signOut();
        this.events.publish('user:logout');
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */]).catch(function (err) {
            console.log("Didn't set nav root: " + err);
        });
    };
    MyApp.prototype.openPage = function (page) {
        var params = {};
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (this.nav.getActiveChildNavs().length && page.index != undefined) {
            this.nav.getActiveChildNavs()[0].select(page.index);
        }
        else {
            console.log("entro al else de openPage");
            console.log(page.title == "Cerrar Sesión");
            if (page.title == "Cerrar Sesión") {
                console.log("Se cerrara la sesion");
                this.signOut();
            }
            else {
                this.nav.setRoot(page.name, params).catch(function (err) {
                    console.log("Didn't set nav root: " + err);
                });
            }
        }
    };
    MyApp.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNavs()[0];
        // Tabs are a special case because they have their own navigation
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        if (this.nav.getActive() && this.nav.getActive().name === page.name) {
            return 'primary';
        }
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Desarrollo\linti\Proyecto Centinela\front\src\app\app.html"*/'\n  <!-- Menu de usuario sin logearse  -->\n  <ion-menu id="loggedOutMenu" side="left" [content]="content">\n   \n      <ion-header>\n        <ion-toolbar color="primary">\n          <ion-title>Menu</ion-title>\n        </ion-toolbar>\n      </ion-header>\n  \n      <ion-content class="outer-content">\n        \n        <ion-list>\n          <ion-list-header>\n            Navegar\n          </ion-list-header>\n          <button ion-item menuClose *ngFor="let p of paginasComunes" (click)="openPage(p)">\n            <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n            {{p.title}}\n          </button>\n        </ion-list>\n          \n        <ion-list>\n          <ion-list-header>\n            Session\n          </ion-list-header>\n          <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">\n            <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n            {{p.title}}\n          </button>\n        </ion-list>\n  \n      </ion-content>\n  \n  </ion-menu>\n\n  <!-- Menu de usuario logueado -->\n  <ion-menu id="loggedInMenu" side="left" [content]="content">\n    \n    <ion-header>\n      <ion-toolbar color="primary">\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n        <ion-list-header>\n          Navegar\n        </ion-list-header>\n        <button ion-item menuClose *ngFor="let p of paginasComunes" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n\n      <ion-list>\n        <ion-list-header>\n          Session\n        </ion-list-header>\n        <button ion-item menuClose *ngFor="let p of loggedInPages" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>\n'/*ion-inline-end:"C:\Desarrollo\linti\Proyecto Centinela\front\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 900:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the SubscriptionsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SubscriptionsProvider = /** @class */ (function () {
    function SubscriptionsProvider(http) {
        this.http = http;
        /** La idea de este provider es tener un arreglo global de subscripciones para agregarlas en cada subscripcion
         *  poder hacer unsuscribe en caso de ser necesario */
        this._subscriptions = [];
        console.log('Hello SubscriptionsProvider Provider');
    }
    SubscriptionsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], SubscriptionsProvider);
    return SubscriptionsProvider;
}());

//# sourceMappingURL=subscriptions.js.map

/***/ }),

/***/ 901:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseMessagingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the FirebaseMessagingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var FirebaseMessagingProvider = /** @class */ (function () {
    function FirebaseMessagingProvider(http) {
        this.http = http;
        console.log('Hello FirebaseMessagingProvider Provider');
    }
    FirebaseMessagingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], FirebaseMessagingProvider);
    return FirebaseMessagingProvider;
}());

//# sourceMappingURL=firebase-messaging.js.map

/***/ }),

/***/ 932:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 353,
	"./af.js": 353,
	"./ar": 354,
	"./ar-dz": 355,
	"./ar-dz.js": 355,
	"./ar-kw": 356,
	"./ar-kw.js": 356,
	"./ar-ly": 357,
	"./ar-ly.js": 357,
	"./ar-ma": 358,
	"./ar-ma.js": 358,
	"./ar-sa": 359,
	"./ar-sa.js": 359,
	"./ar-tn": 360,
	"./ar-tn.js": 360,
	"./ar.js": 354,
	"./az": 361,
	"./az.js": 361,
	"./be": 362,
	"./be.js": 362,
	"./bg": 363,
	"./bg.js": 363,
	"./bm": 364,
	"./bm.js": 364,
	"./bn": 365,
	"./bn.js": 365,
	"./bo": 366,
	"./bo.js": 366,
	"./br": 367,
	"./br.js": 367,
	"./bs": 368,
	"./bs.js": 368,
	"./ca": 369,
	"./ca.js": 369,
	"./cs": 370,
	"./cs.js": 370,
	"./cv": 371,
	"./cv.js": 371,
	"./cy": 372,
	"./cy.js": 372,
	"./da": 373,
	"./da.js": 373,
	"./de": 374,
	"./de-at": 375,
	"./de-at.js": 375,
	"./de-ch": 376,
	"./de-ch.js": 376,
	"./de.js": 374,
	"./dv": 377,
	"./dv.js": 377,
	"./el": 378,
	"./el.js": 378,
	"./en-au": 379,
	"./en-au.js": 379,
	"./en-ca": 380,
	"./en-ca.js": 380,
	"./en-gb": 381,
	"./en-gb.js": 381,
	"./en-ie": 382,
	"./en-ie.js": 382,
	"./en-il": 383,
	"./en-il.js": 383,
	"./en-nz": 384,
	"./en-nz.js": 384,
	"./eo": 385,
	"./eo.js": 385,
	"./es": 386,
	"./es-do": 387,
	"./es-do.js": 387,
	"./es-us": 388,
	"./es-us.js": 388,
	"./es.js": 386,
	"./et": 389,
	"./et.js": 389,
	"./eu": 390,
	"./eu.js": 390,
	"./fa": 391,
	"./fa.js": 391,
	"./fi": 392,
	"./fi.js": 392,
	"./fo": 393,
	"./fo.js": 393,
	"./fr": 394,
	"./fr-ca": 395,
	"./fr-ca.js": 395,
	"./fr-ch": 396,
	"./fr-ch.js": 396,
	"./fr.js": 394,
	"./fy": 397,
	"./fy.js": 397,
	"./gd": 398,
	"./gd.js": 398,
	"./gl": 399,
	"./gl.js": 399,
	"./gom-latn": 400,
	"./gom-latn.js": 400,
	"./gu": 401,
	"./gu.js": 401,
	"./he": 402,
	"./he.js": 402,
	"./hi": 403,
	"./hi.js": 403,
	"./hr": 404,
	"./hr.js": 404,
	"./hu": 405,
	"./hu.js": 405,
	"./hy-am": 406,
	"./hy-am.js": 406,
	"./id": 407,
	"./id.js": 407,
	"./is": 408,
	"./is.js": 408,
	"./it": 409,
	"./it.js": 409,
	"./ja": 410,
	"./ja.js": 410,
	"./jv": 411,
	"./jv.js": 411,
	"./ka": 412,
	"./ka.js": 412,
	"./kk": 413,
	"./kk.js": 413,
	"./km": 414,
	"./km.js": 414,
	"./kn": 415,
	"./kn.js": 415,
	"./ko": 416,
	"./ko.js": 416,
	"./ky": 417,
	"./ky.js": 417,
	"./lb": 418,
	"./lb.js": 418,
	"./lo": 419,
	"./lo.js": 419,
	"./lt": 420,
	"./lt.js": 420,
	"./lv": 421,
	"./lv.js": 421,
	"./me": 422,
	"./me.js": 422,
	"./mi": 423,
	"./mi.js": 423,
	"./mk": 424,
	"./mk.js": 424,
	"./ml": 425,
	"./ml.js": 425,
	"./mn": 426,
	"./mn.js": 426,
	"./mr": 427,
	"./mr.js": 427,
	"./ms": 428,
	"./ms-my": 429,
	"./ms-my.js": 429,
	"./ms.js": 428,
	"./mt": 430,
	"./mt.js": 430,
	"./my": 431,
	"./my.js": 431,
	"./nb": 432,
	"./nb.js": 432,
	"./ne": 433,
	"./ne.js": 433,
	"./nl": 434,
	"./nl-be": 435,
	"./nl-be.js": 435,
	"./nl.js": 434,
	"./nn": 436,
	"./nn.js": 436,
	"./pa-in": 437,
	"./pa-in.js": 437,
	"./pl": 438,
	"./pl.js": 438,
	"./pt": 439,
	"./pt-br": 440,
	"./pt-br.js": 440,
	"./pt.js": 439,
	"./ro": 441,
	"./ro.js": 441,
	"./ru": 442,
	"./ru.js": 442,
	"./sd": 443,
	"./sd.js": 443,
	"./se": 444,
	"./se.js": 444,
	"./si": 445,
	"./si.js": 445,
	"./sk": 446,
	"./sk.js": 446,
	"./sl": 447,
	"./sl.js": 447,
	"./sq": 448,
	"./sq.js": 448,
	"./sr": 449,
	"./sr-cyrl": 450,
	"./sr-cyrl.js": 450,
	"./sr.js": 449,
	"./ss": 451,
	"./ss.js": 451,
	"./sv": 452,
	"./sv.js": 452,
	"./sw": 453,
	"./sw.js": 453,
	"./ta": 454,
	"./ta.js": 454,
	"./te": 455,
	"./te.js": 455,
	"./tet": 456,
	"./tet.js": 456,
	"./tg": 457,
	"./tg.js": 457,
	"./th": 458,
	"./th.js": 458,
	"./tl-ph": 459,
	"./tl-ph.js": 459,
	"./tlh": 460,
	"./tlh.js": 460,
	"./tr": 461,
	"./tr.js": 461,
	"./tzl": 462,
	"./tzl.js": 462,
	"./tzm": 463,
	"./tzm-latn": 464,
	"./tzm-latn.js": 464,
	"./tzm.js": 463,
	"./ug-cn": 465,
	"./ug-cn.js": 465,
	"./uk": 466,
	"./uk.js": 466,
	"./ur": 467,
	"./ur.js": 467,
	"./uz": 468,
	"./uz-latn": 469,
	"./uz-latn.js": 469,
	"./uz.js": 468,
	"./vi": 470,
	"./vi.js": 470,
	"./x-pseudo": 471,
	"./x-pseudo.js": 471,
	"./yo": 472,
	"./yo.js": 472,
	"./zh-cn": 473,
	"./zh-cn.js": 473,
	"./zh-hk": 474,
	"./zh-hk.js": 474,
	"./zh-tw": 475,
	"./zh-tw.js": 475
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 932;

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Sensor__ = __webpack_require__(280);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { ApplicationPropertiesServiceProvider } from '../application-properties-service/application-properties-service';

/*
  Generated class for the SensorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SensorServiceProvider = /** @class */ (function () {
    function SensorServiceProvider(http) {
        this.http = http;
        this.sensores = [];
        this.sensor = new __WEBPACK_IMPORTED_MODULE_2__models_Sensor__["a" /* Sensor */]();
        // this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores';
        this.url = 'http://localhost:8081/ProyectoCentinela/controladores/sensores';
        // this.url = 'https://104.248.230.8/ProyectoCentinela/controladores/sensores';
        console.log('Hello SensorServiceProvider Provider');
    }
    SensorServiceProvider.prototype.obtenerSensores = function () {
        return this.http.get(this.url + '/listar');
        // .subscribe((res : Sensor[]) => this.sensores = res);
    };
    SensorServiceProvider.prototype.obtenerSensor = function (id) {
        var _this = this;
        return this.http.get(this.url + '/obtener/' + id).subscribe(function (res) { return _this.sensor = res; });
    };
    // obtenerIdSensor(codigo: number) {
    //   return this.http.get(this.application + '/obtenerId/' + codigo).subscribe(res => res.json());
    // }  
    SensorServiceProvider.prototype.agregarSensor = function (sensor) {
        return this.http.post(this.url + '/crear', sensor);
    };
    SensorServiceProvider.prototype.editarSensor = function (sensor) {
        return this.http.put(this.url + '/editar', sensor);
    };
    SensorServiceProvider.prototype.borrarSensor = function (id) {
        return this.http.delete(this.url + '/borrar/' + id).subscribe(function (res) { return console.log(res); });
    };
    SensorServiceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], SensorServiceProvider);
    return SensorServiceProvider;
}());

//# sourceMappingURL=sensor-service.js.map

/***/ })

},[481]);
//# sourceMappingURL=main.js.map