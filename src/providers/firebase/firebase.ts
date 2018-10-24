import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
import { Platform } from 'ionic-angular';


@Injectable()
export class FirebaseProvider {
  
  db = firebase.database();
  users;
  
  constructor(
    private platform: Platform,
    private fb: Facebook) {
  }

  loginFacebook(){
    return new Promise((resolve, reject)=>{
      if(this.platform.is('cordova')){
        this.fb.login(['email', 'public_profile']).then(res =>{
          const facebookCredendial = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInAndRetrieveDataWithCredential(facebookCredendial).then(data =>{
            let uid = data.user.uid;
            let userObject = {
              uid: uid,
              nome: data.user.displayName,
              email: data.user.email,
              telefone: data.user.phoneNumber,
              fotoPerfil: data.user.photoURL,
              status: 'disponivel'
            };            
            this.db.ref(data.user.uid+'/usuario').set(userObject).then(()=>{
              resolve(data);
            })          
          }).catch(error =>{
            console.log(error);
          });
        });
      } else {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(res =>{
          firebase.auth().signInWithCredential(res.credential).then((data) =>{
            let uid = data.uid;
            let userObject = {
              uid: uid,
              nome: data.displayName,
              email: data.email,
              telefone: data.phoneNumber,
              fotoPerfil: data.photoURL,
              status: 'disponivel'
            };            
            this.db.ref(data.uid+'/usuario').set(userObject).then(()=>{
              resolve(data);
            });
          }).catch(error =>{
            console.log(error);
          });
        });
      }
    });
  }

  loginGoogle(){

  }

  refDadosUser(){
    return new Promise((resolve, reject)=>{      
      firebase.auth().onAuthStateChanged(user =>{
        if(user){
          this.db.ref(user.uid+'/'+'usuario').on('value', snap =>{
            resolve(snap.val());
          });
        } else {
          console.log('error');
        }
      });
    })
  }

  refOn(path, valor){
    return this.db.ref(path).push(valor);
  }

  logout(){
    return firebase.auth().signOut();
  }

}
