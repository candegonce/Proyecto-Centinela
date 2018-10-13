webpackJsonp([7],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_usuario__ = __webpack_require__(174);
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
        this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/usuarios';
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

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export User */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(140);
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

/***/ 174:
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

/***/ 207:
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
webpackEmptyAsyncContext.id = 207;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		704,
		6
	],
	"../pages/home/home.module": [
		255
	],
	"../pages/lista-sensores/concursante-lista.module": [
		705,
		5
	],
	"../pages/login/login.module": [
		393
	],
	"../pages/mapa/mapa.module": [
		706,
		4
	],
	"../pages/mis-sensores/mis-sensores.module": [
		707,
		3
	],
	"../pages/register/register.module": [
		708,
		0
	],
	"../pages/sensor-detalle/concursante-detalle.module": [
		709,
		2
	],
	"../pages/usuario-cuenta/usuario-cuenta.module": [
		710,
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
webpackAsyncContext.id = 254;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home__ = __webpack_require__(256);
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

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, authFirebase, toast, authService) {
        this.navCtrl = navCtrl;
        this.authFirebase = authFirebase;
        this.toast = toast;
        this.authService = authService;
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
            selector: 'page-home',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\home\home.html"*/'<!--\n  Generated template for the HomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header #content>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Inicio</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <h1>Bienvenido a la página principal (Mejorar diseño)</h1>\n</ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_auth_service_auth_service__["a" /* AuthServiceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedicionServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
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
        this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/mediciones';
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

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(394);
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

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_usuario__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usuario_service_usuario_service__ = __webpack_require__(100);
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
                        localStorage.setItem('sensoresDelUsuario', JSON.stringify(usr.dispositivos)); // Esto lo hago así porque vi que lo están usado así, pero guardar el usuario en el localstorage es una guasada
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
            selector: 'page-login',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title> Login </ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="login-content" padding>\n\n  <ion-row class="logo-row">\n    <ion-col></ion-col>\n    <ion-col width-67>\n      <img src="../../assets/imgs/icons8-rfid-signal-100.png" style="width: 100%;"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n\n  <div class="login-box">\n\n    <!-- Esto es para loguearse con usuario y contraseña -->\n\n    <form (ngSubmit)="login(user)" #registerForm="ngForm">\n      <ion-row>\n        <ion-col>\n          <ion-list inset>\n\n            <ion-item>\n              <ion-icon name="mail" item-start style="margin-left:2%;"></ion-icon> \n              <ion-input type="email" placeholder="Email" name="email" [(ngModel)]="user.email" required></ion-input>\n            </ion-item>\n\n            <ion-item>\n              <ion-icon name="lock" item-start style="margin-left:2%;"></ion-icon>\n              <ion-input type="password" placeholder="Password" name="password" [(ngModel)]="user.password" required></ion-input>\n            </ion-item>\n\n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button class="submit-btn" full type="submit" color="primary" [disabled]="!registerForm.form.valid">Login</button>\n        </ion-col>\n      </ion-row>\n      \n    </form>\n    \n      <ion-row>\n        <ion-col class="signup-col">\n          <button ion-button full (click)="irARegistro()" color="secondary">Registrarse</button>\n        </ion-col>\n      </ion-row>\n\n    <!-- fin logueo con usuario y contraseña -->\n\n      <!-- <button color="azulado" ion-button icon-start full (click)="webFacebookLogin()">\n        <ion-icon name="logo-facebook"></ion-icon>\n        <p style="margin-left: 10%;"> Ingresar con Facebook</p>\n      </button>\n\n      <button color="danger" ion-button full (click)="webGoogleLogin()">\n        <ion-icon name="logo-googleplus"></ion-icon>\n        <p style="margin-left: 10%;"> Ingresar con google</p>\n      </button>\n\n      <button color="light" ion-button full>\n        <ion-icon name="logo-twitter"></ion-icon>\n        <p style="margin-left: 10%;">Ingresar Twitter</p>\n      </button> -->\n    \n  </div>\n</ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\login\login.html"*/,
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

/***/ 443:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationPropertiesServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
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

/***/ 448:
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
            selector: 'page-about',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\about\about.html"*/'<!--\n  Generated template for the AboutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n	<ion-navbar>\n		<button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n		<ion-title> Acerca de ...</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\about\about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConcursanteListaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sensor_detalle_concursante_detalle__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sensor_service_sensor_service__ = __webpack_require__(92);
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
var ConcursanteListaPage = /** @class */ (function () {
    function ConcursanteListaPage(navCtrl, navParams, sensorService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorService = sensorService;
        this.sensores = [];
    }
    ConcursanteListaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad ConcursanteListaPage');
        this.sensorService.obtenerSensores()
            .subscribe(function (respuesta) { return _this.sensores = respuesta; });
    };
    ConcursanteListaPage.prototype.verDetalleSensor = function (sensor) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__sensor_detalle_concursante_detalle__["a" /* ConcursanteDetallePage */], { sensorP: sensor })
            .catch(function (error) {
            console.log("Didn't set nav root: " + error);
        });
    };
    ConcursanteListaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-concursante-lista',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\lista-sensores\concursante-lista.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lista de sensores</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content no-padding class="degrade">\n  <ion-list>\n    <button *ngFor="let sensor of sensores" ion-item (click)="verDetalleSensor(sensor)">{{sensor.nombreSensor}}</button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\lista-sensores\concursante-lista.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */]])
    ], ConcursanteListaPage);
    return ConcursanteListaPage;
}());

