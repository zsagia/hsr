import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
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

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyADJKKoXeEe7_E4i2HLWB_eAZ7R9Vd-KbI',
  authDomain: 'hsr-site.firebaseapp.com',
  databaseURL: 'https://hsr-site.firebaseio.com',
  storageBucket: 'hsr-site.appspot.com',
};

export const APP_ROUTES = [
  {patch: '', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    BrowserModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    MdCardModule,
    MdListModule,
    MdButtonModule,
    MdInputModule,
    MdMenuModule,
    MdCheckboxModule,
    MdCoreModule,
    MdIconModule,
    MdRadioModule,
    MdLineModule,
    MdRippleModule,
    MdSidenavModule,
    MdToolbarModule,
    MdTooltipModule,
    MdTabsModule,
    MdButtonToggleModule,
    MdGridListModule,
    MdProgressBarModule,
    MdProgressCircleModule
  ],
  providers: [],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
