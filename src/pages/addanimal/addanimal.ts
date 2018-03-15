import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { Todos } from '../../providers/todos/todos';


@IonicPage()
@Component({
  selector: 'page-addanimal',
  templateUrl: 'addanimal.html',
})
export class AddanimalPage {

  public nombre;
  public cod;
  public raza;
  public sexo;
  public lote;
  public fecha;

  constructor(public nav: NavController, public http: Http, public todoService: Todos) {
       
  }

  registeranimal(){
  this.todoService.createTodo({
        nombre: this.nombre,
        cod: this.cod,
        raza: this.raza,
        sexo: this.sexo,
        lote: this.lote,
        fecha: this.fecha,

     })
       }
  

    
  
  }


  
 