//# sourceMappingURL=concursante-lista.js.map

/***/ }),

/***/ 450:
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
            selector: 'page-mapa',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\mapa\mapa.html"*/'/* global google */\n<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title> Mapa</ion-title>\n      </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <mapa-elementos #mapaAGM style="height: 600px; width: 800px;"></mapa-elementos>\n</ion-content>\n'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\mapa\mapa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], MapaPage);
    return MapaPage;
}());

//# sourceMappingURL=mapa.js.map

/***/ }),

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mapa_elementos_mapa_elementos__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__agm_core__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(49);
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

/***/ 452:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisSensoresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sensor_service_sensor_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sensor_detalle_concursante_detalle__ = __webpack_require__(99);
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
 * Generated class for the MisSensoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MisSensoresPage = /** @class */ (function () {
    function MisSensoresPage(navCtrl, navParams, sensorService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sensorService = sensorService;
        this.sensores = [];
    }
    MisSensoresPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConcursanteListaPage');
        // this.sensorService.obtenerSensores()
        //   .subscribe((respuesta: Sensor[]) => this.sensores = respuesta);
        console.log(localStorage.getItem('sensoresDelUsuario')); // esto se carga cuando se loguea, aunque debería ser un servicio...yo lo cargo sin localstorage
        // la onda sería hacer obtenerSensores(idUsuarioLogueado)
        this.sensores = (JSON.parse(localStorage.getItem('sensoresDelUsuario')));
    };
    MisSensoresPage.prototype.verDetalleSensor = function (sensor) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__sensor_detalle_concursante_detalle__["a" /* ConcursanteDetallePage */], { sensorP: sensor })
            .catch(function (error) {
            console.log("Didn't set nav root: " + error);
        });
    };
    MisSensoresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mis-sensores',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\mis-sensores\mis-sensores.html"*/'<ion-header>\n\n    <ion-navbar>\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title>Mis sensores</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content no-padding class="degrade">\n    <ion-list>\n      <button *ngFor="let sensor of sensores" ion-item (click)="verDetalleSensor(sensor)">{{sensor.nombreSensor}}</button>\n    </ion-list>\n  </ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\mis-sensores\mis-sensores.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */]])
    ], MisSensoresPage);
    return MisSensoresPage;
}());

