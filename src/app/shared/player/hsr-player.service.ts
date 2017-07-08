import { Injectable, OnDestroy } from '@angular/core';
import 'howler';
import { StorageFile } from '../../modules/files/files.component';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar } from '@angular/material';

interface PlayListItem {
  id: string;
  url: string;
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

  ngOnDestroy() {
    this.playList.forEach((item) => {
      item.sound.unload();
    })
  }

  init(tracks: StorageFile[]) {
    this.playList = this.initPlaylist(tracks, this.playerEvents);
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
      if (!song.sound) {
        song.sound = new Howl({src: [song.url], html5: true});
        this.setEvents(song, this.playerEvents);
      }
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

  private initPlaylist(tracks: StorageFile[], playerEvents): PlayListItem[] {
    return this.toPlaylist(tracks);
  }

  private toPlaylist(tracks: StorageFile[]): PlayListItem[] {
    return tracks.map(this.toPlaylistItem.bind(this));
  }

  private toPlaylistItem(file: StorageFile): PlayListItem {
    const isPlaying = this.currentPlaying.id === file.name;
    return <PlayListItem>({
      id: file.name,
      url: file.url,
      songPlaying: isPlaying,
      sound: isPlaying ? this.currentPlaying.sound : null
    });
  }

  private setEvents(playListItem: PlayListItem, playerEvents: PlayerEvents): PlayListItem {
    playListItem.sound.on('end', () => {
      console.log('EVENT end');
      this.currentPlaying.sound.unload();
      this.playNext();
      playerEvents.onEnd$.next(null);
      playerEvents.playing$.next(this.anyPlaying);
    });
    playListItem.sound.on('stop', () => {
      console.log('EVENT stop');
      this.anyPlaying = false;
      this.currentPlaying.sound.unload();
      playerEvents.onStop$.next(null);
      playerEvents.playing$.next(this.anyPlaying);
    });
    playListItem.sound.on('play', () => {
      this.currentPlaying.id = this.playList[this.currentPlaying.index].id;
      this.currentPlaying.sound = this.playList[this.currentPlaying.index].sound;
      console.log('EVENT play');
      console.log(this.currentPlaying);
      this.anyPlaying = true;
      playerEvents.onPlay$.next(this.currentPlaying);
      playerEvents.playing$.next(this.anyPlaying);
    });
    playListItem.sound.on('pause', () => {
      console.log('EVENT pause');
      this.anyPlaying = false;
      playerEvents.onPause$.next(null);
      playerEvents.playing$.next(this.anyPlaying);
    });
    playListItem.sound.on('load', () => {
      console.log('EVENT load');
      playerEvents.onLoad$.next(null);
      playerEvents.playing$.next(this.anyPlaying);
    });
    playListItem.sound.on('seek', () => {
      console.log('EVENT seek');
    });

    return playListItem;
  }
}
