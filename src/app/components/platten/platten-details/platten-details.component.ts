import { OnInit, OnDestroy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseDatabaseService } from '../../../services/firebase-database.service';
import { FirebaseStorageService } from '../../../services/firebase-storage.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'hsr-platten-details',
  templateUrl: 'platten-details.component.html',
  styleUrls: ['platten-details.component.scss']
})
export class PlattenDetailsComponent implements OnInit, OnDestroy {
  plattenDetailsForm: FormGroup;
  platte: FirebaseObjectObservable<any>;
  coverFileName: string;
  isSaved: boolean = false;
  resetFileInput: boolean = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private database: FirebaseDatabaseService, private storage: FirebaseStorageService) {
  }

  ngOnInit() {
    this.plattenDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      kurzbezeichnung: [''],
      label: [''],
      sideA: ['', Validators.required],
      sideB: ['', Validators.required],
      genre: [''],
      year: [''],
      cover: ['']
    });

    this.route.params
        .subscribe(params => {
          this.platte = this.database.getPlatte(params['key']);
          this.platte.subscribe(platte => {
            this.plattenDetailsForm.patchValue(platte);
          });
        });
  }

  ngOnDestroy() {
    if (!this.isSaved && this.plattenDetailsForm.controls['cover'].touched) {
      this.storage.deleteCover(this.coverFileName);
    }
  }

  onFileSelected(files: File[]): void {
    this.resetFileInput = false;
    this.storage.uploadCover(files[0]).then((snapshot) => {
      let url = snapshot.metadata.downloadURLs[0];
      this.coverFileName = snapshot.metadata.name;
      this.plattenDetailsForm.controls['cover'].setValue(url);
    });
  }

  deleteCover() {
    this.plattenDetailsForm.controls['cover'].reset('');
    this.storage.deleteCover(this.coverFileName);
    this.resetFileInput = true;
  }

  onSubmit(event) {
    this.platte.update(this.plattenDetailsForm.value);
    this.isSaved = true;
  }
}
