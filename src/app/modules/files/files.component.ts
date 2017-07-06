import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrStorageService } from '../../shared/services/hsr-storage.service';

@Component({
  selector: 'hsr-files',
  templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit {

  fileForm: FormGroup;
  view = 'grid';

  currentFile: File;

  filesList: FirebaseListObservable<any>;

  ACCEPTED_FILETYPES = 'application/pdf;audio/mpeg;audio/mp3;application/zip;application/octet-stream';

  constructor(private formBuilder: FormBuilder,
    private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService,
    public hsrAuthService: HsrAuthService) {
  }

  ngOnInit() {
    this.filesList = this.hsrDatabaseService.getFiles();
    this.fileForm = this.formBuilder.group({
      title: ['', Validators.required]
      // TODO: disable when no title / make validation work for input-file
      // manualFile: [{value: '', disabled: true}, Validators.required]
    });
  }

  onFileAdded(file: File) {
    this.currentFile = file;
  }

  onSubmit() {
    this.hsrStorageService.uploadFile(this.currentFile).then((snapshot) => {
      const now = Date.now();
      const data = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0],
        contentType: 'application/pdf',
        fullPath: snapshot.metadata.fullPath,
        timeCreated: snapshot.metadata.timeCreated,
        size: snapshot.metadata.size,
        author: this.hsrAuthService.stateSnapshot.email,
        date: now,
        reverseDate: 0 - now,
        title: this.fileForm.controls['title'].value
      };
      this.filesList.push(data);
      this.fileForm.controls['title'].setValue('');
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
