import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  task: string = '';
  tasks: Todo[] = [];
  todoDetails: any;
  editedTask: Todo = { id: '', task_name: '' };


  constructor(private todoService: ServicesService) {

  }


  ngOnInit() {
    this.getAllTask();
  }

  addTask() {

    const newTodo: Todo = {
      task_name: this.task,
      id: ''
    };
    this.todoService.addtodo(newTodo)
      .then(() => {
        console.log('Task added successfully!');
        this.task = '';
      })
      .catch((error) => {
        console.error('Failed to add task:', error);
      });
  }



  getAllTask() {
    this.todoService.gettodo().subscribe(
      (tasks: Todo[]) => {
        this.tasks = tasks;
      },
      (error) => {
        console.error('Failed to retrieve tasks:', error);
      }
    );
  }

  deleteTask(todo: Todo) {
    let decision = confirm("Do you want to delete this task");
    if (decision == true) {
      this.todoService.deleteTodo(todo);
    }
  }


  setEditedTask(task: Todo) {
    this.editedTask = { ...task };
  }


  updateTask() {
    this.todoService.updateTodo(this.editedTask, { task_name: this.editedTask.task_name })
      .then(() => {
        console.log('Task updated successfully!');

        const index = this.tasks.findIndex((t) => t.id === this.editedTask.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.editedTask };
        }
        this.editedTask = { id: '', task_name: '' };
      })
      .catch((error) => {
        console.error('Failed to update task:', error);
      });
  }














}



