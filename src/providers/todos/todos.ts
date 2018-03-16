import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';
 
@Injectable()
export class Todos {

   data: any;
  db: any;
  username: any;
  password: any;
  remote: any; 
 
  constructor(public zone: NgZone) {
 
    this.db = new PouchDB('predigandb');
    this.username = 'chridendeadeerwaillcyled';
    this.password = 'aa008027ba1db02a80a3e2d0e036cbe051591e9a';
    this.remote = 'https://2b5d1736-bfd5-4eb5-b266-8ae54301f5bb-bluemix.cloudant.com/predigandb';
 
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };
 
    this.db.sync(this.remote, options);
 
  }

   addDocument(doc){
    this.db.put(doc);
  }
 
  getDocuments(){
 
    return new Promise(resolve => {
 
      this.db.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });
 
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      });
 
    });
 
  }
 
  handleChange(change){
 
    this.zone.run(() => {
 
      let changedDoc = null;
      let changedIndex = null;
 
      this.data.forEach((doc, index) => {
 
        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
        }
 
      });
 
      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }
      else {
 
        //A document was updated
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }
        //A document was added
        else {
          this.data.push(change.doc);       
        }
 
      }
 
    });
 
  }

  deleteItems(items){
    this.db.remove(items).catch((err) => {
      console.log(err);
    });
  }

  getAnimal(item){
console.log(item)
    return this.data.filter(function(e,i){return e._id==item});
    
  }
 
 
   createTodo(item){
     this.db.post(item);
   }
 
}
 
/*  data: any;
  db: any;
  remote: any;

  constructor() {
  }
 
  init(details){
 
    this.db = new PouchDB('cloudo');
 
    this.remote = details.userDBs.supertest;
 
    let options = {
      live: true,
      retry: true,
      continuous: true
    };
 
    this.db.sync(this.remote, options);
 
    console.log(this.db);
 
  }
 
  logout(){
 
    this.data = null;
 
    this.db.destroy().then(() => {
      console.log("database removed");
    });
  }

 
  getTodos() {
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.db.allDocs({
 
        include_docs: true
 
      }).then((result) => {
 
        this.data = [];
 
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
 
        resolve(this.data);
 
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
 
      }).catch((error) => {
 
        console.log(error);
 
      });
 
    });
 
  }

 

  getAnimal(_id){

   return this.data.filter(function(e,i){return e._id==_id});
    }


  createTodo(todo){
    this.db.post(todo);
  }
 
  updateTodo(todo){
    this.db.put(todo).catch((err) => {
      console.log(err);
    });
  }
 
  deleteTodo(todo){
    this.db.remove(todo).catch((err) => {
      console.log(err);
    });
  }
 
  handleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
 
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
 
    });
 
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {
 
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }
 
      //A document was added
      else {
        this.data.push(change.doc);
      }
 
    }
 
  }
 
}*/