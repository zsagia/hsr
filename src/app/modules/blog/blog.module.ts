import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdCoreModule, MdExpansionModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { Route, RouterModule } from '@angular/router';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { BlogComponent } from './blog.component';
import { BlogService } from './blog.service';
import { FroalaEditorDirective, FroalaViewDirective } from './froala/froala.directives';
import { FlexLayoutModule } from '@angular/flex-layout';

const ROUTES: Route[] = [
  {path: '', component: BlogComponent}
];

// noinspection JSUnusedGlobalSymbols
@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    MdCoreModule,
    FormsModule,
    MdSnackBarModule,
    MdInputModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSnackBarModule,
    MdCardModule,
    MdExpansionModule,
    FlexLayoutModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    BlogComponent,
    FroalaEditorDirective,
    FroalaViewDirective,
  ],
  providers: [
    BlogService
  ]
})
export class BlogModule {
}
