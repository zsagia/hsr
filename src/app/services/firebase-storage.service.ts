import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseStorageService {

  storageRef;
  urls: Observable<string[]>;

  constructor(private angularFire: AngularFire) {
    this.storageRef = firebase.storage().ref();
  }

  uploadFlyer(file: File): Promise<any> {
    let imageRef = this.storageRef.child('flyer/' + file.name);

    return imageRef.put(file);
  }

  getFlyerDownloadUrls(fileNames) {
    fileNames.forEach((element, index) => {
      let imagesRef = this.storageRef.child('flyer/' + element.name);
      imagesRef.getDownloadURL().then((url) => {
        this.urls[index] = url;
      });
    });
  }

  getUrls(): Observable<string[]> {
    return this.urls;
  }
}
