import { Component } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';

@Component({
  selector: 'hsr-flyer',
  templateUrl: 'flyer.component.html',
  styleUrls: ['flyer.component.scss']
})
export class FlyerComponent {
  flyersList: FirebaseListObservable<any>;
  fileIsOver: boolean = false;
  options = {
    readAs: 'File'
  };

  constructor(private storage: FirebaseStorageService, private database: FirebaseDatabaseService) {
    this.flyersList = this.database.getFlyer();
  }

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onFileDrop(file: File): void {
    this.storage.uploadFlyer(file).then((snapshot) => {
      let fileRecord = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0]
      };
      console.log(fileRecord);
      this.flyersList.push(fileRecord);
    });
  }
}
