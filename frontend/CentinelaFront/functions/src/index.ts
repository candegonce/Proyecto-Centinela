import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/** Firebase se va a fijar en todos los dispositivos subscriptos y va a hacer una difusión de push a todas
 * simultáneamente
 */
export const subscribeToTopic = functions.https.onCall(
    async (data, context)=>{
        await admin.messaging().subscribeToTopic(data.token, data.topic);
        return `subscribed to ${data.topic}`; /* El símbolo '`' se hace alt + 96 */
    }
);

export const unsuscribeFromTopic = functions.https.onCall(
    async (data, context)=>{
        await admin.messaging().unsubscribeFromTopic(data.token, data.topic);
        return `subscribed to ${data.topic}`; /* El símbolo '`' se hace alt + 96 */
    }
);

/** Lo que vamos a hacer en el backend es crear un evento que envie un mensaje hacia los
 * subscriptores en una temática o "Topic", cuando eso sucede se puede usar el disparador 
 * que provee firebase 'OnCreate'
 */

export const sendOnFirestoreCreate = functions.firestore
.document('/novedades/{novedadesId}')
.onCreate(async snapshot =>{
    const descuento = snapshot.data();
    
    const notification : admin.messaging.Notification = {
        title: 'Se ha añadido un nuevo muñeco!',
        body: descuento.headline
    };
    
    const payload: admin.messaging.Message = {
        notification,
        webpush:{
            notification: {
                vibrate: [200, 100, 200],
                icon: 'gs://elektuionic.appspot.com/favicon.png',
                actions:[
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
        topic : 'Novedades'
    }
    return admin.messaging().send(payload);
})