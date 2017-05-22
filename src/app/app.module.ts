import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdCommonModule,
  MdCoreModule,
  MdGridListModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdRippleModule,
  MdSnackBarModule,
  MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'hammerjs';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { ChatComponent } from './components/chat/chat.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { HomeComponent } from './components/home/home.component';
import { LinkAccountComponent } from './components/link-account/link-account.component';
import { LoginComponent } from './components/login/login.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { PlattenDetailsComponent } from './components/platten/platten-details/platten-details.component';
import { PlattenComponent } from './components/platten/platten.component';
import { RegisterComponent } from './components/register/register.component';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { ROUTES_CONFIG } from './config/routes.config';
import { StickyDirective } from './directives/sticky.directive';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { FroalaEditorDirective, FroalaViewDirective } from './froala/froala.directives';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderBy } from './pipes/orderBy.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { HsrAuthService } from './services/firebase-auth.service';
import { HsrDatabaseService } from './services/firebase-database.service';
import { HsrStorageService } from './services/firebase-storage.service';
import { TinyMceComponent } from './tinymce/tinymce.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    BlogComponent,
    FotosComponent,
    FotosComponent,
    ManualsComponent,
    TinyMceComponent,
    PlattenComponent,
    PlattenDetailsComponent,
    SafePipe,
    OrderBy,
    ReversePipe,
    PageNotFoundComponent,
    LinkAccountComponent,
    DropzoneComponent,
    ChatComponent,
    FroalaEditorDirective,
    FroalaViewDirective,
    StickyDirective
  ],
  imports: [
    // Router
    RouterModule.forRoot(ROUTES_CONFIG),
    // Browser
    BrowserModule,
    // Common
    CommonModule,
    // AJAX
    HttpModule,
    JsonpModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // AngularFire2
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'hsr'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    // ng2 Slim Loading Bar
    SlimLoadingBarModule.forRoot(),
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdCommonModule,
    MdCoreModule,
    MdListModule,
    MdInputModule,
    MdRippleModule,
    MdMenuModule,
    MdToolbarModule,
    MdGridListModule,
    MdSnackBarModule
  ],
  providers: [
    HsrAuthService,
    HsrDatabaseService,
    HsrStorageService,
    FormBuilder
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
