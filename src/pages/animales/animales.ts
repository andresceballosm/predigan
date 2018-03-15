import { Component } from '@angular/core';
import { Todos } from '../../providers/todos/todos';
import { IonicPage, NavController, NavParams, AlertController,MenuController } from 'ionic-angular';

import { AnimalPage } from '../pages/animal/animal';
 
@Component({
  selector: 'page-animales',
  templateUrl: 'animales.html'
})
export class AnimalesPage {
 
  items: any;

  constructor(public nav: NavController, 
   public todoService: Todos,
   public alertCtrl: AlertController,
   public menu: MenuController) {
    
     menu.enable(true);
  }

  openMenu() {
     
         this.menu.enable(true, 'menu');
         this.menu.toggle();
  }

   ionViewDidLoad(){
 
    this.items = [];
 
      this.todoService.getDocuments().then((result) => {
        this.items = result;
      });
 
  }

 
  logout(){
    this.todoService.logout();
    this.items = null;
    this.nav.setRoot(LoginPage);
  }
 
  createTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
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
 
  }
 
  updateTodo(todo){
 
    let prompt = this.alertCtrl.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
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
  }
 
  deleteTodo(items){
    this.todoService.deleteItems(items);
  }
 
}

