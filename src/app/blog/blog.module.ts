import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdCoreModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MyRoute } from '../config/routes.config';
import { PipesModule } from '../pipes/pipes.module';
import { BlogComponent } from './blog.component';
import { BlogService } from './blog.service';
import { FroalaEditorDirective, FroalaViewDirective } from './froala/froala.directives';

const ROUTES: MyRoute[] = [
  {path: '', component: BlogComponent}
];

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
    MdCardModule,
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
