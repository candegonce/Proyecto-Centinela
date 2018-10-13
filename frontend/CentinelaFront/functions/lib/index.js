"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
/** Firebase se va a fijar en todos los dispositivos subscriptos y va a hacer una difusión de push a todas
 * simultáneamente
 */
exports.subscribeToTopic = functions.https.onCall((data, context) => __awaiter(this, void 0, void 0, function* () {
    yield admin.messaging().subscribeToTopic(data.token, data.topic);
    return `subscribed to ${data.topic}`; /* El símbolo '`' se hace alt + 96 */
}));
exports.unsuscribeFromTopic = functions.https.onCall((data, context) => __awaiter(this, void 0, void 0, function* () {
    yield admin.messaging().unsubscribeFromTopic(data.token, data.topic);
    return `subscribed to ${data.topic}`; /* El símbolo '`' se hace alt + 96 */
}));
/** Lo que vamos a hacer en el backend es crear un evento que envie un mensaje hacia los
 * subscriptores en una temática o "Topic", cuando eso sucede se puede usar el disparador
 * que provee firebase 'OnCreate'
 */
exports.sendOnFirestoreCreate = functions.firestore
    .document('/novedades/{novedadesId}')
    .onCreate((snapshot) => __awaiter(this, void 0, void 0, function* () {
    const descuento = snapshot.data();
    const notification = {
        title: 'Se ha añadido un nuevo muñeco!',
        body: descuento.headline
    };
    const payload = {
        notification,
        webpush: {
            notification: {
                vibrate: [200, 100, 200],
                icon: 'gs://elektuionic.appspot.com/favicon.png',
                actions: [
                    {
                        action: 'like',
                        title: ' :D :D'
                    },
                    {
                        action: 'dislike',
                        title: 'D: D:'
                    }
                ]
            }
        },
        topic: 'Novedades'
    };
    return admin.messaging().send(payload);
}));
//# sourceMappingURL=index.js.map