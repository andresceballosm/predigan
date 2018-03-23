import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, ViewChild } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { Todos } from '../providers/todos/todos';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnimalesPage } from '../pages/animales/animales';
import { AnimalPage } from '../pages/animal/animal';
import { AddanimalPage } from '../pages/addanimal/addanimal';
import { SaludPage } from '../pages/salud/salud';
import { InformesPage } from '../pages/informes/informes';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    AnimalesPage,
    AnimalPage,
    AddanimalPage,
    SaludPage,
    InformesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    AnimalesPage,
    AnimalPage,
    AddanimalPage,
    SaludPage,
    InformesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},Todos
  ]
})
export class AppModule {}
