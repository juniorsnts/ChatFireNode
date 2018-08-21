import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-conversa',
  templateUrl: 'conversa.html',
})
export class ConversaPage {

  @ViewChild('myInput') myInput: ElementRef;

  contato;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.contato = this.navParams.get('contato');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversaPage');
  }

}
