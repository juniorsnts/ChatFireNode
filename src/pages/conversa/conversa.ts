import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})
export class ConversaPage {

  contato;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
