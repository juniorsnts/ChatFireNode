import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  barraEscolha = "conversas";

  dadosUser;

  constructor(
    private firebaseProvider: FirebaseProvider,
    private camera: Camera,
    public navCtrl: NavController) {
      this.firebaseProvider.refDadosUser().then(resp =>{
        this.dadosUser = resp;
        console.log(this.dadosUser);
      });
  }
  
  abrirCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.ALLMEDIA
    }

    this.camera.getPicture(options).then((data) =>{
      console.log('imagem capturada');
      //let fotoBase64 = 'data:image/jpeg;base64,'+data;
    }).catch(error=>{
      this.barraEscolha = "conversas";
    });
  }

  pressiona(e){
    console.log('pressionou item');
  }

  listaContatos(){
    this.navCtrl.push('ContatosPage');
  }

}
