import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ROUTES_CONFIG } from './config/routes.config';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { FirebaseDatabaseService } from './services/firebase-database.service';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { TinyMceComponent } from './tinymce/tinymce.component';
import { PlattenComponent } from './components/platten/platten.component';
import { HttpModule, JsonpModule } from '@angular/http';
import { SafePipe } from './pipes/safe.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FirebaseStorageService } from './services/firebase-storage.service';
import { LinkAccountComponent } from './components/link-account/link-account.component';
import { PlattenDetailsComponent } from './components/platten/platten-details/platten-details.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ChatComponent } from './components/chat/chat.component';
import { FroalaEditorDirective, FroalaViewDirective } from './froala/froala.directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderBy } from "./pipes/orderBy.pipe";
import { ReversePipe } from './pipes/reverse.pipe';

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
    FroalaViewDirective
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
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    // ng2 Slim Loading Bar
    SlimLoadingBarModule.forRoot(),
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    FirebaseAuthService,
    FirebaseDatabaseService,
    FirebaseStorageService,
    FormBuilder
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
