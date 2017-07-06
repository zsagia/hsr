import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdIconModule, MdInputModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { LinkyModule } from 'angular-linky';
import { ChatComponent } from './chat.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const ROUTES: Route[] = [
  {path: '', component: ChatComponent}
];

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    FlexLayoutModule,
    LinkyModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatModule {
}
