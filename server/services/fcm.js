const admin = require("firebase-admin");

class FirebaseMessagingService {
    constructor() {
        if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            return;
        }
        this.app = admin.initializeApp({
            credential: admin.credential.applicationDefault(),
        });
    }

    send(messageData, { token, tokens }) {
        if (!this.app) {
            return;
        }
        const formattedMessage = Object.entries(messageData).reduce(
            (obj, [k, v]) => {
                obj[k] = JSON.stringify(v);
                return obj;
            },
            {}
        );

        const messaging = this.app.messaging();
        let promise;
        if (token) {
            promise = messaging.send({
                data: formattedMessage,
                token,
            });
        } else if (tokens) {
            promise = messaging.sendMulticast({
                data: formattedMessage,
                tokens,
            });
        }
        promise
            .then((response) => {
                // Response is a message ID string.
                console.log("Successfully sent message(s):", response);
            })
            .catch((error) => {
                console.log("Error sending message:", error);
            });
    }
}

module.exports = FirebaseMessagingService;
