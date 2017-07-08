import { Injectable, OnDestroy } from '@angular/core';
import 'howler';
import { StorageFile } from '../../modules/files/files.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar } from '@angular/material';

interface PlayListItem {
  id: number;
  songPlaying: boolean;
  sound: Howl;
}

interface PlayerEvents {
  onEnd$: Subject<any>;
  onStop$: Subject<any>;
  onPlay$: Subject<any>;
  onPause$: Subject<any>;
  playing$: BehaviorSubject<any>;
}

@Injectable()
export class HsrPlayerService implements OnDestroy {
  private playList: PlayListItem[];
  private currentPlayingIndex: number; // keep track of current playing index
  public playerEvents: PlayerEvents;

  subscription: Subscription;

  constructor(public snackBar: MdSnackBar) {
    this.currentPlayingIndex = 0; // set initial index
    this.playerEvents = {
      onEnd$: new Subject(),
      onStop$: new Subject(),
      onPlay$: new Subject(),
      onPause$: new Subject(),
      playing$: new BehaviorSubject<boolean>(false)
    };
  }

  init(tracks: StorageFile[]) {
    if (anyPlaying) {
      this.stop();
    }
    this.playList = initPlaylist(tracks, this.playerEvents, this.playNext);
    console.log('Init playlist');
    console.log('Tracks:');
    console.log(tracks);
    console.log('Playlist:');
    console.log(this.playList);
  }

  playAtIndex(index) {
    newSong(this.playList, index, this.currentPlayingIndex);
    this.currentPlayingIndex = index;
  }

  playNext() {
    const index = this.currentPlayingIndex + 1;
    if (index < this.playList.length) {
      this.playAtIndex(index);
    }
  }

  playPrevious() {
    const index = this.currentPlayingIndex - 1;
    if (index >= 0) {
      this.playAtIndex(index);
    }
  }

  stop() {
    stopSong(this.playList[this.currentPlayingIndex]);
  }

  playPause() {
    playPauseSong(this.playList[this.currentPlayingIndex]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

let anyPlaying = false;

function initPlaylist(tracks: StorageFile[], playerEvents, playNext): PlayListItem[] {
  return setEvents(toPlaylist(tracks), playerEvents, playNext);
}

function toPlaylist(tracks: StorageFile[]): PlayListItem[] {
  return tracks.map(toPlaylistItem);
}

function toPlaylistItem(file: StorageFile): PlayListItem {
  return <PlayListItem>({
    id: file.date,
    songPlaying: false,
    sound: new Howl({
      src: [file.url],
      html5: true
    })
  });
}

function setEvents(playList: PlayListItem[], playerEvents: PlayerEvents, playNext): PlayListItem[] {
  playList.forEach((item) => {
    item.sound.on('end', () => {
      anyPlaying = false;
      playerEvents.onEnd$.next(null);
      playerEvents.playing$.next(anyPlaying);
    });
    item.sound.on('stop', () => {
      anyPlaying = false;
      playerEvents.onStop$.next(null);
      playerEvents.playing$.next(anyPlaying);
    });
    item.sound.on('play', () => {
      anyPlaying = true;
      playerEvents.onPlay$.next(null);
      playerEvents.playing$.next(anyPlaying);
    });
    item.sound.on('pause', () => {
      anyPlaying = false;
      playerEvents.onPause$.next(null);
      playerEvents.playing$.next(anyPlaying);
    });
  });
  console.log('Events added');
  return playList;
}

function newSong(playlist: PlayListItem[], i: number, index: number): PlayListItem[] {
  const currentSong = playlist[index];
  const nSong = playlist[i];
  if (currentSong.songPlaying) {
    stopSong(currentSong)
  }
  playPauseSong(nSong);
  return playlist;
}

function stopSong(song: PlayListItem): PlayListItem {
  song.sound.stop();
  song.songPlaying = false;
  return song;
}

function playPauseSong(song: PlayListItem): PlayListItem {
  if (song.songPlaying) {
    song.sound.pause();
    song.songPlaying = false;
  } else {
    song.sound.play();
    song.songPlaying = true;
  }
  return song;
}
