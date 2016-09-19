import { Component, OnInit } from '@angular/core';
import { FirebaseDatabaseService } from '../../services/firebase-database.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hsr-test11',
  template: `
   <img [src]="photo"/>
  `,
  styles: []
})
export class Test11Component implements OnInit {
  photo: string;

  constructor(private route: ActivatedRoute, private firebaseDatabaseService: FirebaseDatabaseService) {
  }

  ngOnInit() {
    this.route.params
        .subscribe(params => {
          this.firebaseDatabaseService.getItem(params['id']).subscribe(item => {
            this.photo = item.photo;
          });
        });
  }

}
