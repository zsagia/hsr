import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdCardModule, MdCommonModule, MdCoreModule, MdInputModule, MdListModule, MdMenuModule, MdRippleModule, MdToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import 'hammerjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { FIREBASE_CONFIG } from './config/firebase.config';
import { ROUTES_CONFIG } from './config/routes.config';
import { StickyDirective } from './shared/directives/sticky.directive';
import { HsrAuthService } from './shared/services/hsr-auth.service';
import { HsrDatabaseService } from './shared/services/hsr-database.service';
import { HsrStorageService } from './shared/services/hsr-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    StickyDirective
  ],
  imports: [
    RouterModule.forRoot(ROUTES_CONFIG),
    BrowserModule,
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG, 'hsr'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCardModule,
    MdCommonModule,
    MdCoreModule,
    MdListModule,
    MdInputModule,
    MdRippleModule,
    MdMenuModule,
    MdToolbarModule
  ],
  providers: [
    HsrAuthService,
    HsrDatabaseService,
    HsrStorageService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
