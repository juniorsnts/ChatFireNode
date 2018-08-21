import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private firebaseProvider: FirebaseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin(){
    this.firebaseProvider.loginFacebook().then((resp)=>{
      this.navCtrl.setRoot('HomePage', {resp: resp});
    }, error =>{
      console.log(JSON.stringify(error));
    });
  }

  googleLogin(){
    
  }

}
