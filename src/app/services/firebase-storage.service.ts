import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FirebaseDatabaseService } from './firebase-database.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class FirebaseStorageService {

  storageRef;

  constructor(private angularFire: AngularFire, private database: FirebaseDatabaseService, private auth: FirebaseAuthService) {
    this.storageRef = firebase.storage().ref();
  }

  uploadFlyers(files: File[]) {
    for (let file of files) {
      let imageRef = this.storageRef.child('flyer/' + file.name + this.generateRandomId());

      imageRef.put(file).then((snapshot) => {
        let now = Date.now();
        let fileRecord = {
          name: snapshot.metadata.name,
          url: snapshot.metadata.downloadURLs[0],
          contentType: snapshot.metadata.contentType,
          fullPath: snapshot.metadata.fullPath,
          timeCreated: snapshot.metadata.timeCreated,
          size: snapshot.metadata.size,
          author: this.auth.getCurrentUser().displayName || this.auth.getCurrentUser().email,
          date: now,
          reverseDate: 0 - now
        };
        console.log(fileRecord);
        this.database.getFlyers().push(fileRecord);
      });
    }
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
