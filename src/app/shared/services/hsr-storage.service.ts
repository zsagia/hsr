import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { HsrAuthService } from './hsr-auth.service';
import UploadTask = firebase.storage.UploadTask;

@Injectable()
export class HsrStorageService {
  // generate random id to make filename dupes possible
  private static generateRandomId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return '__' + text;
  }

  constructor(private angularFireDatabase: AngularFireDatabase, private auth: HsrAuthService, @Inject(FirebaseApp) private firebaseApp: firebase.app.App) {
  }

  uploadFoto(file: File): UploadTask {
    const fotosStorageRef = this.firebaseApp.storage().ref('fotos/' + file.name + HsrStorageService.generateRandomId());
    return fotosStorageRef.put(file);
  }

  uploadFile(file: File): UploadTask {
    const manualsStorageRef = this.firebaseApp.storage().ref('files/' + file.name + HsrStorageService.generateRandomId());
    return manualsStorageRef.put(file);
  }

  deleteFile(key: string, filename: string) {
    const manualsStorageRef = this.firebaseApp.storage().ref('files/' + filename);
    manualsStorageRef.delete();
    this.angularFireDatabase.list('files').remove(key);
  }

  uploadCover(file: File): UploadTask {
    const imageRef = this.firebaseApp.storage().ref('cover/' + file.name + HsrStorageService.generateRandomId());
    return imageRef.put(file);
  }

  deleteCover(fileName: string) {
    const imageRef = this.firebaseApp.storage().ref('cover/' + fileName);
    imageRef.delete();
  }

}
