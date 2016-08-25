import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'hsr-test2',
  template: `
<md-card>
  <h1>Test2</h1>
  <code>{{ item | async | json }}</code>
  <input type="text" #newname placeholder="Name" />
  <input type="text" #newsize placeholder="Size" />
  <br />
  <button (click)="save(newname.value)">Set Name</button>
  <button (click)="update(newsize.value)">Update Size</button>
  <button (click)="delete()">Delete</button>
  </md-card>
  `,
})
export class Test2Component {
  item: FirebaseObjectObservable<any>;

  constructor(af: AngularFire) {
    this.item = af.database.object('/item');
  }

  save(newName: string) {
    this.item.set({name: newName});
  }

  update(newSize: string) {
    this.item.update({size: newSize});
  }

  delete() {
    this.item.remove();
  }
}
