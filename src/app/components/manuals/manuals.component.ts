import { Component, OnInit } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hsr-manuals',
  templateUrl: 'manuals.component.html',
  styleUrls: ['manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  manualsList: FirebaseListObservable<any>;
  manualForm: FormGroup;
  view: string = 'list';

  constructor(private formBuilder: FormBuilder, private storage: FirebaseStorageService, private database: FirebaseDatabaseService) {
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
    this.storage.uploadManual(file, this.manualForm.controls['title'].value);
    this.manualForm.controls['title'].setValue('');
  }

  onManualDeleted(file: File) {
    this.storage.deleteManual(file);
  }

  setView(data) {
    this.view = data.value;
  }
}
