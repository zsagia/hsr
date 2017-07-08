import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { MdButtonModule, MdIconModule, MdListModule, MdSliderModule, MdSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HsrPlayerService } from './hsr-player.service';
import 'hammerjs'
import { PipesModule } from '../pipes/pipes.module';

const DECLARATIONS = [
  PlayerComponent
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    MdSnackBarModule,
    MdIconModule,
    MdListModule,
    MdButtonModule,
    MdSliderModule,
    FlexLayoutModule
  ],
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  providers: [
    HsrPlayerService
  ]
})
export class PlayerModule { }
