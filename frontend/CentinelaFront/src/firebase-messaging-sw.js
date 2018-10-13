/********************************* Notificaciones push con firebase *********************************** */

/** Estos imports los puse para poder hacer las notificaciones push, ésto le da al service worker 
 * acceso al messaging de firebase
 */
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-messaging.js');

/** Inicializa la aplicación firebase en el service worker pasándole el messagingSenderId
 * este valor lo obtengo desde la consola en la página de firebase / config del proyecto / Cloud Messaging / 
 * ID del remitente
 */
firebase.initializeApp({
    apiKey: "AIzaSyBtK8Pq0Qe7roAExpbb7zNYIwLDFOK0WUo",
    authDomain: "elektuionic.firebaseapp.com",
    databaseURL: "https://elektuionic.firebaseio.com",
    projectId: "elektuionic",
    storageBucket: "elektuionic.appspot.com",
    messagingSenderId: "124643747683"
});

/** Obtiene una instancia de messaging de firebase para con esto poder luego manipular los mensajes */
const messaging = firebase.messaging();