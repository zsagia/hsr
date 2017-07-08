import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrStorageService } from '../../shared/services/hsr-storage.service';
import { HsrPlayerService } from '../../components/player/hsr-player.service';

export interface StorageFile {
  name: string;
  url: string;
  contentType: string;
  fullPath: string;
  timeCreated: string;
  size: number;
  author: string;
  date: number;
  reverseDate: number;
  title: string;
}

@Component({
  selector: 'hsr-files',
  templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit {

  view = 'grid';

  currentFile: File;

  filesList: FirebaseListObservable<StorageFile[]>;

  ACCEPTED_FILETYPES = 'application/pdf;audio/mpeg;audio/mp3;application/zip;application/octet-stream';

  constructor(private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService,
    public hsrAuthService: HsrAuthService, private hsrPlayerService: HsrPlayerService) {
  }

  ngOnInit() {
    this.filesList = this.hsrDatabaseService.getFiles();
  }

  onFileAdded(file: File) {
    this.currentFile = file;
  }

  onSubmit() {
    this.hsrStorageService.uploadFile(this.currentFile).then((snapshot) => {
      const now = Date.now();
      const data: StorageFile = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0],
        contentType: this.currentFile.type,
        fullPath: snapshot.metadata.fullPath,
        timeCreated: snapshot.metadata.timeCreated,
        size: snapshot.metadata.size,
        author: this.hsrAuthService.stateSnapshot.email,
        date: now,
        reverseDate: 0 - now,
        title: this.currentFile.name
      };
      this.filesList.push(data);
    });
  }

  onFileDelete(event: Event, key: string, filename: string) {
    event.stopPropagation();
    event.preventDefault();
    this.hsrStorageService.deleteFile(key, filename);
  }

  setView(data) {
    this.view = data.value;
  }
}