//# sourceMappingURL=mis-sensores.js.map

/***/ }),

/***/ 453:
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
            selector: 'page-usuario-cuenta',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\usuario-cuenta\usuario-cuenta.html"*/'<ion-header>\n\n    <ion-navbar>\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Cuenta</ion-title>\n      </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\usuario-cuenta\usuario-cuenta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], UsuarioCuentaPage);
    return UsuarioCuentaPage;
}());

//# sourceMappingURL=usuario-cuenta.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(568);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_auth__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__agm_core__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_application_properties_service_application_properties_service__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_auth_service_auth_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_components_module__ = __webpack_require__(451);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_concursante_detalle__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_consultorios_service_consultorios_service__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_evento_service_evento_service__ = __webpack_require__(691);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_firebase_config__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_http__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(694);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_list_list__ = __webpack_require__(695);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login_module__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_component__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_status_bar__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_subscriptions_subscriptions__ = __webpack_require__(700);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_firebase_messaging_firebase_messaging__ = __webpack_require__(701);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_sensor_service_sensor_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_usuario_service_usuario_service__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_home_home_module__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_charts__ = __webpack_require__(702);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__providers_medicion_service_medicion_service__ = __webpack_require__(262);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_list_list__["a" /* ListPage */],
                // LoginPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_concursante_detalle__["a" /* ConcursanteDetallePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__agm_core__["a" /* AgmCoreModule */].forRoot({ apiKey: "AIzaSyCpszN1Ybdwa0-UtXJGfBrPIXjagB6Jmr4" }),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lista-sensores/concursante-lista.module#ConcursanteListaPageModule', name: 'ConcursanteListaPage', segment: 'concursante-lista', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mapa/mapa.module#MapaPageModule', name: 'MapaPage', segment: 'mapa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-sensores/mis-sensores.module#MisSensoresPageModule', name: 'MisSensoresPage', segment: 'mis-sensores', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/sensor-detalle/concursante-detalle.module#ConcursanteDetallePageModule', name: 'ConcursanteDetallePage', segment: 'concursante-detalle', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/usuario-cuenta/usuario-cuenta.module#UsuarioCuentaPageModule', name: 'UsuarioCuentaPage', segment: 'usuario-cuenta', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_12__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_8__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_25__pages_home_home_module__["HomePageModule"],
                __WEBPACK_IMPORTED_MODULE_26_ng2_charts__["ChartsModule"]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_18__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_list_list__["a" /* ListPage */],
                // LoginPage,
                __WEBPACK_IMPORTED_MODULE_9__pages_sensor_detalle_concursante_detalle__["a" /* ConcursanteDetallePage */]
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

