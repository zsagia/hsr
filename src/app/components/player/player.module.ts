import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { MdButtonModule, MdIconModule, MdListModule, MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HsrPlayerService } from './hsr-player.service';

const DECLARATIONS = [
  PlayerComponent
];

@NgModule({
  imports: [
    CommonModule,
    MdSnackBarModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    FlexLayoutModule
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [
    HsrPlayerService
  ]
})
export class PlayerModule { }
