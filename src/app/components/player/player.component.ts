import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrPlayerService } from './hsr-player.service';

@Component({
  selector: 'hsr-player',
  templateUrl: './player.component.html'
})
export class PlayerComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  opened = true;

  constructor(private hsrDatabaseService: HsrDatabaseService, public hsrPlayerService: HsrPlayerService) {
  }

  ngOnInit() {
    this.subscription = this.hsrDatabaseService.getFiles().subscribe((files) => {
      const audioFiles = files.filter((file) => {
        return file.contentType === 'audio/mp3';
      });
      this.hsrPlayerService.init(audioFiles);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleLoop() {
    this.hsrPlayerService.loopList = !this.hsrPlayerService.loopList
  }

  open() {
    this.opened = true;
  }

  close() {
    this.opened = false;
  }

  next() {
    this.hsrPlayerService.playNext();
  }

  previous() {
    this.hsrPlayerService.playPrevious();
  }

  stop() {
    this.hsrPlayerService.stop();
  }

  playPause() {
    this.hsrPlayerService.playPause();
  }

}