/***/ 640:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 270,
	"./af.js": 270,
	"./ar": 271,
	"./ar-dz": 272,
	"./ar-dz.js": 272,
	"./ar-kw": 273,
	"./ar-kw.js": 273,
	"./ar-ly": 274,
	"./ar-ly.js": 274,
	"./ar-ma": 275,
	"./ar-ma.js": 275,
	"./ar-sa": 276,
	"./ar-sa.js": 276,
	"./ar-tn": 277,
	"./ar-tn.js": 277,
	"./ar.js": 271,
	"./az": 278,
	"./az.js": 278,
	"./be": 279,
	"./be.js": 279,
	"./bg": 280,
	"./bg.js": 280,
	"./bm": 281,
	"./bm.js": 281,
	"./bn": 282,
	"./bn.js": 282,
	"./bo": 283,
	"./bo.js": 283,
	"./br": 284,
	"./br.js": 284,
	"./bs": 285,
	"./bs.js": 285,
	"./ca": 286,
	"./ca.js": 286,
	"./cs": 287,
	"./cs.js": 287,
	"./cv": 288,
	"./cv.js": 288,
	"./cy": 289,
	"./cy.js": 289,
	"./da": 290,
	"./da.js": 290,
	"./de": 291,
	"./de-at": 292,
	"./de-at.js": 292,
	"./de-ch": 293,
	"./de-ch.js": 293,
	"./de.js": 291,
	"./dv": 294,
	"./dv.js": 294,
	"./el": 295,
	"./el.js": 295,
	"./en-au": 296,
	"./en-au.js": 296,
	"./en-ca": 297,
	"./en-ca.js": 297,
	"./en-gb": 298,
	"./en-gb.js": 298,
	"./en-ie": 299,
	"./en-ie.js": 299,
	"./en-il": 300,
	"./en-il.js": 300,
	"./en-nz": 301,
	"./en-nz.js": 301,
	"./eo": 302,
	"./eo.js": 302,
	"./es": 303,
	"./es-do": 304,
	"./es-do.js": 304,
	"./es-us": 305,
	"./es-us.js": 305,
	"./es.js": 303,
	"./et": 306,
	"./et.js": 306,
	"./eu": 307,
	"./eu.js": 307,
	"./fa": 308,
	"./fa.js": 308,
	"./fi": 309,
	"./fi.js": 309,
	"./fo": 310,
	"./fo.js": 310,
	"./fr": 311,
	"./fr-ca": 312,
	"./fr-ca.js": 312,
	"./fr-ch": 313,
	"./fr-ch.js": 313,
	"./fr.js": 311,
	"./fy": 314,
	"./fy.js": 314,
	"./gd": 315,
	"./gd.js": 315,
	"./gl": 316,
	"./gl.js": 316,
	"./gom-latn": 317,
	"./gom-latn.js": 317,
	"./gu": 318,
	"./gu.js": 318,
	"./he": 319,
	"./he.js": 319,
	"./hi": 320,
	"./hi.js": 320,
	"./hr": 321,
	"./hr.js": 321,
	"./hu": 322,
	"./hu.js": 322,
	"./hy-am": 323,
	"./hy-am.js": 323,
	"./id": 324,
	"./id.js": 324,
	"./is": 325,
	"./is.js": 325,
	"./it": 326,
	"./it.js": 326,
	"./ja": 327,
	"./ja.js": 327,
	"./jv": 328,
	"./jv.js": 328,
	"./ka": 329,
	"./ka.js": 329,
	"./kk": 330,
	"./kk.js": 330,
	"./km": 331,
	"./km.js": 331,
	"./kn": 332,
	"./kn.js": 332,
	"./ko": 333,
	"./ko.js": 333,
	"./ky": 334,
	"./ky.js": 334,
	"./lb": 335,
	"./lb.js": 335,
	"./lo": 336,
	"./lo.js": 336,
	"./lt": 337,
	"./lt.js": 337,
	"./lv": 338,
	"./lv.js": 338,
	"./me": 339,
	"./me.js": 339,
	"./mi": 340,
	"./mi.js": 340,
	"./mk": 341,
	"./mk.js": 341,
	"./ml": 342,
	"./ml.js": 342,
	"./mn": 343,
	"./mn.js": 343,
	"./mr": 344,
	"./mr.js": 344,
	"./ms": 345,
	"./ms-my": 346,
	"./ms-my.js": 346,
	"./ms.js": 345,
	"./mt": 347,
	"./mt.js": 347,
	"./my": 348,
	"./my.js": 348,
	"./nb": 349,
	"./nb.js": 349,
	"./ne": 350,
	"./ne.js": 350,
	"./nl": 351,
	"./nl-be": 352,
	"./nl-be.js": 352,
	"./nl.js": 351,
	"./nn": 353,
	"./nn.js": 353,
	"./pa-in": 354,
	"./pa-in.js": 354,
	"./pl": 355,
	"./pl.js": 355,
	"./pt": 356,
	"./pt-br": 357,
	"./pt-br.js": 357,
	"./pt.js": 356,
	"./ro": 358,
	"./ro.js": 358,
	"./ru": 359,
	"./ru.js": 359,
	"./sd": 360,
	"./sd.js": 360,
	"./se": 361,
	"./se.js": 361,
	"./si": 362,
	"./si.js": 362,
	"./sk": 363,
	"./sk.js": 363,
	"./sl": 364,
	"./sl.js": 364,
	"./sq": 365,
	"./sq.js": 365,
	"./sr": 366,
	"./sr-cyrl": 367,
	"./sr-cyrl.js": 367,
	"./sr.js": 366,
	"./ss": 368,
	"./ss.js": 368,
	"./sv": 369,
	"./sv.js": 369,
	"./sw": 370,
	"./sw.js": 370,
	"./ta": 371,
	"./ta.js": 371,
	"./te": 372,
	"./te.js": 372,
	"./tet": 373,
	"./tet.js": 373,
	"./tg": 374,
	"./tg.js": 374,
	"./th": 375,
	"./th.js": 375,
	"./tl-ph": 376,
	"./tl-ph.js": 376,
	"./tlh": 377,
	"./tlh.js": 377,
	"./tr": 378,
	"./tr.js": 378,
	"./tzl": 379,
	"./tzl.js": 379,
	"./tzm": 380,
	"./tzm-latn": 381,
	"./tzm-latn.js": 381,
	"./tzm.js": 380,
	"./ug-cn": 382,
	"./ug-cn.js": 382,
	"./uk": 383,
	"./uk.js": 383,
	"./ur": 384,
	"./ur.js": 384,
	"./uz": 385,
	"./uz-latn": 386,
	"./uz-latn.js": 386,
	"./uz.js": 385,
	"./vi": 387,
	"./vi.js": 387,
	"./x-pseudo": 388,
	"./x-pseudo.js": 388,
	"./yo": 389,
	"./yo.js": 389,
	"./zh-cn": 390,
	"./zh-cn.js": 390,
	"./zh-hk": 391,
	"./zh-hk.js": 391,
	"./zh-tw": 392,
	"./zh-tw.js": 392
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
webpackContext.id = 640;

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Sensor; });
var Sensor = /** @class */ (function () {
    function Sensor() {
    }
    return Sensor;
}());

