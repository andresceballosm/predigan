import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AnimalesPage } from '../pages/animales/animales';
import { AnimalPage } from '../pages/animal/animal';
import { SaludPage } from '../pages/salud/salud';
import { InformesPage } from '../pages/informes/informes';


import { Todos } from '../providers/todos/todos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  todos : any;
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public todoService: Todos, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Animales', component: AnimalesPage },
      { title: 'Salud', component: SaludPage },
      { title: 'Informes', component: InformesPage },
      { title: 'Login', component: LoginPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(page){
      this.todoService.logout();
      this.todos = null;
      
      this.nav.setRoot(page.component);
    
    }
  }

