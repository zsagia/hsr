import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule } from '@angular/material';
import { DropzoneComponent } from './dropzone.component';

const DECLARATIONS = [
  DropzoneComponent
];

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS
})
export class DropzoneModule {
}
