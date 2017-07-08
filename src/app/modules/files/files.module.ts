import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdSnackBar, MdSnackBarModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { FilesComponent } from './files.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const ROUTES: Route[] = [
  {path: '', component: FilesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    DropzoneModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdButtonToggleModule,
    FlexLayoutModule,
    MdIconModule,
    MdListModule,
    MdGridListModule,
    MdSnackBarModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    FilesComponent
  ]
})
export class FilesModule {
}
