import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdGridListModule, MdInputModule, MdListModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { FilesComponent } from './files.component';

const ROUTES: Route[] = [
  {path: '', component: FilesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    ReactiveFormsModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdListModule,
    MdGridListModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    FilesComponent
  ]
})
export class FilesModule {
}