//# sourceMappingURL=Sensor.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapaElementosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_sensor_service_sensor_service__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_ubicacion__ = __webpack_require__(661);
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
 * Generated class for the MapaElementosComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MapaElementosComponent = /** @class */ (function () {
    function MapaElementosComponent(sensorService) {
        this.sensorService = sensorService;
        this.sensores = [];
        // ubicación para centrar el mapa
        this.ubicacion = new __WEBPACK_IMPORTED_MODULE_2__models_ubicacion__["a" /* Ubicacion */]();
        this.zoom = 15;
        this.ubicacion.latitud = -34.9204948;
        this.ubicacion.longitud = -57.95356570000001;
        this.obtenerSensores();
    }
    MapaElementosComponent.prototype.obtenerSensores = function () {
        var _this = this;
        this.sensorService.obtenerSensores()
            .subscribe(function (respuesta) { _this.sensores = respuesta; console.log(_this.sensores); });
    };
    MapaElementosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'mapa-elementos',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\components\mapa-elementos\mapa-elementos.html"*/'<agm-map [latitude]="ubicacion.latitud" [longitude]="ubicacion.longitud" [zoom]="zoom">    \n    <agm-marker [latitude]="ubicacion.latitud" [longitude]="ubicacion.longitud" animation="BOUNCE" [openInfoWindow]="true">\n    </agm-marker>\n  <!-- <agm-marker *ngFor="let sensor of sensores" [latitude]="sensor.ubicacion.latitud" [longitude]="sensor.ubicacion.longitud" animation="BOUNCE" [openInfoWindow]="true"> -->\n           <!-- <agm-snazzy-info-window [maxWidth]="400" [closeWhenOthersOpen]="true">\n                  <ng-template>\n                    My first Snazzy Info Window!\n                  </ng-template>\n          </agm-snazzy-info-window> -->\n  <!-- </agm-marker> -->\n</agm-map>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\components\mapa-elementos\mapa-elementos.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_sensor_service_sensor_service__["a" /* SensorServiceProvider */]])
    ], MapaElementosComponent);
    return MapaElementosComponent;
}());

