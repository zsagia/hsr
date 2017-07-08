import { Component, OnDestroy, OnInit } from '@angular/core';
import { GalleryImage, GalleryService } from 'ng-gallery';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrStorageService } from '../../shared/services/hsr-storage.service';
import { ProgressHelper } from './shared/progress.helper';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'hsr-fotos',

  templateUrl: './fotos.component.html'
})
export class FotosComponent implements OnInit, OnDestroy {

  fotosList: FirebaseListObservable<any[]>;
  reversedFotosList: Observable<any[]>;
  galleryImages: GalleryImage[] = [];
  uploadProgress: ProgressHelper;
  fileToRemove: File;
  areFilesInList = false;

  subscription: Subscription;

  constructor(private progressBar: SlimLoadingBarService,
    public hsrAuthService: HsrAuthService,
    private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService, private galleryService: GalleryService, private snackBar: MdSnackBar) {
  }

  // TODO: implement folders;) + treeview
  ngOnInit() {
    this.fotosList = this.hsrDatabaseService.getFotos();
    // TODO: find out why it reverses itself on push or delete
    this.reversedFotosList = Object.assign(this.fotosList.map((array) => array.reverse()));
    this.subscription = this.reversedFotosList.subscribe((fotos) => {
      this.galleryImages = [];
      fotos.forEach((foto) => {
        this.galleryImages.push({src: foto.url, text: foto.name});
      });
      this.galleryService.reset();
      this.galleryService.load(this.galleryImages);
    });
  }

  openInGallery(index: number) {
    this.galleryService.set(index);
  }

  onFilesChanged(event) {
    this.areFilesInList = event;
  }

  onFilesUploading(files: File[]): void {
    this.uploadProgress = new ProgressHelper(files.length);
    let waitingSnackBarRef = this.snackBar.open('Bilder werden hochgeladen...' + this.uploadProgress.percent + '\%');
    this.progressBar.reset();
    this.progressBar.start();
    for (const file of files) {
      this.hsrStorageService.uploadFoto(file).then((snapshot) => {
        // TODO: use firebase.database.ServerValue.TIMESTAMP
        const now = Date.now();
        const data = {
          name: snapshot.metadata.name,
          url: snapshot.metadata.downloadURLs[0],
          contentType: snapshot.metadata.contentType,
          fullPath: snapshot.metadata.fullPath,
          timeCreated: snapshot.metadata.timeCreated,
          size: snapshot.metadata.size,
          author: this.hsrAuthService.stateSnapshot.email,
          date: now,
          reverseDate: 0 - now
        };
        this.fotosList.push(data).then(() => {
          console.log('foto saved to database:');
          console.log(file);
          console.log(data);
          this.fileToRemove = file;
          this.uploadProgress.done++;
          this.progressBar.progress = this.uploadProgress.percent;
          waitingSnackBarRef.dismiss();
          waitingSnackBarRef = this.snackBar.open('Bilder werden hochgeladen...' + this.uploadProgress.percent + '\%');
          console.log(this.uploadProgress.percent + '\%');
          if (this.uploadProgress.done === this.uploadProgress.total) {
            waitingSnackBarRef.dismiss();
            this.snackBar.open('Hochladen abgeschlossen!', '', {duration: 3000});
            console.log('FINISHED UPLOAD');
            this.uploadProgress = null;
            this.progressBar.complete();
            this.reversedFotosList = Object.assign(this.fotosList.map((array) => array.reverse()));
          }
        });
      });
    }
  }

  deleteFoto(event: MouseEvent, key: string) {
    event.stopPropagation();
    event.preventDefault();
    this.fotosList.remove(key);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
