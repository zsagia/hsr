import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-manuals',
  templateUrl: 'manuals.component.html',
  styleUrls: ['manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  manualsList: FirebaseListObservable<any>;
  manualForm: FormGroup;
  view = 'grid';

  currentManual: File;

  constructor(private angularFire: AngularFire, private formBuilder: FormBuilder, private storage: FirebaseStorageService, private database: FirebaseDatabaseService, private auth: FirebaseAuthService) {
  }

  ngOnInit() {
    this.manualForm = this.formBuilder.group({
      title: ['', Validators.required]
      // TODO: disable when no title / make validation work for input-file
      // manualFile: [{value: '', disabled: true}, Validators.required]
    });
    this.manualsList = this.database.getManuals();
  }

  onManualAdded(file: File) {
    this.currentManual = file;
  }

  onSubmit() {
    this.storage.uploadManual(this.currentManual).then((snapshot) => {
      const now = Date.now();
      const data = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0],
        contentType: 'application/pdf',
        fullPath: snapshot.metadata.fullPath,
        timeCreated: snapshot.metadata.timeCreated,
        size: snapshot.metadata.size,
        author: this.auth.getCurrentUser().email,
        date: now,
        reverseDate: 0 - now,
        title: this.manualForm.controls['title'].value
      };
      this.angularFire.database.list('manuals').push(data);
      this.manualForm.controls['title'].setValue('');
    });
  }

  onManualDeleted(event: Event, filename: string) {
    event.stopPropagation();
    event.preventDefault();
    this.storage.deleteManual(filename);
  }

  isAuthor(author) {
    return author === this.auth.getCurrentUser().email;
  }

  setView(data) {
    this.view = data.value;
  }
}
