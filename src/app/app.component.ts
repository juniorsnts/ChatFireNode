import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAsGE0tBEPOpZdGzNNozgarIusVIfOr6IY",
  authDomain: "chatfirebase-d5825.firebaseapp.com",
  databaseURL: "https://chatfirebase-d5825.firebaseio.com",
  projectId: "chatfirebase-d5825",
  storageBucket: "chatfirebase-d5825.appspot.com",
  messagingSenderId: "477471107767"
});

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {    
    platform.ready().then(() => {
      firebase.auth().onAuthStateChanged(user =>{
        if(user){
          console.log('autenticado');
          this.rootPage = 'HomePage';
        } else if(!user){
          console.log('nao autenticado');
          this.rootPage = 'LoginPage'
        }
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

