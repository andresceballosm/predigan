import { Component } from '@angular/core';
import { Todos } from '../../providers/todos/todos';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
 
@Component({
  selector: 'page-animal',
  templateUrl: 'animal.html'
})
export class AnimalPage {
 
  items: any;
  _id: string;
  animal : Todos;
  nombre : string;
  raza:string;
  cod:string;
  lote:string;
  sexo:string;
  fecha:string;
  
  constructor( public navCtrl: NavController,public todoService: Todos, public navParams: NavParams,public alertCtrl: AlertController ) {
   
   //let item = this.navParams.get('_id')
   let item = this.navParams.get('animal')

   this.nombre=item.nombre;
   this.raza=item.raza;
   this.cod=item.cod;
   this.sexo=item.sexo;
   this.lote=item.lote;
   this.fecha=item.fecha
 

   //this.cargarAnimal(this._id);

  // this.items =todoService.getAnimal(item);
  // console.log(this.items);
  
}

cargarAnimal(_id){
  this.todoService.getAnimal(_id)
  .subscribe(
    rs => this.animal = rs[0],
    er => console.log(er),
    () => console.log('ok')

  ) 
}
 
  ionViewDidLoad(){
 
   /* this.items = [];
 
      this.todoService.getDocuments().then((result) => {
        this.items = result;
    });
*/ 
  }

  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [

      {
          name: 'nombre',
          placeholder: 'Nombre del animal'
         
        },
          {
          name: 'cod',
          placeholder:'Cod del animal'
        },
          {
          name: 'lote',
          placeholder:'Lote'
        },

      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();

/*   updateTodo(items){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Edite la información del animal, no deje espacios vacios si la información es la misma repita el dato',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre del animal'
         
        },
          {
          name: 'cod',
          placeholder:'Cod del animal'
        },
          {
          name: 'lote',
          placeholder:'Lote del animal'
        },
      ],
             buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }*/
 
 /*
  deleteTodo(items){
    this.todoService.deleteItems(items);
  }

 */
  }
 
  addData(){
 
    let date = new Date();
 
    let newDoc = {
      '_id': date,
      'message': date.getTime()
    };
 
    this.todoService.addDocument(newDoc);
  }
 
}
