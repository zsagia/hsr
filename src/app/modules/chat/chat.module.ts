import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { LinkyModule } from 'angular-linky';
import { MyRoute } from '../../config/routes.config';
import { ChatComponent } from './chat.component';

const ROUTES: MyRoute[] = [
  {path: '', component: ChatComponent}
];

@NgModule({
  imports: [
    CommonModule,
    MdInputModule,
    FormsModule,
    MdButtonModule,
    MdCardModule,
    LinkyModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ChatComponent
  ]
})
export class ChatModule {
}
