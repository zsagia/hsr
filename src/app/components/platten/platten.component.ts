import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseDatabaseService } from '../../shared/firebase-database.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'hsr-platten',
  templateUrl: 'platten.component.html',
  styleUrls: ['platten.component.scss']
})
export class PlattenComponent implements OnInit {

  platteForm: FormGroup;

  // cover = new FormControl('', Validators.required);

  platten: FirebaseListObservable<any>;

  constructor(private fb: FormBuilder, private database: FirebaseDatabaseService) {
    this.platteForm = fb.group({
      name: ['', Validators.required],
      kurzbezeichnung: [''],
      label: [''],
      sideA: ['', Validators.required],
      sideB: ['', Validators.required],
      genre: [''],
      year: [''],
      cover: ['']
    });
    this.platten = database.getPlatten();
  }

  onSubmit(event) {
    console.log('Speichere Platte:');
    console.log(this.platteForm.value);
    this.platten.push(this.platteForm.value);
  }

  ngOnInit() {
  }

}
