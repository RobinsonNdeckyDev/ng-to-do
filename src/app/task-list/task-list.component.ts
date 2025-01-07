import { Component } from '@angular/core';
import {TaskService} from "../task.service";
import {FormGroup, FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  taskForm: FormGroup;
  tasks : any = [];

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      newTask: ['']
    });
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }


  addTask() {
    const task = this.taskForm.value.newTask;
    if (task) {
      this.taskService.addTask(task);
      this.taskForm.reset();
    }
  }
}
