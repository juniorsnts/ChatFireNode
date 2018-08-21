import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-contatos',
  templateUrl: 'contatos.html',
})
export class ContatosPage {

  db = firebase.database();
  
  usuarios =[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
        firebase.auth().onAuthStateChanged(user =>{
          if(user){
            this.db.ref().on('value', (snap)=>{
              snap.forEach(data =>{
                if(data.val().usuario.uid != user.uid){
                  this.usuarios.push(data.val().usuario);           
                } else {
                  return false;
                }
              });
            });
          }
        });
        console.log(this.usuarios);
  }

  ionViewDidLoad() {

  }

  conversar(contato){
    this.navCtrl.push('ConversaPage', {contato: contato});
  }

}
