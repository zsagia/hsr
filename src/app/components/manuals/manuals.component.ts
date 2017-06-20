import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HsrAuthService } from '../../services/firebase-auth.service';
import { HsrDatabaseService } from '../../services/firebase-database.service';
import { HsrStorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'hsr-manuals',
  templateUrl: 'manuals.component.html',
  styleUrls: ['manuals.component.scss']
})
export class ManualsComponent implements OnInit {

  manualForm: FormGroup;
  view = 'grid';

  currentManual: File;

  constructor(private formBuilder: FormBuilder,
    private firebaseStorageService: HsrStorageService,
    private firebaseDatabaseService: HsrDatabaseService,
    private firebaseAuthService: HsrAuthService) {
  }

  ngOnInit() {
    this.manualForm = this.formBuilder.group({
      title: ['', Validators.required]
      // TODO: disable when no title / make validation work for input-file
      // manualFile: [{value: '', disabled: true}, Validators.required]
    });
  }

  get manualsList() {
    return this.firebaseDatabaseService.getManuals();
  }

  onManualAdded(file: File) {
    this.currentManual = file;
  }

  onSubmit() {
    this.firebaseStorageService.uploadManual(this.currentManual).then((snapshot) => {
      const now = Date.now();
      const data = {
        name: snapshot.metadata.name,
        url: snapshot.metadata.downloadURLs[0],
        contentType: 'application/pdf',
        fullPath: snapshot.metadata.fullPath,
        timeCreated: snapshot.metadata.timeCreated,
        size: snapshot.metadata.size,
        author: this.firebaseAuthService.email,
        date: now,
        reverseDate: 0 - now,
        title: this.manualForm.controls['title'].value
      };
      this.firebaseDatabaseService.getManuals().push(data);
      this.manualForm.controls['title'].setValue('');
    });
  }

  onManualDeleted(event: Event, filename: string) {
    event.stopPropagation();
    event.preventDefault();
    this.firebaseStorageService.deleteManual(filename);
  }

  isAuthor(author) {
    return author === this.firebaseAuthService.email;
  }

  setView(data) {
    this.view = data.value;
  }
}
