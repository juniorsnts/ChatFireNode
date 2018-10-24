import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    private loading: LoadingController,
    private firebaseProvider: FirebaseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  facebookLogin(){
    let loadindCtrl = this.loading.create({
      spinner: 'ios-small',
      content: 'Logando'
    });
    loadindCtrl.present();
    this.firebaseProvider.loginFacebook().then((resp)=>{
      this.navCtrl.setRoot('HomePage', {resp: resp});
      loadindCtrl.dismiss();
    }, error =>{
      console.log(JSON.stringify(error));
      loadindCtrl.dismiss();
    });
  }

  googleLogin(){
    
  }

}
