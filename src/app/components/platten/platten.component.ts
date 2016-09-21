import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { FirebaseListObservable } from 'angularfire2';
import { FirebaseStorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'hsr-platten',
  templateUrl: 'platten.component.html',
  styleUrls: ['platten.component.scss']
})
export class PlattenComponent implements OnInit, OnDestroy {

  platteForm: FormGroup;
  platten: FirebaseListObservable<any>;
  coverFileName: string;
  isSaved: boolean = false;
  resetFileInput: boolean = false;

  constructor(private formBuilder: FormBuilder, private database: FirebaseDatabaseService, private storage: FirebaseStorageService) {
  }

  ngOnInit() {
    this.platteForm = this.formBuilder.group({
      name: ['', Validators.required],
      kurzbezeichnung: [''],
      label: [''],
      sideA: ['', Validators.required],
      sideB: ['', Validators.required],
      genre: [''],
      year: [''],
      cover: ['']
    });
    this.platten = this.database.getPlatten();
  }

  ngOnDestroy() {
    if (!this.isSaved && this.platteForm.controls['cover'].touched) {
      this.storage.deleteCover(this.coverFileName);
    }
  }

  onFileSelected(files: File[]) {
    this.resetFileInput = false;
    this.storage.uploadCover(files[0]).then((snapshot) => {
      let url = snapshot.metadata.downloadURLs[0];
      this.coverFileName = snapshot.metadata.name;
      this.platteForm.controls['cover'].patchValue(url);
    });
  }

  deleteCover() {
    this.platteForm.controls['cover'].reset('');
    this.storage.deleteCover(this.coverFileName);
    this.resetFileInput = true;
  }

  onSubmit(event) {
    this.platten.push(this.platteForm.value);
    this.platteForm.reset();
    this.isSaved = true;
    this.resetFileInput = true;
  }
}
