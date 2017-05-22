import { Component, OnDestroy, OnInit } from '@angular/core';
import { HsrStorageService } from '../../services/firebase-storage.service';
import { HsrDatabaseService } from '../../services/firebase-database.service';
import { HsrAuthService } from '../../services/firebase-auth.service';
import { ProgressHelper } from './shared/progress.helper';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'hsr-fotos',

  templateUrl: 'fotos.component.html',
  styleUrls: ['fotos.component.scss']
})
export class FotosComponent implements OnInit, OnDestroy {

  fotosList: ModalImage[] = [];
  uploadProgress: ProgressHelper;
  fileToRemove: File;
  areFilesInList = false;
  openModalWindow = false;
  imagePointer: number;

  constructor(private progressBar: SlimLoadingBarService,
    private hsrAuthService: HsrAuthService,
    private hsrStorageService: HsrStorageService,
    private hsrDatabaseService: HsrDatabaseService) {
  }

  // TODO: implement folders;) + treeview
  ngOnInit() {
    this.hsrDatabaseService.getFotosReverse().subscribe((fotos) => {
      fotos.forEach((foto) => {
        this.fotosList.push({
          thumb: foto.url,
          img: foto.url,
          description: foto.name
        });
      });
    });
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
        const now = Date.now();
        const data = {
          name: snapshot.metadata.name,
          url: snapshot.metadata.downloadURLs[0],
          contentType: snapshot.metadata.contentType,
          fullPath: snapshot.metadata.fullPath,
          timeCreated: snapshot.metadata.timeCreated,
          size: snapshot.metadata.size,
          author: this.hsrAuthService.getCurrentUser().displayName || this.hsrAuthService.getCurrentUser().email,
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
    this.hsrDatabaseService.getFotosReverse();
  }
}

export interface ModalImage {
  img: string;
  thumb: string;
  description: string;
}
