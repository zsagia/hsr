import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { ProgressHelper } from './shared/progress.helper';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'hsr-fotos',
  templateUrl: 'fotos.component.html',
  styleUrls: ['fotos.component.scss']
})
export class FotosComponent implements OnInit {
  fotosList: FirebaseListObservable<any>;
  uploadProgress: ProgressHelper;
  fileToRemove: File;
  areFilesInList: boolean;

  constructor(private progressBar: SlimLoadingBarService,
    private auth: FirebaseAuthService,
    private storage: FirebaseStorageService,
    private database: FirebaseDatabaseService,
    private angularFire: AngularFire) {
  }

  // TODO: implement folders;) + treeview
  ngOnInit() {
    this.fotosList = this.database.getFotos();
  }

  onFilesChanged(event) {
    this.areFilesInList = event;
  }

  onFilesUploading(files: File[]): void {
    this.uploadProgress = new ProgressHelper(files.length);
    this.progressBar.reset();
    this.progressBar.start();
    for (let file of files) {
      this.storage.uploadFoto(file).then((snapshot) => {
        let now = Date.now();
        let data = {
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
        this.angularFire.database.list('fotos').push(data);
        console.log('foto saved to database:');
        console.log(file);
        console.log(data);
        this.fileToRemove = file;
        this.uploadProgress.done++;
        this.progressBar.progress = this.uploadProgress.percent;
        console.log(this.uploadProgress.percent + '\%');
        if (this.uploadProgress.done === this.uploadProgress.total) {
          console.log('FINISHED UPLOAD');
          this.uploadProgress = null;
          this.progressBar.complete();
        }
      });
    }
  }
}
