import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import firebaseConfig from '@public/firebase.json'

import Vue from 'vue'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')

// Setup firebase notification
const app = initializeApp(firebaseConfig)

// Listen messages
const messaging = getMessaging(app)
onMessage(messaging, (payload) => {
  console.log('Message received.', payload)

  const notification = payload.notification
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    const title = notification ? notification.title : payload.from
    const body = notification ? notification.body : JSON.stringify(payload.data)
    const icon = notification ? notification.icon : "/favicon.ico"
    const image = notification ? notification.image : "https://media.giphy.com/media/VRKheDy4DkBMrQm66p/giphy.gif"
    registrations[0].showNotification(title, { body, icon, image })
  })
})

// Request notification permission on clicking anywhere in the web
const requestNotificationPermission = () => {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')
      // Unregister click event as permission is granted
      document.removeEventListener('click', requestNotificationPermission)
      return true
    } else {
      console.log('Unable to get permission to notify. Permission:', permission)
      return false
    }
  }).then((isPermitted) => {
      if (isPermitted) {
        // get the token in the form of promise
        getToken(messaging).then((token) => {
          console.log('Device token is:', token)
          // Subscribe with server running in localhost
          fetch('https://webhook.site/b87e82eb-4d9a-4e7d-80da-e7588b15b2c6', {
            method: 'POST',
            body: token,
          })
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
          })
      }
    })
}

// Hijack first click-event on the page in order to request notification permission
document.addEventListener('click', requestNotificationPermission)