//# sourceMappingURL=mapa-elementos.js.map

/***/ }),

/***/ 661:
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

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConsultoriosServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(444);
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

/***/ 691:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventoServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_EventoVO__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application_properties_service_application_properties_service__ = __webpack_require__(443);
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

/***/ 692:
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

/***/ 693:
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

/***/ 695:
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
            selector: 'page-list',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Lista de ejemplo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">\n      <ion-icon [name]="item.icon" item-start></ion-icon>\n      {{item.title}}\n      <div class="item-note" item-end>\n        {{item.note}}\n      </div>\n    </button>\n  </ion-list>\n  <div *ngIf="selectedItem" padding>\n    You navigated here from <b>{{selectedItem.title}}</b>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\list\list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 696:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_about_about__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_lista_sensores_concursante_lista__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_mapa_mapa__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(446);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_usuario_cuenta_usuario_cuenta__ = __webpack_require__(453);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_util__ = __webpack_require__(697);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_mis_sensores_mis_sensores__ = __webpack_require__(452);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













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
            { title: 'Sensores', name: 'ConcursanteListaPage', component: __WEBPACK_IMPORTED_MODULE_5__pages_lista_sensores_concursante_lista__["a" /* ConcursanteListaPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_5__pages_lista_sensores_concursante_lista__["a" /* ConcursanteListaPage */], index: 0, icon: 'analytics' },
            { title: 'Mapa', name: 'MapaPage', component: __WEBPACK_IMPORTED_MODULE_7__pages_mapa_mapa__["a" /* MapaPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_7__pages_mapa_mapa__["a" /* MapaPage */], index: 1, icon: 'map' },
            { title: 'Acerca de', name: 'AboutPage', component: __WEBPACK_IMPORTED_MODULE_2__pages_about_about__["a" /* AboutPage */], tabComponent: __WEBPACK_IMPORTED_MODULE_2__pages_about_about__["a" /* AboutPage */], index: 2, icon: 'information-circle' }
        ];
        this.loggedOutPages = [
            { title: 'Iniciar Sesión', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */], index: 0, icon: 'log-in' }
        ];
        this.loggedInPages = [
            { title: 'Mis sensores', name: 'MisSensoresPage', component: __WEBPACK_IMPORTED_MODULE_12__pages_mis_sensores_mis_sensores__["a" /* MisSensoresPage */], index: 0, icon: 'bookmarks' },
            { title: 'Cuenta', name: 'UsuarioCuentaPage', component: __WEBPACK_IMPORTED_MODULE_10__pages_usuario_cuenta_usuario_cuenta__["a" /* UsuarioCuentaPage */], index: 1, icon: 'contact' },
            { title: 'Cerrar Sesión', name: 'LoginPage', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */], index: 2, icon: 'log-out' }
        ];
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        if (Object(__WEBPACK_IMPORTED_MODULE_11_util__["isNullOrUndefined"])(this.authFirebase.auth.currentUser)) {
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
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */]).catch(function (err) {
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\app\app.html"*/'\n  <!-- Menu de usuario sin logearse  -->\n  <ion-menu id="loggedOutMenu" side="left" [content]="content">\n   \n      <ion-header>\n        <ion-toolbar color="primary">\n          <ion-title>Menu</ion-title>\n        </ion-toolbar>\n      </ion-header>\n  \n      <ion-content class="outer-content">\n        \n        <ion-list>\n          <ion-list-header>\n            Navegar\n          </ion-list-header>\n          <button ion-item menuClose *ngFor="let p of paginasComunes" (click)="openPage(p)">\n            <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n            {{p.title}}\n          </button>\n        </ion-list>\n          \n        <ion-list>\n          <ion-list-header>\n            Session\n          </ion-list-header>\n          <button ion-item menuClose *ngFor="let p of loggedOutPages" (click)="openPage(p)">\n            <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n            {{p.title}}\n          </button>\n        </ion-list>\n  \n      </ion-content>\n  \n  </ion-menu>\n\n  <!-- Menu de usuario logueado -->\n  <ion-menu id="loggedInMenu" side="left" [content]="content">\n    \n    <ion-header>\n      <ion-toolbar color="primary">\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content class="outer-content">\n      <ion-list>\n        <ion-list-header>\n          Navegar\n        </ion-list-header>\n        <button ion-item menuClose *ngFor="let p of paginasComunes" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n\n      <ion-list>\n        <ion-list-header>\n          Session\n        </ion-list-header>\n        <button ion-item menuClose *ngFor="let p of loggedInPages" (click)="openPage(p)">\n          <ion-icon item-start [name]="p.icon" [color]="isActive(p)"></ion-icon>\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="true"></ion-nav>\n'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_auth_service_auth_service__["a" /* AuthServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 700:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubscriptionsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
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

/***/ 701:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseMessagingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
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

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SensorServiceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Sensor__ = __webpack_require__(659);
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
  Generated class for the SensorServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var SensorServiceProvider = /** @class */ (function () {
    // public url : string = 'https://104.248.230.8/ProyectoCentinela/controladores/sensores';
    function SensorServiceProvider(http) {
        this.http = http;
        this.sensores = [];
        this.sensor = new __WEBPACK_IMPORTED_MODULE_2__models_Sensor__["a" /* Sensor */]();
        this.url = 'http://java.linti.unlp.edu.ar/ProyectoCentinela/controladores/sensores';
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

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConcursanteDetallePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_medicion_service_medicion_service__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usuario_service_usuario_service__ = __webpack_require__(100);
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
 * Generated class for the ConcursanteDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConcursanteDetallePage = /** @class */ (function () {
    // fin variables para el grafico
    function ConcursanteDetallePage(navCtrl, navParams, medicionService, usuarioService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.medicionService = medicionService;
        this.usuarioService = usuarioService;
        this.mediciones = [];
        this.estaLogueado = false;
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
    ConcursanteDetallePage.prototype.ionViewDidLoad = function () {
        this.armarGrafico();
        console.log('ionViewDidLoad ConcursanteDetallePage');
    };
    ConcursanteDetallePage.prototype.chartClicked = function (e) {
        console.log(e);
    };
    ConcursanteDetallePage.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ConcursanteDetallePage.prototype.armarGrafico = function () {
        var _this = this;
        if (false) {
            // ver que no traiga todas sino las últimas 5 ponele
            this.medicionService.obtenerMedicionesSensor(this.sensorParam.idSensor).subscribe(function (response) {
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
                    _this.lineChart = new Chart(_this.lineCanvas.nativeElement, {
                        type: 'line',
                        data: {
                            labels: _this.lineChartLabels,
                            datasets: [
                                {
                                    label: "CO2",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,192,192,0.4)",
                                    borderColor: "rgba(75,192,192,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: co2s,
                                    spanGaps: false,
                                },
                                {
                                    label: "Temperatura",
                                    fill: false,
                                    lineTension: 0.1,
                                    backgroundColor: "rgba(75,192,192,0.4)",
                                    borderColor: "rgba(100,192,192,1)",
                                    borderCapStyle: 'butt',
                                    borderDash: [],
                                    borderDashOffset: 0.0,
                                    borderJoinStyle: 'miter',
                                    pointBorderColor: "rgba(75,192,192,1)",
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                    pointHoverBorderWidth: 2,
                                    pointRadius: 1,
                                    pointHitRadius: 10,
                                    data: temperaturas,
                                    spanGaps: false,
                                }
                            ]
                        }
                    });
                }
            }, function (error) {
                console.log(error);
            });
        } //end if trucho
        else {
            // Version hardcodeada
            this.lineChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.lineCanvas.nativeElement, {
                type: 'line',
                data: {
                    labels: [10, 20, 30, 40, 50, 10, 20, 30, 40, 50],
                    datasets: [
                        {
                            label: "CO2",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [10, 50, 100, 75, 89, 75, 50, 100, 75, 89],
                            spanGaps: false,
                        },
                        {
                            label: "Temperatura",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(112, 1, 147,0.4)",
                            borderColor: "rgba(157, 1, 147,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: [23, 18, 25, 30, 12, 23, 18, 25, 30, 12],
                            spanGaps: false,
                        }
                    ]
                }
            });
        }
    };
    ConcursanteDetallePage.prototype.agregarSensor = function () {
        var _this = this;
        this.usuarioService.usuarioLogueado.dispositivos.push(this.sensorParam);
        this.usuarioService.editarUsuario(this.usuarioService.usuarioLogueado).subscribe(function (response) {
            if (response.status == 200) {
                console.log('Sensor agregado a la lista del usuario correctamente.');
                localStorage.setItem('sensoresDelUsuario', JSON.stringify(_this.usuarioService.usuarioLogueado.dispositivos)); //podría prescindir si un web service me retorna la coleccion bajo demanda.
            }
        }, function (error) {
            console.log(error);
            if (error.status == 409)
                alert('No se pudo agregar el sensor a la lista del usuario.');
        });
        console.log("sensor" + this.sensorParam.nombreSensor + " ha sido añadido al usuario " + this.usuarioService.usuarioLogueado.email);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('lineCanvas'),
        __metadata("design:type", Object)
    ], ConcursanteDetallePage.prototype, "lineCanvas", void 0);
    ConcursanteDetallePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-concursante-detalle',template:/*ion-inline-start:"C:\Proyecto centinela\ElektuIonic-master\src\pages\sensor-detalle\concursante-detalle.html"*/'<ion-header>\n\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Detalles del Sensor</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n  <ion-card>\n    <ion-card-header class="degrade" padding>\n      <ion-title color="dark">{{sensorParam.nombreSensor}} </ion-title>\n    </ion-card-header>\n\n    <ion-card-content class="fondo-elektu" style="margin-top:10%;">\n      \n      <div>Estado : {{sensorParam.estado}}</div>\n      <div>Código : {{sensorParam.codigo}}</div>\n      <div>Batería : {{sensorParam.bateria}}</div>\n      <div>Ubicación :</div>\n      <div>Calle : {{sensorParam.ubicacion.calle}}</div>\n      <div>Número : {{sensorParam.ubicacion.numero}}</div>\n      <div>Localidad : {{sensorParam.ubicacion.localidad}}</div>\n\n      <canvas #lineCanvas></canvas>\n\n      <p *ngIf="mediciones.length == 0"> Por el momento no se registraron mediciones </p>\n      <button *ngIf="estaLogueado == true" ion-button round color="primary" (click)="agregarSensor()">Añadir a mis sensores</button>\n\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>'/*ion-inline-end:"C:\Proyecto centinela\ElektuIonic-master\src\pages\sensor-detalle\concursante-detalle.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_medicion_service_medicion_service__["a" /* MedicionServiceProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usuario_service_usuario_service__["a" /* UsuarioServiceProvider */]])
    ], ConcursanteDetallePage);
    return ConcursanteDetallePage;
}());

//# sourceMappingURL=concursante-detalle.js.map

/***/ })

},[454]);
//# sourceMappingURL=main.js.map