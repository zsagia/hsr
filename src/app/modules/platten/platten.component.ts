import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrDatabaseService } from '../../shared/services/firebase-database.service';
import { HsrStorageService } from '../../shared/services/firebase-storage.service';

@Component({
  selector: 'hsr-platten',
  templateUrl: './platten.component.html'
})
export class PlattenComponent implements OnInit, OnDestroy {

  platteForm: FormGroup;
  platten: FirebaseListObservable<any>;
  coverFileName: string;
  isSaved = false;
  resetFileInput = false;

  constructor(private formBuilder: FormBuilder, private hsrDatabaseService: HsrDatabaseService, private hsrStorageService: HsrStorageService) {
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
    this.platten = this.hsrDatabaseService.getPlatten();
  }

  ngOnDestroy() {
    if (!this.isSaved && this.platteForm.controls['cover'].touched) {
      this.hsrStorageService.deleteCover(this.coverFileName);
    }
  }

  // onFileSelected(files: File[]) {
  //   this.resetFileInput = false;
  //   this.hsrStorageService.uploadCover(files[0]).then((snapshot) => {
  //     const url = snapshot.metadata.downloadURLs[0];
  //     this.coverFileName = snapshot.metadata.name;
  //     this.platteForm.controls['cover'].patchValue(url);
  //   });
  // }
  //
  // deleteCover() {
  //   this.platteForm.controls['cover'].reset('');
  //   this.hsrStorageService.deleteCover(this.coverFileName);
  //   this.resetFileInput = true;
  // }

  onSubmit(event) {
    this.platten.push(this.platteForm.value);
    this.platteForm.reset();
    this.isSaved = true;
    this.resetFileInput = true;
  }
}
