import { Injectable, OnDestroy } from '@angular/core';
import 'howler';
import { StorageFile } from '../../modules/files/files.component';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar } from '@angular/material';

interface PlayListItem {
  id: string;
  songPlaying: boolean;
  sound: Howl;
}

interface CurrentPlaying {
  id: string;
  index: number;
  sound: Howl;
}

interface PlayerEvents {
  onEnd$: Subject<any>;
  onStop$: Subject<any>;
  onPlay$: Subject<CurrentPlaying>;
  onLoad$: Subject<any>;
  onPause$: Subject<any>;
  playing$: BehaviorSubject<any>;
}

@Injectable()
export class HsrPlayerService implements OnDestroy {
  public playList: PlayListItem[];
  public currentPlaying: CurrentPlaying = {index: 0, id: '', sound: null}; // keep track of current playing index
  public playerEvents: PlayerEvents;

  subscription: Subscription;

  anyPlaying = false;

  public loopList = true;

  constructor(public snackBar: MdSnackBar) {
    this.playerEvents = {
      onEnd$: new Subject(),
      onStop$: new Subject(),
      onPlay$: new Subject(),
      onLoad$: new Subject(),
      onPause$: new Subject(),
      playing$: new BehaviorSubject<boolean>(false)
    };
  }

  init(tracks: StorageFile[]) {
    this.playList = this.initPlaylist(tracks, this.playerEvents, this.playNext);
    console.log('Init playlist');
    console.log('Tracks:');
    console.log(tracks);
    console.log('Playlist:');
    console.log(this.playList);
  }

  playAtIndex(index) {
    this.newSong(this.playList, index, this.currentPlaying.index);
    this.currentPlaying.index = index;
  }

  playNext() {
    const index = this.currentPlaying.index + 1;
    if (index < this.playList.length) {
      this.playAtIndex(index);
    } else if (this.loopList) {
      this.playAtIndex(0);
    }
  }

  playPrevious() {
    const index = this.currentPlaying.index - 1;
    if (index >= 0) {
      this.playAtIndex(index);
    } else if (this.loopList) {
      this.playAtIndex(this.playList.length - 1);
    }
  }

  stop() {
    this.stopSong(this.playList[this.currentPlaying.index]);
  }

  playPause() {
    this.playPauseSong(this.playList[this.currentPlaying.index]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private newSong(playlist: PlayListItem[], i: number, index: number): PlayListItem[] {
    const currentSong = playlist[index];
    const nSong = playlist[i];
    if (currentSong.songPlaying) {
      this.stopSong(currentSong)
    }
    this.playPauseSong(nSong);
    return playlist;
  }

  private stopSong(song: PlayListItem): PlayListItem {
    if (song.songPlaying) {
      song.sound.stop();
      song.songPlaying = false;
      this.showSnack('\u23F9', song);
      return song;
    }
  }

  private playPauseSong(song: PlayListItem): PlayListItem {
    if (song.songPlaying) {
      song.sound.pause();
      song.songPlaying = false;
      this.showSnack('\u23F8', song);
    } else {
      song.sound.play();
      song.songPlaying = true;
      this.showSnack('\u25B6', song);
    }

    return song;
  }

  private showSnack(symbol: string, song) {
    this.snackBar.open(symbol + '  ' + song.id, '', {
      duration: 3000
    });
  }

  private initPlaylist(tracks: StorageFile[], playerEvents, playNext): PlayListItem[] {
    return this.setEvents(this.toPlaylist(tracks), playerEvents, playNext);
  }

  private toPlaylist(tracks: StorageFile[]): PlayListItem[] {
    return tracks.map(this.toPlaylistItem.bind(this));
  }

  private toPlaylistItem(file: StorageFile): PlayListItem {
    const isPlaying = this.currentPlaying.id === file.name;
    return <PlayListItem>({
      id: file.name,
      songPlaying: isPlaying,
      sound: isPlaying ? this.currentPlaying.sound : new Howl({src: [file.url], pool: 1})
    });
  }

  private setEvents(playList: PlayListItem[], playerEvents: PlayerEvents, playNext): PlayListItem[] {
    playList.forEach((item) => {
      item.sound.on('end', () => {
        this.playNext();
        playerEvents.onEnd$.next(null);
        playerEvents.playing$.next(this.anyPlaying);
      });
      item.sound.on('stop', () => {
        this.anyPlaying = false;
        playerEvents.onStop$.next(null);
        playerEvents.playing$.next(this.anyPlaying);
      });
      item.sound.on('play', () => {
        this.currentPlaying.id = this.playList[this.currentPlaying.index].id;
        this.currentPlaying.sound = this.playList[this.currentPlaying.index].sound;
        console.log('playing:');
        console.log(this.currentPlaying);
        this.anyPlaying = true;
        playerEvents.onPlay$.next(this.currentPlaying);
        playerEvents.playing$.next(this.anyPlaying);
      });
      item.sound.on('pause', () => {
        this.anyPlaying = false;
        playerEvents.onPause$.next(null);
        playerEvents.playing$.next(this.anyPlaying);
      });
      item.sound.on('load', () => {
        console.log('loaded')
        playerEvents.onLoad$.next(null);
        playerEvents.playing$.next(this.anyPlaying);
      });
      item.sound.on('seek', () => {
        console.log('seek')
      });
    });
    console.log('Events added');
    return playList;
  }
}
