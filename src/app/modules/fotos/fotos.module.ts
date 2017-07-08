import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule, MdCardModule, MdGridListModule, MdSnackBarModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { GALLERY_CONFIG } from './config/gallery.config';
import { FotosComponent } from './fotos.component';

const ROUTES: Route[] = [
  {path: '', component: FotosComponent}
];

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports: [
    CommonModule,
    SlimLoadingBarModule,
    DropzoneModule,
    RouterModule.forChild(ROUTES),
    FlexLayoutModule,
    MdGridListModule,
    MdSnackBarModule,
    MdCardModule,
    MdButtonModule,
    GalleryModule.forRoot(GALLERY_CONFIG)
  ],
  declarations: [
    FotosComponent
  ]
})
export class FotosModule {
}
