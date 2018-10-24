import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})
export class ConversaPage {

  contato;

  constructor(
    private firebaseProvider: FirebaseProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.contato = this.navParams.get('contato');    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversaPage');
  }

  adjustTextArea(event: any){
    let textarea: any = event.target;
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }

  enviarMensagem(mensagem){
    var data = new Date();
    this.firebaseProvider.refOn('conversas/', {
      Mensagem: mensagem,
      uid: firebase.auth().currentUser.uid,
      hora: data.getHours+';'+data.getMinutes+';'+data.getSeconds
    })
  }

}
