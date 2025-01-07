import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: string[] = ['Faire les courses', 'Appeler Jean', 'Préparer la réunion'];

  constructor() { }

  getTasks(): string[] {
    return this.tasks;
  }

  addTask(task: string): void {
    this.tasks.push(task);
  }
}
