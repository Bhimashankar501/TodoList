import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  getData // get all the note
    () {
    throw new Error('Method not implemented.');
  }

  constructor(private fs:Firestore) { }

  //add new note 
  addtodo(todo:Todo){
    todo.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'task'),todo);

  }


  // get all the note
  gettodo():Observable<Todo[]>{
    let todosRef = collection(this.fs, 'task')
    return collectionData(todosRef,{idField:'id'}) as Observable<Todo[]>
    
  }
  // DElete NOte
  deleteTodo(todo:Todo){
    let decRef = doc(this.fs,   `task/${todo.id}`);
    return deleteDoc(decRef)
    
  }

  //update note
  updateTodo(todo:Todo, todos:any){
    let decRef = doc(this.fs,`task/${todo.id}`);
    return updateDoc(decRef, todos)



  }
}
