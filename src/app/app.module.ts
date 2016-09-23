import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { MdCardModule } from '@angular2-material/card';
import { MdListModule } from '@angular2-material/list';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { MdMenuModule } from '@angular2-material/menu';
import { MdCheckboxModule } from '@angular2-material/checkbox';
import { MdCoreModule, MdLineModule, MdRippleModule } from '@angular2-material/core';
import { MdIconModule } from '@angular2-material/icon';
import { MdRadioModule } from '@angular2-material/radio';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
import { MdTooltipModule } from '@angular2-material/tooltip';
import { MdTabsModule } from '@angular2-material/tabs';
import { MdButtonToggleModule } from '@angular2-material/button-toggle';
import { MdGridListModule } from '@angular2-material/grid-list';
import { MdProgressBarModule } from '@angular2-material/progress-bar';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
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
import { FILE_UPLOAD_DIRECTIVES } from 'ng2-file-upload';
import { LinkAccountComponent } from './components/link-account/link-account.component';
import { FileInputDirective } from './file-input/file-input.directive';
import { PlattenDetailsComponent } from './components/platten/platten-details/platten-details.component';
import { ManualsComponent } from './components/manuals/manuals.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { FirechatComponent } from './firechat/firechat.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ChatComponent } from './components/chat/chat.component';

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
    FirechatComponent,
    SafePipe,
    PageNotFoundComponent,
    LinkAccountComponent,
    FileInputDirective,
    DropzoneComponent,
    FILE_UPLOAD_DIRECTIVES,
    ChatComponent
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
    // Material Design
    MdCardModule.forRoot(),
    MdListModule.forRoot(),
    MdButtonModule.forRoot(),
    MdInputModule.forRoot(),
    MdMenuModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdCoreModule.forRoot(),
    MdIconModule.forRoot(),
    MdRadioModule.forRoot(),
    MdLineModule,
    MdRippleModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdTooltipModule.forRoot(),
    MdTabsModule.forRoot(),
    MdButtonToggleModule.forRoot(),
    MdButtonToggleModule.forRoot(),
    MdGridListModule.forRoot(),
    MdProgressBarModule.forRoot(),
    MdProgressCircleModule.forRoot()
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
