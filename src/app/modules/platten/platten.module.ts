import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCardModule, MdGridListModule, MdInputModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { PlattenDetailsComponent } from './platten-details/platten-details.component';
import { PlattenComponent } from './platten.component';

const ROUTES: Route[] = [
  {path: '', component: PlattenComponent},
  {path: ':key', component: PlattenDetailsComponent},
];

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MdInputModule,
    MdCardModule,
    MdGridListModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    PlattenComponent,
    PlattenDetailsComponent
  ]
})
export class PlattenModule {
}
