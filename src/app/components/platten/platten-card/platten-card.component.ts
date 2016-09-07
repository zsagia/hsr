import { Component, OnInit, Input } from '@angular/core';
import { Platte } from '../shared/platte.type';

@Component({
  selector: 'hsr-platten-card',
  templateUrl: 'platten-card.component.html',
  styleUrls: ['platten-card.component.scss']
})
export class PlattenCardComponent implements OnInit {

  @Input() platte: Platte;

  constructor() {
  }

  ngOnInit() {
  }

}
