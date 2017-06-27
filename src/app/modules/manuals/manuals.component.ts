import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseListObservable } from 'angularfire2/database';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrStorageService } from '../../shared/services/hsr-storage.service';

@Component({
  selector: 'hsr-manuals',
  templateUrl: './manuals.component.html'
})
export class ManualsComponent implements OnInit {

  manualForm: FormGroup;
  view = 'grid';

  currentManual: File;

  manualsList: FirebaseListObservable<any>;

  constructor(private formBuilder: FormBuilder,
    private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService,
    public hsrAuthService: HsrAuthService) {
  }

  ngOnInit() {
    this.manualsList = this.hsrDatabaseService.getManuals();
    this.manualForm = this.formBuilder.group({
      title: ['', Validators.required]
      // TODO: disable when no title / make validation work for input-file
      // manualFile: [{value: '', disabled: true}, Validators.required]
    });
  }

  onManualAdded(file: File) {
    this.currentManual = file;
  }

  onSubmit() {
    this.hsrStorageService.uploadManual(this.currentManual).then((snapshot) => {
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
        title: this.manualForm.controls['title'].value
      };
      this.manualsList.push(data);
      this.manualForm.controls['title'].setValue('');
    });
  }

  onDeleteManual(event: Event, key: string, filename: string) {
    event.stopPropagation();
    event.preventDefault();
    this.hsrStorageService.deleteManual(key, filename);
  }

  setView(data) {
    this.view = data.value;
  }
}
