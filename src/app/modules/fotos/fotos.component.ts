import { Component, OnDestroy, OnInit } from '@angular/core';
import { GalleryImage, GalleryService } from 'ng-gallery';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { HsrAuthService } from '../../shared/services/hsr-auth.service';
import { HsrDatabaseService } from '../../shared/services/hsr-database.service';
import { HsrStorageService } from '../../shared/services/hsr-storage.service';
import { ProgressHelper } from './shared/progress.helper';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'hsr-fotos',

  templateUrl: './fotos.component.html'
})
export class FotosComponent implements OnInit, OnDestroy {

  fotosList: ModalImage[] = [];
  galleryImages: GalleryImage[] = [];
  uploadProgress: ProgressHelper;
  fileToRemove: File;
  areFilesInList = false;
  openModalWindow = false;
  imagePointer: number;

  subscription: Subscription;

  constructor(private progressBar: SlimLoadingBarService,
    private hsrAuthService: HsrAuthService,
    private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService, private galleryService: GalleryService) {
  }

  // TODO: implement folders;) + treeview
  ngOnInit() {
    this.subscription = this.hsrDatabaseService.getFotosReverse().subscribe((fotos) => {
      this.fotosList = [];
      this.galleryImages = [];
      fotos.forEach((foto) => {
        this.fotosList.push({thumb: foto.url, img: foto.url, description: foto.name});
        this.galleryImages.push({src: foto.url, text: foto.name});
      });
      this.galleryService.load(this.galleryImages);
    });
  }

  openInGallery(index: number) {
    this.galleryService.set(index);
  }

  openImageModal(imageSrc, images) {
    let imageModalPointer;
    for (let i = 0; i < images.length; i++) {
      if (imageSrc === images[i].img) {
        imageModalPointer = i;
        break;
      }
    }
    this.openModalWindow = true;
    this.fotosList = images;
    this.imagePointer = imageModalPointer;
  }

  cancelImageModal() {
    this.openModalWindow = false;
  }

  onFilesChanged(event) {
    this.areFilesInList = event;
  }

  onFilesUploading(files: File[]): void {
    this.uploadProgress = new ProgressHelper(files.length);
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
        this.hsrDatabaseService.getFotos().push(data);
        console.log('foto saved to database:');
        console.log(file);
        console.log(data);
        this.fileToRemove = file;
        this.uploadProgress.done++;
        this.progressBar.progress = this.uploadProgress.percent;
        console.log(this.uploadProgress.percent + '\%');
        if (this.uploadProgress.done === this.uploadProgress.total) {
          console.log('FINISHED UPLOAD');
          this.uploadProgress = null;
          this.progressBar.complete();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export interface ModalImage {
  img: string;
  thumb: string;
  description: string;
}
