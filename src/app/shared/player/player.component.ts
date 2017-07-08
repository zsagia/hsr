import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HsrDatabaseService } from '../services/hsr-database.service';
import { HsrPlayerService } from './hsr-player.service';

@Component({
  selector: 'hsr-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscription2: Subscription;

  opened = false;

  duration = 100;
  position = 0;

  constructor(private hsrDatabaseService: HsrDatabaseService, public hsrPlayerService: HsrPlayerService) {
  }

  ngOnInit() {
    this.subscription = this.hsrDatabaseService.getFiles().subscribe((files) => {
      const audioFiles = files.filter((file) => {
        return file.contentType === 'audio/mp3';
      });
      this.hsrPlayerService.init(audioFiles);
    });

    this.subscription2 = this.hsrPlayerService.playerEvents.onPlay$.subscribe((currentPlaying) => {
      this.duration = currentPlaying.sound ? currentPlaying.sound.duration() : 110;
      this.position = currentPlaying.sound ? <number>currentPlaying.sound.seek() : 0;
    })
    setInterval(() => {
      this.position = this.hsrPlayerService.currentPlaying.sound ? <number>this.hsrPlayerService.currentPlaying.sound.seek() : 0;
    }, 1000);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  setPosition(event) {
    this.hsrPlayerService.currentPlaying.sound.seek(event.value);
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

  playAtIndex(index: number) {
    this.hsrPlayerService.playAtIndex(index);
  }

}
