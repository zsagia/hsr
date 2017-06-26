import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdGridListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { MyRoute } from '../../config/routes.config';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { GALLERY_CONFIG } from './config/gallery.config';
import { FotosComponent } from './fotos.component';

const ROUTES: MyRoute[] = [
  {path: '', component: FotosComponent}
];

@NgModule({
  imports: [
    CommonModule,
    SlimLoadingBarModule,
    DropzoneModule,
    RouterModule.forChild(ROUTES),
    FlexLayoutModule,
    MdGridListModule,
    GalleryModule.forRoot(GALLERY_CONFIG)
  ],
  declarations: [
    FotosComponent
  ]
})
export class FotosModule {
}
