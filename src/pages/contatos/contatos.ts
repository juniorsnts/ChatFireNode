import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
    private toast: ToastController,
    private loading: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      let loadingCtrl = this.loading.create({
        content: 'Carregando contatos',
        spinner: 'ios-small'        
      });
      let toastCtrl = this.toast.create({
        message: 'Nenhum usuario encontrado',
        position: 'bottom',
        duration: 2000
      });
      loadingCtrl.present();      
        firebase.auth().onAuthStateChanged(user =>{
          if(user){
            this.db.ref().on('value', (snap)=>{
              this.usuarios = [];
              snap.forEach(data =>{
                if(data.val().usuario.uid != user.uid){
                  this.usuarios.push(data.val().usuario); 
                  loadingCtrl.dismiss();
                } else {                  
                  loadingCtrl.dismiss().then(()=>{
                    toastCtrl.present();
                  });
                }
              });
            });
          }
        });
  }

  ionViewDidLoad() {

  }

  conversar(contato){
    this.navCtrl.push('ConversaPage', {contato: contato});
  }

}
