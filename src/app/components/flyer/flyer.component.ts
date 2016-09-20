import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'hsr-flyer',
  templateUrl: 'flyer.component.html',
  styleUrls: ['flyer.component.scss']
})
export class FlyerComponent implements OnInit {
  flyersList: FirebaseListObservable<any>;
  fileIsOver: boolean = false;
  options = {
    readAs: 'File'
  };
  uploader: FileUploader = new FileUploader({url: ''});

  constructor(private storage: FirebaseStorageService, private database: FirebaseDatabaseService) {
  }

  ngOnInit() {
    this.flyersList = this.database.getFlyers();
  }

  fileOver(fileIsOver: boolean): void {
    this.fileIsOver = fileIsOver;
  }

  onFileDrop(files: File[]): void {
    this.storage.uploadFlyers(files);
  }
}
