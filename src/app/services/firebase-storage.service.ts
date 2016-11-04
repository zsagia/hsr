import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseAuthService } from './firebase-auth.service';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseStorageService {

  storageRef;

  constructor(private angularFire: AngularFire, private auth: FirebaseAuthService) {
    this.storageRef = firebase.storage().ref();
  }

  uploadFoto(file: File): Promise<any> {
    let fotosStorageRef = this.storageRef.child('fotos/' + file.name + this.generateRandomId());
    return fotosStorageRef.put(file);
  }

  uploadManual(file: File): Promise<any> {
    let manualsStorageRef = this.storageRef.child('manuals/' + file.name + this.generateRandomId());
    return manualsStorageRef.put(file);
  }

  deleteManual(filename: string) {
    let manualsStorageRef = this.storageRef.child('manuals/' + filename);
    manualsStorageRef.delete();
    this.angularFire.database.list('manuals', {
      query: {
        orderByChild: 'name',
        equalTo: filename
      }
    }).remove();
  }

  uploadCover(file: File): Promise<any> {
    let imageRef = this.storageRef.child('cover/' + file.name + this.generateRandomId());

    return imageRef.put(file);
  }

  deleteCover(fileName: string) {
    let imageRef = this.storageRef.child('cover/' + fileName);
    imageRef.delete();
  }

  // generate random id to make filename dupes possible
  private generateRandomId(): string {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return '__' + text;
  }
}
