import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdGridListModule, MdInputModule, MdListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MyRoute } from '../../config/routes.config';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { ManualsComponent } from './manuals.component';

const ROUTES: MyRoute[] = [
  {path: '', component: ManualsComponent}
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
    ManualsComponent
  ]
})
export class ManualsModule {
}
