import { Component, OnChanges, ViewChild  } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController, NavParams, AlertController, LoadingController  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @ViewChild('signupSlider') signupSlider: any;
 
 
  name: string;
  username: string;
  finca: string;
  pais: string;
  email: string;
  password: string;
  confirmPassword: string;
  error:'';
  error1:'';
  registerValidate:FormGroup;

  submitAttempt: boolean = false;

  constructor(public nav: NavController, public loadingController:LoadingController, public formBuilder: FormBuilder, public http: Http, public todoService: Todos, private alertCtrl: AlertController) {
    this.registerValidate = formBuilder.group({
      name:  ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      username: ['', Validators.required],
      finca: ['', Validators.required],
      pais: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.minLength (6)],
      confirmPassword: ['', Validators.minLength (6)]
  });
  }
 
  next(){
    this.signupSlider.slideNext();
  }

  prev(){
      this.signupSlider.slidePrev();
  }

  register(){

     let loading = this.loadingController.create({content : "Cargando..."});
    
     this.submitAttempt = true;
    if(!this.registerValidate.valid){
      this.signupSlider.slideTo(1);
    }else{
 
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
      loading.present();
      //this.http.post('http://localhost:3000/auth/register', JSON.stringify(user), {headers: headers})
      this.http.post('https://predigan.herokuapp.com/auth/register', JSON.stringify(user), {headers: headers})
        .subscribe(res => {
          this.todoService.init(res.json());
          loading.dismissAll();
          this.nav.setRoot(HomePage);
          let alert = this.alertCtrl.create({
            title: 'Registro Exitoso!',
            subTitle: 'Bienvenido a Predigan, para nosotros es un placer contar con usted.',
            buttons: ['Aceptar'] 
          });
          alert.present();
        }, (err) => {
          loading.dismissAll();
          if(!!err.json().validationErrors.email){
            var error = "Email ya registrado";
          }else{
            var error = '';
          }

          if(!!err.json().validationErrors.password){
            var error1 = "Las contraseñas no son iguales";
          }else{
            var error1 = '';
          }

          if(!!err.json().validationErrors.username){
            var error2 = "El usuario ya existe";
          }else{
            var error2 = '';
          }

          let alert = this.alertCtrl.create({
            title: 'Registro fallido',
            subTitle: error+'+'+error1+'+'+error2,
            buttons: ['Cerrar']
          });
          alert.present();
          console.log(err);

        });
      }  
  }
 
}

