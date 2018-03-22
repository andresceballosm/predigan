import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import   superlogin from 'superlogin-client';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos/todos';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    username: string;
    password: string;

  constructor(public nav: NavController, public http: Http, public todoService: Todos , private alertCtrl: AlertController) {
  }

 login(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let credentials = {
        username: this.username,
        password: this.password
      };
 
      //this.http.post('http://localhost:3000/auth/login', JSON.stringify(credentials), {headers: headers})
        this.http.post('https://predigan.herokuapp.com/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe(res => {
          this.todoService.init(res.json());
          this.nav.setRoot(HomePage);
        }, (err) => {
          let alert = this.alertCtrl.create({
            title: 'Autenticación fallida',
            subTitle: 'Usuario o contraseña inválidos',
            buttons: ['Cerrar']
          });
          alert.present();
          console.log(err);
        });
 
  }

  forgotPassword() {

    let alert = this.alertCtrl.create({
      title: 'Recuperar contraseña',
      message: 'Ingrese su email',
      inputs: [
        {
          name: 'email',
          type: 'email'
        }
      ],
      buttons: [{
        text: 'OK',
        handler: data => {
          }
      }]
    });
    alert.present();
  }
 
  launchSignup(){
    this.nav.push(SignupPage);
  }
 
}