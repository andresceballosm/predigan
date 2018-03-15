import { Component, OnChanges } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos/todos';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
 
  name: string;
  username: string;
  finca: string;
  pais: string;
  email: string;
  password: string;
  confirmPassword: string;
 
  constructor(public nav: NavController, public http: Http, public todoService: Todos) {
 
  }
 
 /*register(){
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
 
      let user = {
        name: this.name,
        username: this.username,
        finca:this.finca,
        pais:this.pais,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
      };
 
      //this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
      this.http.post('http://predigan.cloudno.de/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          this.todoService.init(res.json());
          this.nav.setRoot(HomePage);
        }, (err) => {
          console.log(err);
        });
 
  }
 */
}

