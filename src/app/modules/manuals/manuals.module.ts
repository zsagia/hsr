import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdGridListModule, MdInputModule, MdListModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { DropzoneModule } from '../../shared/dropzone/dropzone.module';
import { ManualsComponent } from './manuals.component';

const ROUTES: Route[] = [
  {path: '', component: ManualsComponent}
];

// noinspection JSUnusedGlobalSymbols
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
