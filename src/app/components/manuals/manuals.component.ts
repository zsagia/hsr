import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable, AngularFire } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'hsr-manuals',
  templateUrl: 'manuals.component.html',
  styleUrls: ['manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  manualsList: FirebaseListObservable<any>;
  manualForm: FormGroup;
  view: string = 'grid';

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
    this.storage.uploadManual(file).then((snapshot) => {

      let now = Date.now();
      let data = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0],
        contentType: 'application/pdf',
        fullPath: snapshot.metadata.fullPath,
        timeCreated: snapshot.metadata.timeCreated,
        size: snapshot.metadata.size,
        author: this.auth.getCurrentUser().displayName || this.auth.getCurrentUser().email,
        date: now,
        reverseDate: 0 - now,
        title: this.manualForm.controls['title'].value
      };

      console.log('manual saved to database:');
      console.log(data);

      this.angularFire.database.list('manuals').push(data);
    });
    this.manualForm.controls['title'].setValue('');
  }

  onManualDeleted(file: File) {
    this.storage.deleteManual(file);
  }

  setView(data) {
    this.view = data.value;
  }
}
