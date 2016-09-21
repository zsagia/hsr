import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseStorageService } from '../../services/firebase-storage.service';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'hsr-manuals',
  templateUrl: 'manuals.component.html',
  styleUrls: ['manuals.component.scss']
})
export class ManualsComponent implements OnInit, OnDestroy {
  manualsList: FirebaseListObservable<any>;
  manualForm: FormGroup;
  manualFileName: string;
  isSaved: boolean = false;
  resetFileInput: boolean = false;

  constructor(private formBuilder: FormBuilder, private storage: FirebaseStorageService, private database: FirebaseDatabaseService) {
  }

  ngOnInit() {
    this.manualForm = this.formBuilder.group({
      titel: ['', Validators.required],
      manual: [''],
      // TODO: disable when no title / make validation work for input-file
      // manualFile: [{value: '', disabled: true}, Validators.required]
      manualFile: ['', Validators.required]
    });
    this.manualsList = this.database.getManuals();
  }

  ngOnDestroy() {
    if (!this.isSaved && this.manualForm.controls['manual'].touched) {
      this.storage.deleteManual(this.manualFileName);
    }
  }

  onFileSelected(files: File[]) {
    this.resetFileInput = false;
    this.storage.uploadManual(files[0], this.manualForm.controls['titel'].value);
  }

  deleteCover() {
    this.manualForm.controls['manual'].reset('');
    this.storage.deleteManual(this.manualFileName);
    this.resetFileInput = true;
  }

  onSubmit(event) {
    this.isSaved = true;
    this.resetFileInput = true;
  }
}
